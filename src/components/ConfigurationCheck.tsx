"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, CheckCircle, Settings, ExternalLink,
  Database, Key, Globe, Code
} from 'lucide-react';

export function ConfigurationCheck() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  const isConfigured = supabaseUrl && 
    supabaseUrl !== 'https://your-project-id.supabase.co' &&
    supabaseAnonKey && 
    supabaseAnonKey !== 'your-anon-key-here';

  const configSteps = [
    {
      title: 'Criar Projeto no Supabase',
      description: 'Acesse supabase.com e crie um novo projeto',
      icon: Database,
      status: 'pending'
    },
    {
      title: 'Configurar Variáveis de Ambiente',
      description: 'Adicione as chaves do Supabase no arquivo .env.local',
      icon: Key,
      status: isConfigured ? 'completed' : 'pending'
    },
    {
      title: 'Configurar Tabelas',
      description: 'Execute o SQL para criar a tabela de perfis',
      icon: Code,
      status: 'pending'
    },
    {
      title: 'Deploy da Aplicação',
      description: 'Faça deploy na Vercel com as variáveis configuradas',
      icon: Globe,
      status: 'pending'
    }
  ];

  if (isConfigured) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2 text-green-800">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Supabase configurado com sucesso!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl border-0 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Configuração Necessária</CardTitle>
              <p className="text-gray-600 mt-1">Configure o Supabase para usar o PlantãoMed</p>
            </div>
          </div>
          
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            <Settings className="h-4 w-4 mr-1" />
            Configuração Pendente
          </Badge>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Status Atual */}
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h3 className="font-semibold text-orange-800 mb-2">Status da Configuração</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>NEXT_PUBLIC_SUPABASE_URL:</span>
                <Badge variant={supabaseUrl && supabaseUrl !== 'https://your-project-id.supabase.co' ? 'default' : 'destructive'}>
                  {supabaseUrl && supabaseUrl !== 'https://your-project-id.supabase.co' ? 'Configurado' : 'Não configurado'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>
                <Badge variant={supabaseAnonKey && supabaseAnonKey !== 'your-anon-key-here' ? 'default' : 'destructive'}>
                  {supabaseAnonKey && supabaseAnonKey !== 'your-anon-key-here' ? 'Configurado' : 'Não configurado'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Passos de Configuração */}
          <div>
            <h3 className="text-xl font-bold mb-6">Passos para Configuração</h3>
            <div className="space-y-6">
              {configSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full flex-shrink-0">
                      <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="h-5 w-5 text-blue-600" />
                        <h4 className="font-semibold">{step.title}</h4>
                        <Badge variant={step.status === 'completed' ? 'default' : 'secondary'}>
                          {step.status === 'completed' ? 'Concluído' : 'Pendente'}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instruções Detalhadas */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">Instruções Detalhadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Criar Projeto no Supabase</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Acesse <a href="https://supabase.com" target="_blank" className="text-blue-600 hover:underline">supabase.com</a> e crie um novo projeto.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2. Configurar Variáveis de Ambiente</h4>
                <p className="text-sm text-gray-600 mb-2">
                  No seu projeto Supabase, vá em Settings → API e copie as chaves:
                </p>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg text-sm font-mono">
                  <div>NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co</div>
                  <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima</div>
                  <div>SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3. Criar Tabela de Perfis</h4>
                <p className="text-sm text-gray-600 mb-2">
                  No SQL Editor do Supabase, execute:
                </p>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg text-sm font-mono overflow-x-auto">
                  <pre>{`CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT,
  subscription_status TEXT DEFAULT 'trial',
  subscription_id TEXT,
  trial_ends_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              onClick={() => window.open('https://supabase.com', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Abrir Supabase
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => window.location.reload()}
            >
              Verificar Configuração
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}