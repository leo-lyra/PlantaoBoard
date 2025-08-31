"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Clock, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { usePlantao } from '@/contexts/PlantaoContext';

export function PlantaoStats() {
  const { plantoes, getDashboardMetrics } = usePlantao();
  const metrics = getDashboardMetrics(plantoes);

  // Estatísticas do mês atual
  const mesAtual = new Date();
  const plantoesMesAtual = plantoes.filter(plantao => {
    const dataPlantao = new Date(plantao.data);
    return dataPlantao.getMonth() === mesAtual.getMonth() && 
           dataPlantao.getFullYear() === mesAtual.getFullYear();
  });
  const metricsMesAtual = getDashboardMetrics(plantoesMesAtual);

  // Plantões pendentes
  const plantoesPendentes = plantoes.filter(p => p.statusPagamento === 'À Receber');
  const valorPendente = plantoesPendentes.reduce((sum, p) => sum + p.valorRecebido, 0);

  const stats = [
    {
      label: 'Este Mês',
      value: `R$ ${metricsMesAtual.totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      subtitle: `${metricsMesAtual.totalPlantoes} plantões`,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'À Receber',
      value: `R$ ${valorPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      subtitle: `${plantoesPendentes.length} plantões`,
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'Total Geral',
      value: `R$ ${metrics.totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      subtitle: `${metrics.totalPlantoes} plantões`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      label: 'Valor/Hora Médio',
      value: `R$ ${metrics.valorMedioHora.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      subtitle: `${metrics.totalHoras}h trabalhadas`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
