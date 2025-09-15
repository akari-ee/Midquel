import type { Database } from "./db_type";

export type ProfileWithSocialLink =
  Database["public"]["Tables"]["profile"]["Row"] & {
    social_links: Database["public"]["Tables"]["social_link"]["Row"][];
  };
