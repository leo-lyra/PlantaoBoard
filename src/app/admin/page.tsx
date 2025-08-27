"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, DollarSign, TrendingUp, Clock, Shield, LogOut,
  Search, Filter, Eye, Edit, Trash2, Crown, AlertCircle,
  BarChart3, Calendar, MapPin, Stethoscope
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { mockUsers, getDashboardStats, type MockUser } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const [users, setUsers] = useState<MockUser[]>(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<MockUser[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar se admin está logado
    const adminSession = localStorage.getItem('admin-session');
    if (!adminSession) {
      router.push('/admin/login');
      return;
    }

    // Simular carregamento
    setTimeout(() => setIsLoading(false), 1000);
  }, [router]);

  useEffect(() => {
    // Filtrar usuários
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.subscription_status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, statusFilter]);

  const handleLogout = () => {
    localStorage.removeItem('admin-session');
    toast.success('Logout realizado com sucesso');
    router.push('/admin/login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'trial': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'trial': return 'Trial';
      case 'expired': return 'Expirado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const stats = getDashboardStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">PlantãoMed Admin</h1>
                  <p className="text-sm text-gray-600">Painel de Administração</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                <Crown className="h-4 w-4 mr-1" />
                Administrador
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                  <p className="text-sm text-gray-500">Cadastrados na plataforma</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                  <p className="text-3xl font-bold text-emerald-600">{stats.activeUsers}</p>
                  <p className="text-sm text-gray-500">Assinatura ativa</p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <Crown className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Receita Mensal</p>
                  <p className="text-3xl font-bold text-purple-600">
                    R$ {stats.monthlyRevenue.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-sm text-gray-500">Receita recorrente</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {stats.conversionRate.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-500">Trial → Pago</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-purple-600" />
              Filtros e Busca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por nome, email ou especialidade..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11 border-2 border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 h-11 border-2 border-gray-200 rounded-xl">
                  <SelectValue placeholder="Status da assinatura" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="expired">Expirado</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                className="h-11 px-6 border-2 border-gray-200 rounded-xl"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
              >
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Usuários */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Usuários Cadastrados ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-900">Usuário</th>
                    <th className="text-center p-4 font-semibold text-gray-900">Status</th>
                    <th className="text-center p-4 font-semibold text-gray-900">Plano</th>
                    <th className="text-center p-4 font-semibold text-gray-900">Plantões</th>
                    <th className="text-right p-4 font-semibold text-gray-900">Receita</th>
                    <th className="text-center p-4 font-semibold text-gray-900">Cadastro</th>
                    <th className="text-center p-4 font-semibold text-gray-900">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id} className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Stethoscope className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-xs text-gray-500">{user.specialty} • {user.city}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <Badge className={`${getStatusColor(user.subscription_status)} border font-medium`}>
                          {getStatusLabel(user.subscription_status)}
                        </Badge>
                      </td>

                      <td className="p-4 text-center">
                        {user.subscription_plan ? (
                          <Badge variant="outline" className="font-medium">
                            {user.subscription_plan === 'mensal' ? 'Mensal' : 'Anual'}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>

                      <td className="p-4 text-center">
                        <span className="font-medium text-gray-900">{user.total_plantoes}</span>
                      </td>

                      <td className="p-4 text-right">
                        <span className="font-semibold text-emerald-600">
                          R$ {user.total_revenue.toLocaleString('pt-BR')}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <span className="text-sm text-gray-600">
                          {new Date(user.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Eye className="h-4  w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}