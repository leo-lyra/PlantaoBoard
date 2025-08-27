"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, Shield, CheckCircle, ArrowLeft, 
  Lock, Award, Zap, Clock
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const [planoSelecionado, setPlanoSelecionado] = useState<'mensal' | 'anual'>('anual');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const plan = searchParams.get('plan');
    if (plan === 'mensal' || plan === 'anual') {
      setPlanoSelecionado(plan);
    }

    // Verificar se usuário está logado
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
    };

    getUser();
  }, [searchParams, router, supabase]);

  const planos = {
    mensal: {
      preco: 9.90,
      periodo: 'mês',
      economia: null,
      priceId: 'price_1234567890_mensal',
      descricao: 'Ideal para testar a plataforma'
    },
    anual: {
      preco: 95.04, // 9.90 * 12 * 0.8 (20% desconto)
      periodo: 'ano',
      economia: '20% OFF',
      precoMensal: 7.92,
      priceId: 'price_1234567890_anual',
      descricao: 'Melhor custo-benefício'
    }
  };

  const beneficios = [
    'Dashboard completo com analytics avançados',
    'Controle de plantões e pagamentos',
    'Relatórios financeiros detalhados',
    'Cálculo automático de impostos',
    'Backup automático na nuvem',
    'Acesso em qualquer dispositivo',
    'Suporte técnico prioritário',
    'Atualizações automáticas'
  ];

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Faça login para continuar');
      router.push('/login');
      return;
    }

    setIsLoading(true);

    try {
      // Aqui você integraria com o Stripe
      // Por enquanto, vamos simular o processo
      
      // Simular chamada para criar sessão do Stripe
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: planos[planoSelecionado].priceId,
          userId: user.id,
          userEmail: user.email
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar sessão de pagamento');
      }

      const { url } = await response.json();
      
      // Redirecionar para o Stripe Checkout
      window.location.href = url;
      
    } catch (error) {
      toast.error('Erro ao processar pagamento', {
        description: 'Tente novamente em alguns instantes'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/app" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Voltar para o app
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Finalize Sua <span className="text-blue-600">Assinatura</span>
          </h1>
          <p className="text-xl text-gray-600">
            Continue aproveitando todos os recursos do PlantãoMed
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Plano Selecionado */}
          <div className="space-y-6">
            <Card className="border-2 border-blue-500 shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-2xl">PlantãoMed Pro</CardTitle>
                </div>
                {planos[planoSelecionado].economia && (
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-4">
                    {planos[planoSelecionado].economia}
                  </Badge>
                )}
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    R$ {planos[planoSelecionado].preco.toFixed(2).replace('.', ',')}
                  </div>
                  <div className="text-gray-600">
                    por {planos[planoSelecionado].periodo}
                    {planoSelecionado === 'anual' && (
                      <div className="text-sm text-emerald-600 font-medium">
                        R$ {planos.anual.precoMensal?.toFixed(2).replace('.', ',')}/mês
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {planos[planoSelecionado].descricao}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {beneficios.map((beneficio, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{beneficio}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Alternar Plano */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Alterar Plano</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPlanoSelecionado('mensal')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      planoSelecionado === 'mensal'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium">Mensal</div>
                    <div className="text-lg font-bold">R$ 9,90</div>
                  </button>
                  <button
                    onClick={() => setPlanoSelecionado('anual')}
                    className={`p-3 rounded-lg border-2 transition-all relative ${
                      planoSelecionado === 'anual'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Badge className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs">
                      20% OFF
                    </Badge>
                    <div className="text-sm font-medium">Anual</div>
                    <div className="text-lg font-bold">R$ 95,04</div>
                    <div className="text-xs text-gray-500">R$ 7,92/mês</div>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout */}
          <div className="space-y-6">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>PlantãoMed Pro ({planos[planoSelecionado].periodo})</span>
                  <span className="font-semibold">
                    R$ {planos[planoSelecionado].preco.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                
                {planoSelecionado === 'anual' && (
                  <div className="flex justify-between items-center py-2 text-emerald-600">
                    <span>Desconto anual (20%)</span>
                    <span className="font-semibold">
                      -R$ {(9.90 * 12 - 95.04).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center py-3 border-t text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">
                    R$ {planos[planoSelecionado].preco.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Finalizar Pagamento
                    </div>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-500 space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Pagamento 100% seguro</span>
                  </div>
                  <p>✅ Cancele quando quiser • ✅ Sem compromisso</p>
                </div>
              </CardContent>
            </Card>

            {/* Garantias */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Suas Garantias
                </h3>
                <div className="space-y-2 text-sm text-green-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>7 dias de garantia incondicional</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Cancele a qualquer momento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Suporte técnico incluído</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Dados sempre seguros</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}