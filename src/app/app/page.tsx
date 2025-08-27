"use client";

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/components/HomePage';
import { Dashboard } from '@/components/Dashboard';
import { PlantaoForm } from '@/components/PlantaoForm';
import { PlantaoList } from '@/components/PlantaoList';
import { PlantaoProvider } from '@/contexts/PlantaoContext';
import { Toaster } from '@/components/ui/sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Crown, Clock, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function AppPage() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar se usuário está logado
    const userSession = localStorage.getItem('user-session');
    if (!userSession) {
      router.push('/login');
      return;
    }

    try {
      const userData = JSON.parse(userSession);
      setUser(userData);
    } catch (error) {
      console.error('Erro ao carregar sessão:', error);
      router.push('/login');
      return;
    }

    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user-session');
    router.push('/landing');
  };

  const getSubscriptionStatus = () => {
    if (!user) return null;

    const now = new Date();
    const trialEndsAt = user.trial_ends_at ? new Date(user.trial_ends_at) : null;
    
    if (user.subscription_status === 'active') {
      return {
        type: 'active',
        label: 'Pro Ativo',
        color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        icon: Crown
      };
    }
    
    if (trialEndsAt && now < trialEndsAt) {
      const daysLeft = Math.ceil((trialEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return {
        type: 'trial',
        label: `Trial - ${daysLeft} dias restantes`,
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: Clock
      };
    }
    
    return {
      type: 'expired',
      label: 'Trial Expirado',
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: CreditCard
    };
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={setActiveTab} />;
      case 'dashboard':
        return <Dashboard />;
      case 'cadastrar':
        return <PlantaoForm />;
      case 'listar':
        return <PlantaoList />;
      default:
        return <HomePage onNavigate={setActiveTab} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando aplicação...</p>
        </div>
      </div>
    );
  }

  const subscriptionStatus = getSubscriptionStatus();

  return (
    <PlantaoProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Main Content */}
        <div className="md:pl-72">
          {/* Top Bar */}
          <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Olá, {user?.name || user?.email?.split('@')[0]}!
                  </h2>
                  <p className="text-sm text-gray-600">
                    Bem-vindo ao PlantãoMed
                  </p>
                </div>
                
                {subscriptionStatus && (
                  <Badge className={`${subscriptionStatus.color} border font-medium`}>
                    <subscriptionStatus.icon className="h-4 w-4 mr-1" />
                    {subscriptionStatus.label}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3">
                {subscriptionStatus?.type === 'trial' && (
                  <Link href="/checkout">
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      <Crown className="h-4 w-4 mr-1" />
                      Upgrade
                    </Button>
                  </Link>
                )}
                
                {subscriptionStatus?.type === 'expired' && (
                  <Link href="/checkout">
                    <Button size="sm" className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700">
                      <CreditCard className="h-4 w-4 mr-1" />
                      Reativar
                    </Button>
                  </Link>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sair
                </Button>
              </div>
            </div>
          </div>

          {/* Trial Expiration Warning */}
          {subscriptionStatus?.type === 'trial' && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5" />
                  <div>
                    <p className="font-medium">
                      Seu trial expira em {subscriptionStatus.label.split(' - ')[1]}
                    </p>
                    <p className="text-sm opacity-90">
                      Faça upgrade agora e continue aproveitando todos os recursos
                    </p>
                  </div>
                </div>
                <Link href="/checkout">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">
                    Fazer Upgrade
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Expired Trial Block */}
          {subscriptionStatus?.type === 'expired' && (
            <div className="bg-red-500 text-white p-4">
              <div className="max-w-7xl mx-auto text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <CreditCard className="h-6 w-6" />
                  <h3 className="text-lg font-semibold">Trial Expirado</h3>
                </div>
                <p className="mb-4">
                  Seu período de teste terminou. Reative sua assinatura para continuar usando o PlantãoMed.
                </p>
                <Link href="/checkout">
                  <Button className="bg-white text-red-600 hover:bg-gray-100">
                    Reativar Assinatura
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <main className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              {subscriptionStatus?.type === 'expired' ? (
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-8 text-center">
                    <CreditCard className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-red-800 mb-4">
                      Acesso Limitado
                    </h2>
                    <p className="text-red-700 mb-6">
                      Seu trial expirou. Reative sua assinatura para continuar usando todos os recursos do PlantãoMed.
                    </p>
                    <Link href="/checkout">
                      <Button className="bg-red-600 hover:bg-red-700 text-white">
                        Reativar Agora
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                renderContent()
              )}
            </div>
          </main>
        </div>
        
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              color: '#1f2937',
            },
          }}
        />
      </div>
    </PlantaoProvider>
  );
}