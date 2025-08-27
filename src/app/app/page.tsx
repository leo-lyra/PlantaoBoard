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
import { Badge } from '@/components/ui/badge';
import { LogOut, Crown, Clock } from 'lucide-react';

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
      console.log('Usuário logado:', userData);
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

  const renderContent = () => {
    console.log('Renderizando aba:', activeTab);
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecionando para login...</p>
        </div>
      </div>
    );
  }

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
                
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-medium">
                  <Clock className="h-4 w-4 mr-1" />
                  Trial Ativo
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Crown className="h-4 w-4 mr-1" />
                  Upgrade
                </Button>

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

          <main className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
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
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              color: '#1f2937',
            },
          }}
        />
      </div>
    </PlantaoProvider>
  );
}