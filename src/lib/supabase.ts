// src/lib/supabase.ts

import { cookies } from "next/headers";
import {
  createClientComponentClient,
  createServerComponentClient,
  createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";

// Se você não gerou os tipos do Supabase ainda, pode trocar <any> por nada
type DB = any;

/**
 * Cliente para COMPONENTES CLIENT (use em páginas/Componentes com "use client")
 * Exemplo:
 *   const supabase = supabaseBrowser();
 */
export function supabaseBrowser() {
  return createClientComponentClient<DB>();
}

/**
 * Cliente para SERVER COMPONENTS (RSC) — ex.: em `app/page.tsx` (sem "use client")
 * Exemplo:
 *   const supabase = supabaseServer();
 */
export function supabaseServer() {
  return createServerComponentClient<DB>({ cookies });
}

/**
 * Cliente para ROUTE HANDLERS (arquivos em `app/api/**/route.ts`)
 * Exemplo:
 *   const supabase = supabaseRoute();
 */
export function supabaseRoute() {
  return createRouteHandlerClient<DB>({ cookies });
}
