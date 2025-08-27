import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Verificar se o usuário está autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    // Buscar dados da assinatura
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('subscription_status, trial_ends_at, subscription_id, created_at')
      .eq('id', user.id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao buscar dados da assinatura' },
        { status: 500 }
      );
    }

    const now = new Date();
    const trialEndsAt = profile.trial_ends_at ? new Date(profile.trial_ends_at) : null;
    
    // Determinar status atual
    let currentStatus = 'expired';
    let daysLeft = 0;
    
    if (profile.subscription_status === 'active') {
      currentStatus = 'active';
    } else if (trialEndsAt && now < trialEndsAt) {
      currentStatus = 'trial';
      daysLeft = Math.ceil((trialEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    }

    return NextResponse.json({
      status: currentStatus,
      subscription_status: profile.subscription_status,
      trial_ends_at: profile.trial_ends_at,
      subscription_id: profile.subscription_id,
      days_left: daysLeft,
      created_at: profile.created_at
    });
    
  } catch (error) {
    console.error('Erro ao verificar assinatura:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    const supabase = createRouteHandlerClient({ cookies });

    // Verificar se o usuário está autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    if (action === 'cancel') {
      // Cancelar assinatura
      const { error } = await supabase
        .from('profiles')
        .update({
          subscription_status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        return NextResponse.json(
          { error: 'Erro ao cancelar assinatura' },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, message: 'Assinatura cancelada' });
    }

    return NextResponse.json(
      { error: 'Ação não reconhecida' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Erro na API de assinatura:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}