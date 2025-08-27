"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, BarChart3, Calendar, Clock, DollarSign, 
  TrendingUp, MapPin, Stethoscope, ArrowRight,
  Target, Shield, Zap
} from 'lucide-react';
import { usePlantao } from '@/contexts/PlantaoContext';

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { plantoes, getDashboardMetrics } = usePlantao();
  const metrics = getDashboardMetrics(plantoes);

  const quickStats = [
    {
      label: 'Total Recebido',
      value: `R$ ${metrics.totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50'
    },
    {
      label: 'Horas Trabalhadas',
      value: `${metrics.totalHoras}h`,
      icon: Clock,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50'
    },
    {
      label: 'Total de Plantões',
      value: metrics.totalPlantoes.toString(),
      icon: Calendar,
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      label: 'Valor/Hora Médio',
      value: `R$ ${metrics.valorMedioHora.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: TrendingUp,
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50'
    }
  ];

  const features = [
    {
      icon: Target,
      title: 'Controle Preciso',
      description: 'Acompanhe cada plantão com detalhes completos e métricas precisas'
    },
    {
      icon: BarChart3,
      title: 'Analytics Avançado',
      description: 'Dashboards interativos com insights profundos sobre seus ganhos'
    },
    {
      icon: Shield,
      title: 'Dados Seguros',
      description: 'Seus dados ficam salvos localmente com total segurança e privacidade'
    },
    {
      icon: Zap,
      title: 'Interface Rápida',
      description: 'Design moderno e responsivo para máxima produtividade'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 rounded-3xl p-8 md:p-12 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Stethoscope className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">PlantãoMed</h1>
              <p className="text-blue-100 text-lg">Gestão Inteligente de Plantões Médicos</p>
            </div>
          </div>
          
          <p className="text-xl text-blue-50 mb-8 max-w-2xl leading-relaxed">
            Controle completo dos seus plantões com dashboards avançados, 
            análises detalhadas e interface moderna para maximizar sua produtividade.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => onNavigate('cadastrar')}
            >
              <Plus className="h-5 w-5 mr-2" />
              Cadastrar Plantão
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-3 rounded-xl"
              onClick={() => onNavigate('dashboard')}
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Ver Dashboard
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50`}></div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-gray-900">Ações Rápidas</CardTitle>
          <p className="text-gray-600">Acesse rapidamente as principais funcionalidades</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 border-2 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group"
              onClick={() => onNavigate('cadastrar')}
            >
              <Plus className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">Novo Plantão</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 border-2 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 group"
              onClick={() => onNavigate('listar')}
            >
              <Calendar className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">Meus Plantões</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 border-2 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 group"
              onClick={() => onNavigate('dashboard')}
            >
              <BarChart3 className="h-6 w-6 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      {plantoes.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">Atividade Recente</CardTitle>
                <p className="text-gray-600">Seus últimos plantões cadastrados</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => onNavigate('listar')}
                className="hover:bg-blue-50 hover:border-blue-500 transition-all duration-300"
              >
                Ver Todos
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {plantoes.slice(-3).reverse().map((plantao) => (
                <div key={plantao.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{plantao.local}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(plantao.data).toLocaleDateString('pt-BR')} • {plantao.horasTrabalhadas}h
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600">
                      R$ {plantao.valorRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-500">
                      R$ {(plantao.valorRecebido / plantao.horasTrabalhadas).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/h
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}