// src/lib/supabase.ts
// Arquivo único de clientes Supabase para Next.js (App Router).

import { cookies } from "next/headers";
import {
  createClientComponentClient,
  createServerComponentClient,
  createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";

// Se não tiver tipos gerados, troque <DB> por <any> ou remova o genérico.
type DB = any;

/** Cliente para COMPONENTES CLIENT (arquivos com "use client") */
export function supabaseBrowser() {
  return createClientComponentClient<DB>();
}

/** Cliente para SERVER COMPONENTS (RSC) — ex.: app/page.tsx (sem "use client") */
export function supabaseServer() {
  return createServerComponentClient<DB>({ cookies });
}

// Cliente para ROUTE HANDLERS (arquivos em app/api/.../route.ts)
export function supabaseRoute() {
  return createRouteHandlerClient<DB>({ cookies });
}
