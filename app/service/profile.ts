import type { SupabaseClient } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";
import type { ProfileWithSocialLink } from "~/types/entity";
import type { Profile, SocialLink } from "~/types/model";

export const fetchProfile = async (
  supabase: SupabaseClient
): Promise<ProfileWithSocialLink> => {
  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .single<Profile>()
    .throwOnError();

  const socialLink = await fetchSocialLink(supabase);

  return {
    ...profile,
    social_links: (socialLink ?? []) as SocialLink[],
  };
};

export const fetchSocialLink = async (
  supabase: SupabaseClient
): Promise<SocialLink[]> => {
  const { data } = await supabase
    .from("social_link")
    .select("*")
    .throwOnError();

  return data;
};

export const profileQueryOptions = {
  all: ["profile"] as const,
  info: (supabase: SupabaseClient) =>
    queryOptions({
      queryKey: [...profileQueryOptions.all, "info"] as const,
      queryFn: () => fetchProfile(supabase),
    }),
  social: (supabase: SupabaseClient) =>
    queryOptions({
      queryKey: [...profileQueryOptions.all, "social"] as const,
      queryFn: () => fetchSocialLink(supabase),
    }),
};
