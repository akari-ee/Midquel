import type { SupabaseClient } from "@supabase/supabase-js";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import type { Film } from "~/types/model";

const DEFAULT_PAGE_SIZE = 8;

export const fetchFilmList = async (
  supabase: SupabaseClient,
  params: { page: number; pageSize?: number }
): Promise<Film[]> => {
  const { page, pageSize = DEFAULT_PAGE_SIZE } = params;
  const from = (page - 1) * pageSize;
  const to = page + pageSize - 1;

  const { data: filmList } = await supabase
    .from("film")
    .select("*")
    .order("id", { ascending: true })
    .range(from, to)
    .throwOnError();

  return filmList;
};

export const fetchFilmDetail = async (
  supabase: SupabaseClient,
  slug: Film["slug"]
): Promise<Film> => {
  const { data: film } = await supabase
    .from("film")
    .select("*")
    .eq("slug", slug)
    .single<Film>()
    .throwOnError();

  return film;
};

export const filmQueryOptions = {
  all: ["film"] as const,
  list: (
    supabase: SupabaseClient,
    params: { page: number; pageSize?: number } = {
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    }
  ) =>
    infiniteQueryOptions({
      queryKey: [...filmQueryOptions.all, "list", params.page] as const,
      queryFn: ({ pageParam = 1 }) =>
        fetchFilmList(supabase, { page: pageParam as number }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        const hasMore =
          Array.isArray(lastPage) && lastPage.length >= DEFAULT_PAGE_SIZE;
        return hasMore ? lastPageParam + 1 : undefined;
      },
      select: (data) => data.pages.flat() as Film[],
    }),
  detail: (supabase: SupabaseClient, slug: Film["slug"]) =>
    queryOptions({
      queryKey: [...filmQueryOptions.all, "detail", slug] as const,
      queryFn: () => fetchFilmDetail(supabase, slug),
    }),
};
