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

export async function POST(request: NextRequest) {
  try {
    const { priceId, userId, userEmail } = await request.json();
    
    const supabase = createRouteHandlerClient({ cookies });

    // Verificar se o usuário está autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    // Criar sessão do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      customer_email: userEmail,
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