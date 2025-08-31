import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
type DB = any;

/** Cliente para ROUTE HANDLERS (arquivos em app/api/.../route.ts) */
export function supabaseRoute() {
  return createRouteHandlerClient<DB>({ cookies });
}
