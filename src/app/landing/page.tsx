"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Stethoscope, Check, Star, Users, TrendingUp, Shield, 
  Zap, BarChart3, Clock, DollarSign, ArrowRight, 
  CheckCircle, Quote, Play, Award, Target
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [planoSelecionado, setPlanoSelecionado] = useState<'mensal' | 'anual'>('anual');

  const planos = {
    mensal: {
      preco: 9.90,
      periodo: 'mês',
      economia: null,
      priceId: 'price_mensal_plantaomed'
    },
    anual: {
      preco: 95.04, // 9.90 * 12 * 0.8 (20% desconto)
      periodo: 'ano',
      economia: '20% OFF',
      precoMensal: 7.92,
      priceId: 'price_anual_plantaomed'
    }
  };

  const beneficios = [
    'Dashboard completo com analytics avançados',
    'Controle de plantões e pagamentos',
    'Relatórios financeiros detalhados',
    'Cálculo automático de impostos',
    'Backup automático na nuvem',
    'Acesso em qualquer dispositivo',
    'Suporte técnico prioritário',
    'Atualizações automáticas'
  ];

  const depoimentos = [
    {
      nome: 'Dr. Carlos Silva',
      especialidade: 'Cardiologista',
      foto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
      texto: 'Revolucionou minha gestão financeira! Agora tenho controle total dos meus plantões e consigo planejar melhor meus investimentos.',
      rating: 5
    },
    {
      nome: 'Dra. Ana Costa',
      especialidade: 'Pediatra',
      foto: 'https://images.unsplash.com/photo-1594824475317-d3c2b8b5e3b5?w=100&h=100&fit=crop&crop=face',
      texto: 'Interface intuitiva e relatórios precisos. Economizo horas por semana que antes gastava organizando planilhas.',
      rating: 5
    },
    {
      nome: 'Dr. Roberto Lima',
      especialidade: 'Ortopedista',
      foto: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face',
      texto: 'O melhor investimento que fiz para minha carreira. ROI incrível e suporte excepcional da equipe.',
      rating: 5
    }
  ];

  const estatisticas = [
    { numero: '2.500+', label: 'Médicos Ativos' },
    { numero: 'R$ 50M+', label: 'Gerenciados' },
    { numero: '98%', label: 'Satisfação' },
    { numero: '24/7', label: 'Suporte' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PlantãoMed
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href="#pricing">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Começar Agora
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-6xl">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200">
            🚀 Mais de 2.500 médicos já confiam no PlantãoMed
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
            Transforme Seus Plantões em
            <br />
            <span className="text-emerald-600">Renda Previsível</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            O único sistema que médicos precisam para <strong>controlar plantões</strong>, 
            <strong> maximizar ganhos</strong> e <strong>planejar o futuro financeiro</strong> 
            com dashboards profissionais e automação inteligente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="#pricing">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Play className="h-5 w-5 mr-2" />
                Começar Teste Grátis
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 rounded-xl border-2 hover:bg-gray-50">
              <BarChart3 className="h-5 w-5 mr-2" />
              Ver Demo
            </Button>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {estatisticas.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.numero}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prova Social */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Médicos Aumentaram Sua Renda em <span className="text-emerald-600">Até 40%</span>
            </h2>
            <p className="text-xl text-gray-600">
              Veja como profissionais transformaram sua gestão financeira
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {depoimentos.map((depoimento, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(depoimento.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-blue-200 mb-4" />
                  <p className="text-gray-700 mb-6 leading-relaxed">"{depoimento.texto}"</p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={depoimento.foto} 
                      alt={depoimento.nome}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{depoimento.nome}</div>
                      <div className="text-sm text-gray-600">{depoimento.especialidade}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo Que Você Precisa em <span className="text-blue-600">Uma Plataforma</span>
            </h2>
            <p className="text-xl text-gray-600">
              Recursos profissionais para médicos que querem crescer
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: BarChart3, title: 'Analytics Avançados', desc: 'Dashboards profissionais com insights financeiros' },
              { icon: Shield, title: 'Dados Seguros', desc: 'Criptografia bancária e backup automático' },
              { icon: Zap, title: 'Automação', desc: 'Cálculos automáticos de impostos e relatórios' },
              { icon: Target, title: 'Metas Claras', desc: 'Planejamento financeiro e projeções de renda' }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Invista em Seu <span className="text-emerald-600">Futuro Financeiro</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Planos que se pagam sozinhos com a otimização dos seus ganhos
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`font-medium ${planoSelecionado === 'mensal' ? 'text-blue-600' : 'text-gray-500'}`}>
                Mensal
              </span>
              <button
                onClick={() => setPlanoSelecionado(planoSelecionado === 'mensal' ? 'anual' : 'mensal')}
                className="relative w-14 h-7 bg-blue-600 rounded-full transition-colors duration-300"
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                  planoSelecionado === 'anual' ? 'translate-x-8' : 'translate-x-1'
                }`} />
              </button>
              <span className={`font-medium ${planoSelecionado === 'anual' ? 'text-blue-600' : 'text-gray-500'}`}>
                Anual
              </span>
              {planoSelecionado === 'anual' && (
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                  Economize 20%
                </Badge>
              )}
            </div>
          </div>

          <div className="max-w-lg mx-auto">
            <Card className="border-2 border-blue-500 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-2xl">PlantãoMed Pro</CardTitle>
                </div>
                {planos[planoSelecionado].economia && (
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-4">
                    {planos[planoSelecionado].economia}
                  </Badge>
                )}
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    R$ {planos[planoSelecionado].preco.toFixed(2).replace('.', ',')}
                  </div>
                  <div className="text-gray-600">
                    por {planos[planoSelecionado].periodo}
                    {planoSelecionado === 'anual' && (
                      <div className="text-sm text-emerald-600 font-medium">
                        R$ {planos.anual.precoMensal?.toFixed(2).replace('.', ',')}/mês
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {beneficios.map((beneficio, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">{beneficio}</span>
                  </div>
                ))}
                
                <Link href="/register" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mt-6">
                    Começar Agora - 7 Dias Grátis
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                
                <div className="text-center text-sm text-gray-500 mt-4">
                  ✅ Sem compromisso • ✅ Cancele quando quiser • ✅ Suporte 24/7
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto Para Transformar Sua Gestão Financeira?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a mais de 2.500 médicos que já otimizaram seus ganhos
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Começar Teste Grátis Agora
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">PlantãoMed</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>© 2024 PlantãoMed. Todos os direitos reservados.</p>
              <p className="text-sm mt-1">Gestão financeira inteligente para médicos</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}