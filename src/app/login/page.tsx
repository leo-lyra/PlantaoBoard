"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase-browser'; // ✅ usa cliente do lado do cliente
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = supabaseBrowser(); // ✅ cria o client correto

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error('Erro ao fazer login', {
          description:
            error.message === 'Invalid login credentials'
              ? 'Email ou senha incorretos'
              : error.message,
        });
        return;
      }

      if (data.user) {
        toast.success('Login realizado com sucesso!');
        router.push('/app');
      }
    } catch {
      toast.error('Erro inesperado', {
        description: 'Tente novamente em alguns instantes',
      });
    } finally {
      setIsLoading(false);
    }
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
            <div className="p-3 bg-gradient-to-br from-blue-500 to purple-600 rounded-xl">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PlantãoBoard
            </h1>
          </div>
          <p className="text-gray-600">Entre na sua conta</p>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Fazer Login</CardTitle>
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
                  placeholder="seu@email.com"
                  required
                  className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                  autoComplete="email"
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
                    placeholder="Sua senha"
                    required
                    className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 pr-12"
                    autoComplete="current-password"
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
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Entrando...
                  </div>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Não tem uma conta?{' '}
                <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                  Cadastre-se grátis
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-gray-700">
                Esqueceu sua senha?
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Ao fazer login, você concorda com nossos</p>
          <p>
            <Link href="/terms" className="hover:text-gray-700">Termos de Uso</Link>
            {' e '}
            <Link href="/privacy" className="hover:text-gray-700">Política de Privacidade</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

