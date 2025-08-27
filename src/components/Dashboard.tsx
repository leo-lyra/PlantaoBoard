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
  FileText, AlertCircle, Target, Filter
} from 'lucide-react';
import { usePlantao } from '@/contexts/PlantaoContext';
import { PeriodFilter } from '@/types/plantao';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export function Dashboard() {
  const { plantoes, getDashboardMetrics, getLocalStats } = usePlantao();
  
  const [filtro, setFiltro] = useState<PeriodFilter>({
    tipo: 'mes',
    inicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    fim: new Date().toISOString().split('T')[0]
  });

  // Filtrar plantões pelo período
  const plantoesFiltrados = useMemo(() => {
    return plantoes.filter(plantao => {
      const plantaoDate = new Date(plantao.data);
      const inicio = new Date(filtro.inicio);
      const fim = new Date(filtro.fim);
      return plantaoDate >= inicio && plantaoDate <= fim;
    });
  }, [plantoes, filtro]);

  const metrics = getDashboardMetrics(plantoesFiltrados);
  const localStats = getLocalStats(plantoesFiltrados);

  // Dados para gráfico de evolução mensal
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

  // Dados para gráfico de status de pagamento
  const statusData = useMemo(() => {
    const status = { Pago: 0, Pendente: 0, Atrasado: 0 };
    plantoesFiltrados.forEach(plantao => {
      status[plantao.statusPagamento]++;
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

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Período
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <Label>Período Rápido</Label>
              <Select value={filtro.tipo} onValueChange={atualizarFiltro}>
                <SelectTrigger className="w-40">
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
              <Label>Data Início</Label>
              <Input
                type="date"
                value={filtro.inicio}
                onChange={(e) => setFiltro(prev => ({ ...prev, inicio: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Data Fim</Label>
              <Input
                type="date"
                value={filtro.fim}
                onChange={(e) => setFiltro(prev => ({ ...prev, fim: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recebido</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {metrics.totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Líquido: R$ {metrics.valorLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Trabalhadas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalHoras}h</div>
            <p className="text-xs text-muted-foreground">
              Média: {metrics.valorMedioHora.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} R$/h
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Plantões</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalPlantoes}</div>
            <p className="text-xs text-muted-foreground">
              Média: R$ {metrics.valorMedioPlantao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impostos Pagos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {metrics.impostoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics.totalRecebido > 0 ? ((metrics.impostoTotal / metrics.totalRecebido) * 100).toFixed(1) : 0}% do total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolução Mensal */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Ganhos Mensais</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={evolucaoMensal}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [
                    `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                    'Valor'
                  ]}
                />
                <Area type="monotone" dataKey="valor" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição por Local */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Local</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={localStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ local, percentualTotal }) => `${local}: ${percentualTotal.toFixed(1)}%`}
                  outerRadius={80}
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
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ranking de Locais */}
        <Card>
          <CardHeader>
            <CardTitle>Ranking de Locais Mais Rentáveis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={localStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="local" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [
                    `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                    'Total Recebido'
                  ]}
                />
                <Bar dataKey="totalRecebido" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status de Pagamentos */}
        <Card>
          <CardHeader>
            <CardTitle>Status dos Pagamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas Detalhadas por Local */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Estatísticas Detalhadas por Local
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Local</th>
                  <th className="text-right p-2">Total Recebido</th>
                  <th className="text-right p-2">Total Horas</th>
                  <th className="text-right p-2">Plantões</th>
                  <th className="text-right p-2">Valor/Hora</th>
                  <th className="text-right p-2">% do Total</th>
                </tr>
              </thead>
              <tbody>
                {localStats.map((local, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-medium">{local.local}</td>
                    <td className="text-right p-2">
                      R$ {local.totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="text-right p-2">{local.totalHoras}h</td>
                    <td className="text-right p-2">{local.totalPlantoes}</td>
                    <td className="text-right p-2">
                      R$ {(local.totalRecebido / local.totalHoras).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="text-right p-2">{local.percentualTotal.toFixed(1)}%</td>
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