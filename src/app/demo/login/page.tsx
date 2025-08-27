"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, Mail, Lock, Eye, EyeOff, ArrowLeft, Key, Play } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMockAuth } from '@/contexts/MockAuthContext';
import { testUserCredentials } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function DemoLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useMockAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      toast.success('Login realizado com sucesso!');
      router.push('/demo/app');
    } else {
      toast.error('Credenciais inválidas', {
        description: 'Use as credenciais de teste fornecidas'
      });
    }
    
    setIsLoading(false);
  };

  const fillTestCredentials = () => {
    setEmail(testUserCredentials.email);
    setPassword(testUserCredentials.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/landing" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Voltar para home
          </Link>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PlantãoMed Demo
              </h1>
              <p className="text-gray-600">Teste o aplicativo</p>
            </div>
          </div>
          
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Play className="h-4 w-4 mr-1" />
            Versão de Demonstração
          </Badge>
        </div>

        {/* Credenciais de Teste */}
        <Card className="border-blue-200 bg-blue-50 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Key className="h-4 w-4 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Credenciais de Teste</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-blue-700">Email:</span>
                <code className="text-blue-800 bg-blue-100 px-2 py-1 rounded">
                  {testUserCredentials.email}
                </code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-700">Senha:</span>
                <code className="text-blue-800 bg-blue-100 px-2 py-1 rounded">
                  {testUserCredentials.password}
                </code>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3 border-blue-300 text-blue-700 hover:bg-blue-100"
              onClick={fillTestCredentials}
            >
              Preencher Automaticamente
            </Button>
          </CardContent>
        </Card>

        {/* Login Form */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Entrar na Demo</CardTitle>
            <p className="text-gray-600 text-sm">
              Use as credenciais acima para testar o app
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 font-medium">
                  <Mail className="h-4 w-4 text-blue-600" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="teste@plantaomed.com"
                  required
                  className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 font-medium">
                  <Lock className="h-4 w-4 text-blue-600" />
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="teste123"
                    required
                    className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Entrando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Entrar na Demo
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Esta é uma versão de demonstração com dados fictícios
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <div className="text-center mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Play className="h-4 w-4 text-blue-500" />
            <span>Teste todas as funcionalidades sem compromisso</span>
          </div>
        </div>
      </div>
    </div>
  );
}