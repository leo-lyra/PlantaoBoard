"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Filter, Edit, Trash2, Calendar, MapPin, 
  Clock, DollarSign, FileText, AlertCircle, Check, X,
  Save, CheckCircle
} from 'lucide-react';
import { usePlantao } from '@/contexts/PlantaoContext';
import { Plantao } from '@/types/plantao';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

export function PlantaoList() {
  const { plantoes, deletePlantao, updatePlantao, getUniqueLocais } = usePlantao();
  const [busca, setBusca] = useState('');
  const [filtroLocal, setFiltroLocal] = useState('all');
  const [filtroStatus, setFiltroStatus] = useState('all');
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Plantao>>({});

  // Filtrar locais únicos removendo valores vazios ou inválidos
  const locaisUnicos = getUniqueLocais().filter(local => local && local.trim().length > 0);

  const plantoesFiltrados = useMemo(() => {
    return plantoes.filter(plantao => {
      const matchBusca = plantao.local.toLowerCase().includes(busca.toLowerCase()) ||
                        plantao.numeroNotaFiscal?.toLowerCase().includes(busca.toLowerCase());
      const matchLocal = filtroLocal === 'all' || plantao.local === filtroLocal;
      const matchStatus = filtroStatus === 'all' || plantao.statusPagamento === filtroStatus;
      
      return matchBusca && matchLocal && matchStatus;
    }).sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  }, [plantoes, busca, filtroLocal, filtroStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recebido': return 'bg-green-100 text-green-800 border-green-200';
      case 'À Receber': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Atrasado': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const iniciarEdicao = (plantao: Plantao) => {
    setEditandoId(plantao.id);
    setEditData({
      local: plantao.local,
      data: plantao.data,
      horasTrabalhadas: plantao.horasTrabalhadas,
      valorRecebido: plantao.valorRecebido,
      imposto: plantao.imposto,
    });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setEditData({});
  };

  const salvarEdicao = (id: string) => {
    if (editData.local && editData.data && editData.horasTrabalhadas && editData.valorRecebido !== undefined && editData.imposto !== undefined) {
      updatePlantao(id, editData);
      setEditandoId(null);
      setEditData({});
    } else {
      toast.error('Preencha todos os campos obrigatórios');
    }
  };

  const alterarStatus = (id: string, novoStatus: 'Recebido' | 'À Receber' | 'Atrasado') => {
    updatePlantao(id, { statusPagamento: novoStatus });
  };

  const handleDelete = (id: string) => {
    deletePlantao(id);
  };

  const calcularValorLiquido = (valor: number, imposto: number) => {
    return valor - imposto;
  };

  const calcularValorPorHora = (valor: number, horas: number) => {
    return horas > 0 ? valor / horas : 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
          <FileText className="h-6 w-6 text-white" />
          <h1 className="text-xl font-bold text-white">Meus Plantões</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Planilha completa com todos os seus plantões registrados
        </p>
      </div>

      {/* Filtros */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Filter className="h-5 w-5 text-emerald-600" />
            Filtros e Busca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por local ou número da NF..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10 h-11 border-2 border-gray-200 rounded-xl"
                />
              </div>
            </div>

            <Select value={filtroLocal} onValueChange={setFiltroLocal}>
              <SelectTrigger className="w-48 h-11 border-2 border-gray-200 rounded-xl">
                <SelectValue placeholder="Filtrar por local" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os locais</SelectItem>
                {locaisUnicos.map(local => (
                  <SelectItem key={local} value={local}>{local}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-48 h-11 border-2 border-gray-200 rounded-xl">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="Recebido">Recebido</SelectItem>
                <SelectItem value="À Receber">À Receber</SelectItem>
                <SelectItem value="Atrasado">Atrasado</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              className="h-11 px-6 border-2 border-gray-200 rounded-xl hover:border-emerald-500"
              onClick={() => {
                setBusca('');
                setFiltroLocal('all');
                setFiltroStatus('all');
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Planilha de Plantões */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0">
          {plantoesFiltrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum plantão encontrado</h3>
              <p className="text-muted-foreground text-center">
                {plantoes.length === 0 
                  ? 'Cadastre seu primeiro plantão para começar.'
                  : 'Tente ajustar os filtros para encontrar os plantões desejados.'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-900 min-w-[200px]">Local</th>
                    <th className="text-center p-4 font-semibold text-gray-900 min-w-[120px]">Data</th>
                    <th className="text-center p-4 font-semibold text-gray-900 min-w-[100px]">Horas</th>
                    <th className="text-right p-4 font-semibold text-gray-900 min-w-[130px]">Valor Bruto</th>
                    <th className="text-right p-4 font-semibold text-gray-900 min-w-[120px]">Imposto</th>
                    <th className="text-right p-4 font-semibold text-gray-900 min-w-[130px]">Valor Líquido</th>
                    <th className="text-right p-4 font-semibold text-gray-900 min-w-[120px]">Valor/Hora</th>
                    <th className="text-center p-4 font-semibold text-gray-900 min-w-[120px]">Status</th>
                    <th className="text-center p-4 font-semibold text-gray-900 min-w-[220px]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {plantoesFiltrados.map((plantao, index) => (
                    <tr key={plantao.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      {/* Local */}
                      <td className="p-3">
                        {editandoId === plantao.id ? (
                          <Input
                            value={editData.local || ''}
                            onChange={(e) => setEditData(prev => ({ ...prev, local: e.target.value }))}
                            className="w-full h-9 text-sm border border-gray-300 rounded-lg"
                            placeholder="Local do plantão"
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                            <span className="font-medium text-gray-900 truncate">{plantao.local}</span>
                          </div>
                        )}
                      </td>

                      {/* Data */}
                      <td className="p-3 text-center">
                        {editandoId === plantao.id ? (
                          <Input
                            type="date"
                            value={editData.data || ''}
                            onChange={(e) => setEditData(prev => ({ ...prev, data: e.target.value }))}
                            className="w-full h-9 text-sm border border-gray-300 rounded-lg"
                          />
                        ) : (
                          <span className="text-gray-700">
                            {new Date(plantao.data).toLocaleDateString('pt-BR')}
                          </span>
                        )}
                      </td>

                      {/* Horas */}
                      <td className="p-3 text-center">
                        {editandoId === plantao.id ? (
                          <Input
                            type="number"
                            step="0.5"
                            value={editData.horasTrabalhadas || ''}
                            onChange={(e) => setEditData(prev => ({ ...prev, horasTrabalhadas: Number(e.target.value) }))}
                            className="w-full h-9 text-sm border border-gray-300 rounded-lg text-center"
                          />
                        ) : (
                          <span className="text-gray-700 font-medium">{plantao.horasTrabalhadas}h</span>
                        )}
                      </td>

                      {/* Valor Bruto */}
                      <td className="p-3 text-right">
                        {editandoId === plantao.id ? (
                          <Input
                            type="number"
                            step="0.01"
                            value={editData.valorRecebido || ''}
                            onChange={(e) => setEditData(prev => ({ ...prev, valorRecebido: Number(e.target.value) }))}
                            className="w-full h-9 text-sm border border-gray-300 rounded-lg text-right"
                          />
                        ) : (
                          <span className="font-semibold text-emerald-600">
                            R$ {plantao.valorRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        )}
                      </td>

                      {/* Imposto */}
                      <td className="p-3 text-right">
                        {editandoId === plantao.id ? (
                          <Input
                            type="number"
                            step="0.01"
                            value={editData.imposto || ''}
                            onChange={(e) => setEditData(prev => ({ ...prev, imposto: Number(e.target.value) }))}
                            className="w-full h-9 text-sm border border-gray-300 rounded-lg text-right"
                          />
                        ) : (
                          <span className="text-red-600 font-medium">
                            R$ {plantao.imposto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        )}
                      </td>

                      {/* Valor Líquido */}
                      <td className="p-3 text-right">
                        <span className="font-bold text-blue-600">
                          R$ {calcularValorLiquido(
                            editandoId === plantao.id ? (editData.valorRecebido || 0) : plantao.valorRecebido,
                            editandoId === plantao.id ? (editData.imposto || 0) : plantao.imposto
                          ).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </td>

                      {/* Valor/Hora */}
                      <td className="p-3 text-right">
                        <span className="text-purple-600 font-medium">
                          R$ {calcularValorPorHora(
                            editandoId === plantao.id ? (editData.valorRecebido || 0) : plantao.valorRecebido,
                            editandoId === plantao.id ? (editData.horasTrabalhadas || 1) : plantao.horasTrabalhadas
                          ).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-3 text-center">
                        <Badge className={`${getStatusColor(plantao.statusPagamento)} border font-medium`}>
                          {plantao.statusPagamento}
                        </Badge>
                      </td>

                      {/* Ações */}
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-2">
                          {editandoId === plantao.id ? (
                            <>
                              <Button
                                size="sm"
                                className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
                                onClick={() => salvarEdicao(plantao.id)}
                                title="Salvar"
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 border-gray-300 hover:border-red-500 hover:bg-red-50"
                                onClick={cancelarEdicao}
                                title="Cancelar"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                                onClick={() => iniciarEdicao(plantao)}
                                title="Editar"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              
                              {plantao.statusPagamento === 'À Receber' && (
                                <Button
                                  size="sm"
                                  className="h-8 px-2 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg whitespace-nowrap"
                                  onClick={() => alterarStatus(plantao.id, 'Recebido')}
                                  title="Marcar como Recebido"
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Recebido
                                </Button>
                              )}
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="h-8 w-8 p-0 border-gray-300 hover:border-red-500 hover:bg-red-50"
                                    title="Excluir"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir este plantão? Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(plantao.id)}>
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resumo */}
      {plantoesFiltrados.length > 0 && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-teal-50">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-emerald-800">Resumo dos Plantões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {plantoesFiltrados.length}
                </div>
                <div className="text-sm text-emerald-700 font-medium">Total de Plantões</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  R$ {plantoesFiltrados.reduce((sum, p) => sum + p.valorRecebido, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-blue-700 font-medium">Total Bruto</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  R$ {plantoesFiltrados.reduce((sum, p) => sum + p.imposto, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-red-700 font-medium">Total Impostos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  R$ {plantoesFiltrados.reduce((sum, p) => sum + (p.valorRecebido - p.imposto), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-purple-700 font-medium">Total Líquido</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {plantoesFiltrados.reduce((sum, p) => sum + p.horasTrabalhadas, 0)}h
                </div>
                <div className="text-sm text-orange-700 font-medium">Total de Horas</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}