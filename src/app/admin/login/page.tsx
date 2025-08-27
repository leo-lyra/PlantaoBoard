"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, Mail, Lock, Eye, EyeOff, Shield, Key } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { adminCredentials } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === adminCredentials.email && password === adminCredentials.password) {
      localStorage.setItem('admin-session', JSON.stringify({
        email: adminCredentials.email,
        name: adminCredentials.name,
        loginTime: new Date().toISOString()
      }));
      
      toast.success('Login administrativo realizado com sucesso!');
      router.push('/admin');
    } else {
      toast.error('Credenciais inválidas', {
        description: 'Email ou senha incorretos'
      });
    }
    
    setIsLoading(false);
  };

  const fillTestCredentials = () => {
    setEmail(adminCredentials.email);
    setPassword(adminCredentials.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                PlantãoMed Admin
              </h1>
              <p className="text-purple-200">Painel Administrativo</p>
            </div>
          </div>
        </div>

        {/* Credenciais de Teste */}
        <Card className="border-purple-500/20 bg-purple-900/20 backdrop-blur-sm mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Key className="h-4 w-4 text-purple-400" />
              <h3 className="font-semibold text-purple-100">Credenciais de Teste</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-purple-200">Email:</span>
                <code className="text-purple-300 bg-purple-800/50 px-2 py-1 rounded">
                  {adminCredentials.email}
                </code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-200">Senha:</span>
                <code className="text-purple-300 bg-purple-800/50 px-2 py-1 rounded">
                  {adminCredentials.password}
                </code>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3 border-purple-400 text-purple-300 hover:bg-purple-800/50"
              onClick={fillTestCredentials}
            >
              Preencher Automaticamente
            </Button>
          </CardContent>
        </Card>

        {/* Login Form */}
        <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-white">Acesso Administrativo</CardTitle>
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
              <Shield className="h-3 w-3 mr-1" />
              Área Restrita
            </Badge>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 font-medium text-white">
                  <Mail className="h-4 w-4 text-purple-400" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@plantaomed.com"
                  required
                  className="h-12 border-2 border-purple-500/30 rounded-xl focus:border-purple-400 bg-white/10 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 font-medium text-white">
                  <Lock className="h-4 w-4 text-purple-400" />
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    required
                    className="h-12 border-2 border-purple-500/30 rounded-xl focus:border-purple-400 bg-white/10 text-white placeholder:text-gray-400 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Entrando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Entrar no Admin
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-purple-200 text-sm">
                Acesso restrito apenas para administradores
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-purple-300">
          <p>PlantãoMed Admin Panel v1.0</p>
          <p className="text-xs mt-1 text-purple-400">Sistema de gestão de usuários</p>
        </div>
      </div>
    </div>
  );
}