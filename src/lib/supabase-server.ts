import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
type DB = any;

export function supabaseServer() {
  return createServerComponentClient<DB>({ cookies });
}
