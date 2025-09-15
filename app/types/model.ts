import type { Database } from "./db_type";

export type Profile = Database["public"]["Tables"]["profile"]["Row"];
export type SocialLink = Database["public"]["Tables"]["social_link"]["Row"];
export type Archive = Database["public"]["Tables"]["archive"]["Row"];
export type Film = Database["public"]["Tables"]["film"]["Row"];
