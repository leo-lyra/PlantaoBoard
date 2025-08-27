"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, Clock, CreditCard, AlertCircle, CheckCircle,
  Calendar, DollarSign, Settings, ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'sonner';

interface SubscriptionData {
  status: 'trial' | 'active' | 'expired' | 'cancelled';
  subscription_status: string;
  trial_ends_at: string | null;
  subscription_id: string | null;
  days_left: number;
  created_at: string;
}

export function SubscriptionManager() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      const response = await fetch('/api/user/subscription');
      if (response.ok) {
        const data = await response.json();
        setSubscription(data);
      }
    } catch (error) {
      console.error('Erro ao buscar dados da assinatura:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setIsCancelling(true);
    
    try {
      const response = await fetch('/api/user/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'cancel' }),
      });

      if (response.ok) {
        toast.success('Assinatura cancelada com sucesso');
        fetchSubscriptionData();
      } else {
        toast.error('Erro ao cancelar assinatura');
      }
    } catch (error) {
      toast.error('Erro inesperado');
    } finally {
      setIsCancelling(false);
    }
  };

  const getStatusInfo = () => {
    if (!subscription) return null;

    switch (subscription.status) {
      case 'active':
        return {
          icon: Crown,
          label: 'Assinatura Ativa',
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          description: 'Você tem acesso completo a todos os recursos premium'
        };
      case 'trial':
        return {
          icon: Clock,
          label: `Trial - ${subscription.days_left} dias restantes`,
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          description: 'Aproveite todos os recursos premium durante seu período de teste'
        };
      case 'expired':
        return {
          icon: AlertCircle,
          label: 'Trial Expirado',
          color: 'bg-red-100 text-red-800 border-red-200',
          description: 'Seu período de teste terminou. Faça upgrade para continuar'
        };
      case 'cancelled':
        return {
          icon: CreditCard,
          label: 'Assinatura Cancelada',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          description: 'Sua assinatura foi cancelada. Você pode reativar a qualquer momento'
        };
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-gray-600">Carregando...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const statusInfo = getStatusInfo();
  if (!statusInfo || !subscription) return null;

  const Icon = statusInfo.icon;

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-600" />
          Gerenciar Assinatura
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Atual */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <Badge className={`${statusInfo.color} border font-medium mb-2`}>
              {statusInfo.label}
            </Badge>
            <p className="text-sm text-gray-600">{statusInfo.description}</p>
          </div>
        </div>

        {/* Informações da Conta */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Calendar className="h-5 w-5 text-blue-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Membro desde</p>
            <p className="font-semibold text-gray-900">
              {new Date(subscription.created_at).toLocaleDateString('pt-BR')}
            </p>
          </div>
          
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <DollarSign className="h-5 w-5 text-purple-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Plano Atual</p>
            <p className="font-semibold text-gray-900">
              {subscription.status === 'active' ? 'Pro' : 'Trial'}
            </p>
          </div>
        </div>

        {/* Ações */}
        <div className="space-y-3">
          {subscription.status === 'trial' && (
            <Link href="/checkout" className="block">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Crown className="h-4 w-4 mr-2" />
                Fazer Upgrade Agora
              </Button>
            </Link>
          )}

          {subscription.status === 'expired' && (
            <Link href="/checkout" className="block">
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Reativar Assinatura
              </Button>
            </Link>
          )}

          {subscription.status === 'active' && (
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.open('https://billing.stripe.com/p/login/test_123', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Gerenciar Pagamento
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
                onClick={handleCancelSubscription}
                disabled={isCancelling}
              >
                {isCancelling ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    Cancelando...
                  </div>
                ) : (
                  'Cancelar Assinatura'
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Aviso de Trial */}
        {subscription.status === 'trial' && subscription.days_left <= 3 && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium text-sm">
                Seu trial expira em {subscription.days_left} dia{subscription.days_left !== 1 ? 's' : ''}
              </span>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              Faça upgrade agora para não perder acesso aos seus dados
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}