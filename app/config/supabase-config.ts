import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/types/db_type";

export function createBrowserClient(token?: Promise<string | null>) {
  return createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_KEY!
  );
}

export async function createServerClient(token?: Promise<string | null>) {
  return createClient<Database>(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_KEY!
  );
}
