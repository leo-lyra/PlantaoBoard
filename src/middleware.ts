import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware de proteção de rotas para Next.js (Edge Runtime).
 * ✅ Não importa Supabase no Edge (evita avisos/erros de Node API no Edge)
 * ✅ Verifica sessão apenas pelos cookies de auth do Supabase
 * ✅ Protege /app/*
 * ✅ Redireciona usuário logado que tenta acessar /login ou /register
 */
export function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const pathname = nextUrl.pathname;

  // Cookies de sessão mais comuns do Supabase (v2)
  const hasSession =
    cookies.get("sb-access-token")?.value ||
    cookies.get("sb-refresh-token")?.value ||
    cookies.get("supabase-auth-token")?.value; // fallback versões antigas

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isProtected = pathname.startsWith("/app");

  // 1) Protege /app: se não logado, manda para /login?next=<destino>
  if (isProtected && !hasSession) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname + nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  // 2) Se já logado, evitar ir para /login ou /register
  if (isAuthPage && hasSession) {
    return NextResponse.redirect(new URL("/app", req.url));
  }

  // 3) Demais casos: segue o fluxo normal
  return NextResponse.next();
}

export const config = {
  // Aplica em todas as rotas exceto assets estáticos e API
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
