import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
type DB = any;

export function supabaseRoute() {
  return createRouteHandlerClient<DB>({ cookies });
}

