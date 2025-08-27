"use client";

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/components/HomePage';
import { Dashboard } from '@/components/Dashboard';
import { PlantaoForm } from '@/components/PlantaoForm';
import { PlantaoList } from '@/components/PlantaoList';
import { PlantaoProvider } from '@/contexts/PlantaoContext';
import { Toaster } from '@/components/ui/sonner';
import { useMockAuth } from '@/contexts/MockAuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Play, Clock, Crown } from 'lucide-react';

export default function DemoAppPage() {
  const [activeTab, setActiveTab] = useState('home');
  const { user, logout, isLoading } = useMockAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/demo/login');
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push('/demo/login');
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
          <p className="text-gray-600">Carregando demo...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
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
                    Olá, {user.name}!
                  </h2>
                  <p className="text-sm text-gray-600">
                    Versão de demonstração do PlantãoMed
                  </p>
                </div>
                
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-medium">
                  <Play className="h-4 w-4 mr-1" />
                  Demo
                </Badge>

                <Badge className="bg-orange-100 text-orange-800 border-orange-200 font-medium">
                  <Clock className="h-4 w-4 mr-1" />
                  Trial - 5 dias restantes
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  onClick={() => router.push('/register')}
                >
                  <Crown className="h-4 w-4 mr-1" />
                  Criar Conta Real
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sair da Demo
                </Button>
              </div>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Play className="h-5 w-5" />
                <div>
                  <p className="font-medium">
                    Você está testando a versão demo do PlantãoMed
                  </p>
                  <p className="text-sm opacity-90">
                    Todos os dados são fictícios. Crie uma conta real para salvar seus plantões
                  </p>
                </div>
              </div>
              <Button 
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => router.push('/register')}
              >
                Criar Conta Grátis
              </Button>
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
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              color: '#1f2937',
            },
          }}
        />
      </div>
    </PlantaoProvider>
  );
}