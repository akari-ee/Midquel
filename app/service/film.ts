import type { SupabaseClient } from "@supabase/supabase-js";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { apiConfig } from "~/config/api-config";
import type { Film } from "~/types/model";

export const fetchFilmList = async (
  supabase: SupabaseClient,
  params: { page: number; pageSize?: number }
): Promise<Film[]> => {
  const { page, pageSize = apiConfig.pageSize } = params;
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

// 홈페이지용 필름 조회 (5개만)
export const fetchFeaturedFilm = async (
  supabase: SupabaseClient
): Promise<Film[]> => {
  const { data } = await supabase
    .from("film")
    .select("*")
    .order("id", { ascending: true })
    .limit(5)
    .throwOnError();

  return data ?? [];
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
      pageSize: apiConfig.pageSize,
    }
  ) =>
    infiniteQueryOptions({
      queryKey: [...filmQueryOptions.all, "list", params.page] as const,
      queryFn: ({ pageParam = 1 }) =>
        fetchFilmList(supabase, { page: pageParam as number }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        const hasMore =
          Array.isArray(lastPage) && lastPage.length >= apiConfig.pageSize;
        return hasMore ? lastPageParam + 1 : undefined;
      },
      select: (data) => data.pages.flat() as Film[],
    }),
  // 홈페이지 피처드용 (5개만)
  featured: (supabase: SupabaseClient) =>
    queryOptions({
      queryKey: [...filmQueryOptions.all, "featured"] as const,
      queryFn: () => fetchFeaturedFilm(supabase),
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
