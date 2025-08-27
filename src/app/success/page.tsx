"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle, Stethoscope, ArrowRight, Gift, 
  Star, Users, Zap, BarChart3 
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function SuccessPage() {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const supabase = createClientComponentClient();

  useEffect(() => {
    const updateUserSubscription = async () => {
      if (sessionId) {
        try {
          // Aqui você verificaria o status do pagamento no Stripe
          // e atualizaria o status da assinatura do usuário
          
          const { data: { user } } = await supabase.auth.getUser();
          
          if (user) {
            // Atualizar status da assinatura no Supabase
            await supabase
              .from('profiles')
              .update({
                subscription_status: 'active',
                subscription_id: sessionId,
                updated_at: new Date().toISOString()
              })
              .eq('id', user.id);
          }
        } catch (error) {
          console.error('Erro ao atualizar assinatura:', error);
        }
      }
      setIsLoading(false);
    };

    updateUserSubscription();
  }, [sessionId, supabase]);

  const proximosPassos = [
    {
      icon: BarChart3,
      title: 'Explore o Dashboard',
      description: 'Veja analytics completos dos seus plantões',
      action: 'Ver Dashboard'
    },
    {
      icon: Zap,
      title: 'Configure Automações',
      description: 'Ative cálculos automáticos de impostos',
      action: 'Configurar'
    },
    {
      icon: Users,
      title: 'Suporte Premium',
      description: 'Acesso ao suporte prioritário 24/7',
      action: 'Contatar'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Confirmando seu pagamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-emerald-600" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🎉 <span className="text-emerald-600">Parabéns!</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-6">
            Sua assinatura foi ativada com sucesso!
          </p>
          
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg text-white">
            <Stethoscope className="h-6 w-6" />
            <span className="text-lg font-semibold">Bem-vindo ao PlantãoMed Pro!</span>
          </div>
        </div>

        {/* Welcome Message */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-emerald-50 to-blue-50 mb-8">
          <CardContent className="p-8 text-center">
            <Gift className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Agora você tem acesso completo!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Todos os recursos premium estão liberados para você maximizar seus ganhos
              e ter controle total sobre seus plantões médicos.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle className="h-4 w-4" />
                <span>Dashboard Completo</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle className="h-4 w-4" />
                <span>Relatórios Avançados</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle className="h-4 w-4" />
                <span>Suporte Premium</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle className="h-4 w-4" />
                <span>Backup Automático</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Próximos Passos */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            Seus Próximos Passos
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {proximosPassos.map((passo, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <passo.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{passo.title}</h3>
                  <p className="text-gray-600 mb-4">{passo.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    {passo.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Principal */}
        <div className="text-center">
          <Link href="/app">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Começar a Usar Agora
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
          
          <p className="text-gray-500 mt-4">
            Você receberá um email de confirmação em breve
          </p>
        </div>

        {/* Suporte */}
        <Card className="mt-8 bg-gray-50">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">Precisa de Ajuda?</h3>
            <p className="text-gray-600 mb-4">
              Nossa equipe está pronta para te ajudar a aproveitar ao máximo o PlantãoMed
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline">
                📧 Enviar Email
              </Button>
              <Button variant="outline">
                💬 Chat ao Vivo
              </Button>
              <Button variant="outline">
                📱 WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}