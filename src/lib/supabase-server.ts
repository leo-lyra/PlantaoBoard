import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
type DB = any;

/** Cliente para SERVER COMPONENTS (RSC), ex.: app/page.tsx (sem "use client") */
export function supabaseServer() {
  return createServerComponentClient<DB>({ cookies });
}
