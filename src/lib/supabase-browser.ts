"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// Se não tiver tipos, troque <DB> por <any> ou remova o genérico.
type DB = any;

/** Cliente para COMPONENTES CLIENT (arquivos com "use client") */
export function supabaseBrowser() {
  return createClientComponentClient<DB>();
}
