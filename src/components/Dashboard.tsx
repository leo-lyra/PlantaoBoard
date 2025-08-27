"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import { 
  DollarSign, Clock, Calendar, TrendingUp, MapPin, 
  FileText, AlertCircle, Target, Filter, Sparkles
} from 'lucide-react';
import { usePlantao } from '@/contexts/PlantaoContext';
import { PeriodFilter } from '@/types/plantao';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

export function Dashboard() {
  const { plantoes, getDashboardMetrics, getLocalStats, getUniqueLocais } = usePlantao();
  
  const [filtro, setFiltro] = useState<PeriodFilter>({
    tipo: 'mes',
    inicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    fim: new Date().toISOString().split('T')[0]
  });

  const [filtroLocal, setFiltroLocal] = useState<string>('all');

  const plantoesFiltrados = useMemo(() => {
    return plantoes.filter(plantao => {
      const plantaoDate = new Date(plantao.data);
      const inicio = new Date(filtro.inicio);
      const fim = new Date(filtro.fim);
      const matchPeriodo = plantaoDate >= inicio && plantaoDate <= fim;
      const matchLocal = filtroLocal === 'all' || plantao.local === filtroLocal;
      
      return matchPeriodo && matchLocal;
    });
  }, [plantoes, filtro, filtroLocal]);

  const metrics = getDashboardMetrics(plantoesFiltrados);
  const localStats = getLocalStats(plantoesFiltrados);
  const locaisUnicos = getUniqueLocais();

  // Calcular total à receber
  const totalAReceber = useMemo(() => {
    return plantoesFiltrados
      .filter(plantao => plantao.statusPagamento === 'À Receber')
      .reduce((sum, plantao) => sum + plantao.valorRecebido, 0);
  }, [plantoesFiltrados]);

  const quantidadeAReceber = useMemo(() => {
    return plantoesFiltrados.filter(plantao => plantao.statusPagamento === 'À Receber').length;
  }, [plantoesFiltrados]);

  const evolucaoMensal = useMemo(() => {
    const meses = new Map();
    
    plantoes.forEach(plantao => {
      const data = new Date(plantao.data);
      const chave = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
      
      if (!meses.has(chave)) {
        meses.set(chave, { mes: chave, valor: 0, horas: 0, plantoes: 0 });
      }
      
      const item = meses.get(chave);
      item.valor += plantao.valorRecebido;
      item.horas += plantao.horasTrabalhadas;
      item.plantoes += 1;
    });

    return Array.from(meses.values()).sort((a, b) => a.mes.localeCompare(b.mes));
  }, [plantoes]);

  const statusData = useMemo(() => {
    const status = { Recebido: 0, 'À Receber': 0 };
    plantoesFiltrados.forEach(plantao => {
      if (plantao.statusPagamento === 'Recebido' || plantao.statusPagamento === 'À Receber') {
        status[plantao.statusPagamento]++;
      }
    });
    
    return Object.entries(status).map(([name, value]) => ({ name, value }));
  }, [plantoesFiltrados]);

  const atualizarFiltro = (tipo: string) => {
    const hoje = new Date();
    let inicio: Date;
    let fim = hoje;

    switch (tipo) {
      case 'dia':
        inicio = new Date(hoje);
        break;
      case 'semana':
        inicio = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'mes':
        inicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        break;
      case 'ano':
        inicio = new Date(hoje.getFullYear(), 0, 1);
        break;
      default:
        return;
    }

    setFiltro({
      tipo: tipo as any,
      inicio: inicio.toISOString().split('T')[0],
      fim: fim.toISOString().split('T')[0]
    });
  };

  const limparFiltros = () => {
    setFiltro({
      tipo: 'mes',
      inicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      fim: new Date().toISOString().split('T')[0]
    });
    setFiltroLocal('all');
  };

  const metricsCards = [
    {
      title: 'Total Recebido',
      value: `R$ ${metrics.totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      subtitle: `Líquido: R$ ${metrics.valorLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50'
    },
    {
      title: 'Total À Receber',
      value: `R$ ${totalAReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      subtitle: `${quantidadeAReceber} plantão${quantidadeAReceber !== 1 ? 'ões' : ''} pendente${quantidadeAReceber !== 1 ? 's' : ''}`,
      icon: AlertCircle,
      gradient: 'from-yellow-500 to-orange-600',
      bgGradient: 'from-yellow-50 to-orange-50'
    },
    {
      title: 'Horas Trabalhadas',
      value: `${metrics.totalHoras}h`,
      subtitle: `Média: ${metrics.valorMedioHora.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} R$/h`,
      icon: Clock,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50'
    },
    {
      title: 'Total de Plantões',
      value: metrics.totalPlantoes.toString(),
      subtitle: `Média: R$ ${metrics.valorMedioPlantao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: Calendar,
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      title: 'Impostos Pagos',
      value: `R$ ${metrics.impostoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      subtitle: `${metrics.totalRecebido > 0 ? ((metrics.impostoTotal / metrics.totalRecebido) * 100).toFixed(1) : 0}% do total`,
      icon: FileText,
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
          <Sparkles className="h-6 w-6 text-white" />
          <h1 className="text-xl font-bold text-white">Dashboard Analytics</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Análise completa dos seus plantões médicos
        </p>
      </div>

      {/* Filtros */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Filter className="h-5 w-5 text-blue-600" />
            Filtros de Período e Local
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <Label className="font-medium">Período Rápido</Label>
              <Select value={filtro.tipo} onValueChange={atualizarFiltro}>
                <SelectTrigger className="w-40 h-11 border-2 border-gray-200 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dia">Hoje</SelectItem>
                  <SelectItem value="semana">Última Semana</SelectItem>
                  <SelectItem value="mes">Este Mês</SelectItem>
                  <SelectItem value="ano">Este Ano</SelectItem>
                  <SelectItem value="personalizado">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Data Início</Label>
              <Input
                type="date"
                value={filtro.inicio}
                onChange={(e) => setFiltro(prev => ({ ...prev, inicio: e.target.value }))}
                className="h-11 border-2 border-gray-200 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Data Fim</Label>
              <Input
                type="date"
                value={filtro.fim}
                onChange={(e) => setFiltro(prev => ({ ...prev, fim: e.target.value }))}
                className="h-11 border-2 border-gray-200 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Local do Plantão</Label>
              <Select value={filtroLocal} onValueChange={setFiltroLocal}>
                <SelectTrigger className="w-48 h-11 border-2 border-gray-200 rounded-xl">
                  <SelectValue placeholder="Todos os locais" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os locais</SelectItem>
                  {locaisUnicos.map(local => (
                    <SelectItem key={local} value={local}>{local}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              variant="outline" 
              className="h-11 px-6 border-2 border-gray-200 rounded-xl hover:border-blue-500"
              onClick={limparFiltros}
            >
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {metricsCards.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient} opacity-50`}></div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-gray-400 group-hover:text-green-500 transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                  <p className="text-xs text-gray-500">{metric.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Evolução Mensal */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Evolução de Ganhos Mensais</CardTitle>
            <p className="text-gray-600">Acompanhe o crescimento dos seus rendimentos</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={evolucaoMensal}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="mes" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  formatter={(value: number) => [
                    `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                    'Valor'
                  ]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorValue)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição por Local */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Distribuição por Local</CardTitle>
            <p className="text-gray-600">Percentual de ganhos por local de trabalho</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={localStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ local, percentualTotal }) => `${local}: ${percentualTotal.toFixed(1)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="totalRecebido"
                >
                  {localStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [
                    `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                    'Total Recebido'
                  ]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ranking de Locais */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Ranking de Locais Mais Rentáveis</CardTitle>
            <p className="text-gray-600">Locais ordenados por receita total</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={localStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="local" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  formatter={(value: number) => [
                    `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                    'Total Recebido'
                  ]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="totalRecebido" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status de Pagamentos */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Status dos Pagamentos</CardTitle>
            <p className="text-gray-600">Distribuição dos status de pagamento</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas Detalhadas por Local */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <MapPin className="h-5 w-5 text-blue-600" />
            Estatísticas Detalhadas por Local
          </CardTitle>
          <p className="text-gray-600">Análise completa de performance por local</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-900">Local</th>
                  <th className="text-right p-4 font-semibold text-gray-900">Total Recebido</th>
                  <th className="text-right p-4 font-semibold text-gray-900">Total Horas</th>
                  <th className="text-right p-4 font-semibold text-gray-900">Plantões</th>
                  <th className="text-right p-4 font-semibold text-gray-900">Valor/Hora</th>
                  <th className="text-right p-4 font-semibold text-gray-900">% do Total</th>
                </tr>
              </thead>
              <tbody>
                {localStats.map((local, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{local.local}</td>
                    <td className="text-right p-4 font-semibold text-emerald-600">
                      R$ {local.totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="text-right p-4 text-gray-700">{local.totalHoras}h</td>
                    <td className="text-right p-4 text-gray-700">{local.totalPlantoes}</td>
                    <td className="text-right p-4 font-medium text-blue-600">
                      R$ {(local.totalRecebido / local.totalHoras).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="text-right p-4 font-medium text-purple-600">{local.percentualTotal.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}