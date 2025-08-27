import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Simulação do Stripe webhook - substitua pela integração real
const stripe = {
  webhooks: {
    constructEvent: (body: any, signature: string, secret: string) => {
      // Simular validação do webhook
      return {
        type: 'checkout.session.completed',
        data: {
          object: {
            id: 'cs_test_123',
            customer_email: 'user@example.com',
            metadata: {
              userId: 'user-123'
            },
            subscription: 'sub_123'
          }
        }
      };
    }
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe signature' },
        { status: 400 }
      );
    }

    // Verificar assinatura do webhook
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    const supabase = createRouteHandlerClient({ cookies });

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        
        // Atualizar status da assinatura do usuário
        await supabase
          .from('profiles')
          .update({
            subscription_status: 'active',
            subscription_id: session.subscription,
            updated_at: new Date().toISOString()
          })
          .eq('id', session.metadata.userId);
        
        console.log('Assinatura ativada para usuário:', session.metadata.userId);
        break;

      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        
        // Cancelar assinatura
        await supabase
          .from('profiles')
          .update({
            subscription_status: 'cancelled',
            updated_at: new Date().toISOString()
          })
          .eq('subscription_id', subscription.id);
        
        console.log('Assinatura cancelada:', subscription.id);
        break;

      case 'invoice.payment_failed':
        const invoice = event.data.object;
        
        // Marcar como pagamento falhado
        await supabase
          .from('profiles')
          .update({
            subscription_status: 'past_due',
            updated_at: new Date().toISOString()
          })
          .eq('subscription_id', invoice.subscription);
        
        console.log('Pagamento falhado para assinatura:', invoice.subscription);
        break;

      default:
        console.log('Evento não tratado:', event.type);
    }

    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Erro no webhook:', error);
    return NextResponse.json(
      { error: 'Webhook error' },
      { status: 400 }
    );
  }
}