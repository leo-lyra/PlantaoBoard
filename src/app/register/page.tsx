"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Stethoscope, Mail, Lock, Eye, EyeOff, ArrowLeft, 
  User, CheckCircle, Gift, CreditCard 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase-browser'; // ✅ cliente do lado do cliente
import { toast } from 'sonner';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = supabaseBrowser(); // ✅ cria client correto para Client Component

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast.error('Aceite os termos para continuar');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            trial_ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 dias
            subscription_status: 'trial'
          }
        }
      });

      if (error) {
        toast.error('Erro ao criar conta', {
          description: error.message
        });
        return;
      }

      if (data.user) {
        toast.success('Conta criada com sucesso!', {
          description: 'Seu trial de 7 dias começou agora'
        });
        router.push('/app');
      }
    } catch (error) {
      toast.error('Erro inesperado', {
        description: 'Tente novamente em alguns instantes'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const beneficiosTrial = [
    'Acesso completo por 7 dias',
    'Todos os recursos premium',
    'Suporte prioritário',
    'Sem compromisso'
  ];

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
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PlantãoBoard
            </h1>
          </div>
          
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-4">
            <Gift className="h-4 w-4 mr-1" />
            7 Dias Grátis
          </Badge>
          
          <p className="text-gray-600">Crie sua conta e comece agora</p>
        </div>

        {/* Trial Benefits */}
        <Card className="border-emerald-200 bg-emerald-50 mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Seu Trial Inclui:
            </h3>
            <div className="space-y-2">
              {beneficiosTrial.map((beneficio, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-emerald-700">
                  <CheckCircle className="h-4 w-4" />
                  {beneficio}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Register Form */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Criar Conta Grátis</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 font-medium">
                  <User className="h-4 w-4 text-blue-600" />
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Dr. João Silva"
                  required
                  className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 font-medium">
                  <Mail className="h-4 w-4 text-blue-600" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu@email.com"
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
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Mínimo 6 caracteres"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center gap-2 font-medium">
                  <Lock className="h-4 w-4 text-blue-600" />
                  Confirmar Senha
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Digite a senha novamente"
                    required
                    className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                  Aceito os{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                    Termos de Uso
                  </Link>
                  {' e '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                    Política de Privacidade
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !acceptTerms}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Criando conta...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    Começar Trial Grátis
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Já tem uma conta?{' '}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Fazer login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Note */}
        <div className="text-center mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Dados protegidos com criptografia bancária</span>
          </div>
        </div>
      </div>
    </div>
  );
}

