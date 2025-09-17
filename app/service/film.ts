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

export const fetchFilmNavigation = async (
  supabase: SupabaseClient,
  currentSlug: string
): Promise<{ prev: Film | null; next: Film | null }> => {
  // 이전 필름 조회 (ID가 현재보다 작은 것 중 가장 큰 것)
  const { data: prevFilm } = await supabase
    .from("film")
    .select("*")
    .lt("slug", currentSlug)
    .order("slug", { ascending: false })
    .limit(1)
    .maybeSingle<Film>();

  // 다음 필름 조회 (ID가 현재보다 큰 것 중 가장 작은 것)
  const { data: nextFilm } = await supabase
    .from("film")
    .select("*")
    .gt("slug", currentSlug)
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle<Film>();

  return {
    prev: prevFilm,
    next: nextFilm,
  };
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
  navigation: (supabase: SupabaseClient, currentSlug: string) =>
    queryOptions({
      queryKey: [...filmQueryOptions.all, "navigation", currentSlug] as const,
      queryFn: () => fetchFilmNavigation(supabase, currentSlug),
    }),
};
