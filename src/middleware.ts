import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware de proteção de rotas (Edge Runtime)
 * - NÃO importa supabase-js no Edge
 * - Detecta sessão pelos cookies do Supabase v2:
 *   • Qualquer cookie no padrão: sb-<project-ref>-auth-token (JSON)
 *   • Fallbacks legados: sb-access-token / sb-refresh-token / supabase-auth-token
 * - Protege /app/*
 * - Redireciona usuário logado que acessar /login ou /register
 */
export function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const pathname = nextUrl.pathname;

  // Cookie moderno do Supabase v2: sb-<ref>-auth-token (valor JSON com access/refresh)
  const hasModernSbCookie = cookies
    .getAll()
    .some((c) => /^sb-.*-auth-token$/.test(c.name) && (c.value?.length ?? 0) > 0);

  // Fallbacks (alguns projetos antigos ainda usam)
  const hasLegacySbCookie =
    !!cookies.get("sb-access-token")?.value ||
    !!cookies.get("sb-refresh-token")?.value ||
    !!cookies.get("supabase-auth-token")?.value;

  const hasSession = hasModernSbCookie || hasLegacySbCookie;

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isProtected = pathname.startsWith("/app");

  // 1) Exigir login para /app/*
  if (isProtected && !hasSession) {
    const loginUrl = new URL("/login", req.url);
    // mantém o destino original para redirecionar após login
    loginUrl.searchParams.set("next", pathname + nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  // 2) Evitar que usuário logado acesse /login ou /register
  if (isAuthPage && hasSession) {
    return NextResponse.redirect(new URL("/app", req.url));
  }

  // 3) Segue o fluxo normal
  return NextResponse.next();
}

export const config = {
  // Aplica em tudo, exceto assets estáticos e rotas que não precisam de auth
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
