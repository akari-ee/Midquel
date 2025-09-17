import type { SupabaseClient } from "@supabase/supabase-js";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { apiConfig } from "~/config/api-config";
import type { Archive } from "~/types/model";

export const fetchArchiveList = async (
  supabase: SupabaseClient,
  params: { page: number; pageSize?: number }
): Promise<Archive[]> => {
  const { page, pageSize = apiConfig.pageSize } = params;
  const from = (page - 1) * pageSize;
  const to = page + pageSize - 1;

  const { data: archiveList } = await supabase
    .from("archive")
    .select("*")
    .order("id", { ascending: true })
    .range(from, to)
    .throwOnError();

  return archiveList;
};

export const fetchArchiveDetail = async (
  supabase: SupabaseClient,
  slug: Archive["slug"]
): Promise<Archive> => {
  const { data: archive } = await supabase
    .from("archive")
    .select("*")
    .eq("slug", slug)
    .single<Archive>()
    .throwOnError();

  return archive;
};

// 홈페이지 피처드 아카이브 조회 (단일 쿼리)
export const fetchFeaturedArchive = async (
  supabase: SupabaseClient
): Promise<Archive[]> => {
  const { data } = await supabase
    .from("archive")
    .select("*")
    .eq("homepage_featured", true)
    .order("id", { ascending: true })
    .throwOnError();

  return data ?? [];
};

export const archiveQueryOptions = {
  all: ["archive"] as const,
  // 무한스크롤용 (전체 아카이브)
  list: (
    supabase: SupabaseClient,
    params: { page: number; pageSize?: number } = {
      page: 1,
      pageSize: apiConfig.pageSize,
    }
  ) =>
    infiniteQueryOptions({
      queryKey: [...archiveQueryOptions.all, "list", params.page] as const,
      queryFn: ({ pageParam = 1 }) =>
        fetchArchiveList(supabase, { page: pageParam as number }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        const hasMore =
          Array.isArray(lastPage) && lastPage.length >= apiConfig.pageSize;
        return hasMore ? lastPageParam + 1 : undefined;
      },
      select: (data) => data.pages.flat() as Archive[],
    }),
  // 홈페이지 피처드용 (단일 쿼리)
  featured: (supabase: SupabaseClient) =>
    queryOptions({
      queryKey: [...archiveQueryOptions.all, "featured"] as const,
      queryFn: () => fetchFeaturedArchive(supabase),
    }),
  detail: (supabase: SupabaseClient, slug: Archive["slug"]) =>
    queryOptions({
      queryKey: [...archiveQueryOptions.all, "detail", slug] as const,
      queryFn: () => fetchArchiveDetail(supabase, slug),
    }),
};
