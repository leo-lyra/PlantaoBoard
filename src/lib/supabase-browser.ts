"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
type DB = any;

export function supabaseBrowser() {
  return createClientComponentClient<DB>();
}
