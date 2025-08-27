import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/landing', '/login', '/register', '/forgot-password', '/terms', '/privacy'];
  const isPublicRoute = publicRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  // Redirecionar para landing se não estiver logado e tentar acessar rota protegida
  if (!session && !isPublicRoute && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/landing', req.url));
  }

  // Se estiver logado e tentar acessar rotas de auth, redirecionar para app
  if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/app', req.url));
  }

  // Verificar status da assinatura para rotas do app
  if (session && req.nextUrl.pathname.startsWith('/app')) {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_status, trial_ends_at')
        .eq('id', session.user.id)
        .single();

      const now = new Date();
      const trialEndsAt = profile?.trial_ends_at ? new Date(profile.trial_ends_at) : null;
      
      // Verificar se o trial expirou e não tem assinatura ativa
      if (profile?.subscription_status !== 'active' && trialEndsAt && now > trialEndsAt) {
        return NextResponse.redirect(new URL('/checkout', req.url));
      }
    } catch (error) {
      console.error('Erro ao verificar assinatura:', error);
    }
  }

  // Redirecionar root para landing ou app baseado no status de login
  if (req.nextUrl.pathname === '/') {
    if (session) {
      return NextResponse.redirect(new URL('/app', req.url));
    } else {
      return NextResponse.redirect(new URL('/landing', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};