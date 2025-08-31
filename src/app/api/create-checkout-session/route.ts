export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Simulação do Stripe - substitua pela integração real
const stripe = {
  checkout: {
    sessions: {
      create: async (params: any) => {
        // Simular criação de sessão do Stripe
        return {
          url: `https://checkout.stripe.com/pay/cs_test_${Math.random().toString(36).substring(7)}`
        };
      }
    }
  }
};

export async function POST(req: NextRequest) {
  try {
    // Inicializa o cliente Supabase com cookies (para autenticação server-side)
    const supabase = createRouteHandlerClient({ cookies });

    // Verifica se o usuário está autenticado
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    const userId = user.id;

    // Pega o plano (product/price) do corpo da requisição
    const body = await req.json();
    const { plan } = body;

    if (!plan || !['basic', 'pro', 'enterprise'].includes(plan)) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      );
    }

    // Mapeamento simples de preços por plano (substitua por prices reais do Stripe)
    const priceByPlan: Record<string, string> = {
      basic: 'price_basic_mock',
      pro: 'price_pro_mock',
      enterprise: 'price_enterprise_mock'
    };

    // Cria sessão de checkout (mock). Troque pelo SDK oficial do Stripe:
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
    // const session = await stripe.checkout.sessions.create({ ... });
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/checkout?canceled=1`,
      line_items: [
        {
          price: priceByPlan[plan],
          quantity: 1
        }
      ],
      metadata: {
        userId: userId,
      },
    });

    return NextResponse.json({ url: session.url });
    
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

