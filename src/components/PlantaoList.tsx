"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Filter, Edit, Trash2, Calendar, MapPin, 
  Clock, DollarSign, FileText, AlertCircle 
} from 'lucide-react';
import { usePlantao } from '@/contexts/PlantaoContext';
import { Plantao } from '@/types/plantao';
import { PlantaoForm } from './PlantaoForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export function PlantaoList() {
  const { plantoes, deletePlantao, getUniqueLocais } = usePlantao();
  const [busca, setBusca] = useState('');
  const [filtroLocal, setFiltroLocal] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [editandoPlantao, setEditandoPlantao] = useState<Plantao | null>(null);
  const [dialogAberto, setDialogAberto] = useState(false);

  const locaisUnicos = getUniqueLocais();

  const plantoesFiltrados = useMemo(() => {
    return plantoes.filter(plantao => {
      const matchBusca = plantao.local.toLowerCase().includes(busca.toLowerCase()) ||
                        plantao.numeroNotaFiscal?.toLowerCase().includes(busca.toLowerCase());
      const matchLocal = !filtroLocal || plantao.local === filtroLocal;
      const matchStatus = !filtroStatus || plantao.statusPagamento === filtroStatus;
      
      return matchBusca && matchLocal && matchStatus;
    }).sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  }, [plantoes, busca, filtroLocal, filtroStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pago': return 'bg-green-100 text-green-800';
      case 'Pendente': return 'bg-yellow-100 text-yellow-800';
      case 'Atrasado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (plantao: Plantao) => {
    setEditandoPlantao(plantao);
    setDialogAberto(true);
  };

  const handleEditSuccess = () => {
    setEditandoPlantao(null);
    setDialogAberto(false);
  };

  const handleDelete = (id: string) => {
    deletePlantao(id);
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
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
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filtroLocal} onValueChange={setFiltroLocal}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por local" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os locais</SelectItem>
                {locaisUnicos.map(local => (
                  <SelectItem key={local} value={local}>{local}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os status</SelectItem>
                <SelectItem value="Pago">Pago</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Atrasado">Atrasado</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setBusca('');
                setFiltroLocal('');
                setFiltroStatus('');
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Plantões */}
      <div className="space-y-4">
        {plantoesFiltrados.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum plantão encontrado</h3>
              <p className="text-muted-foreground text-center">
                {plantoes.length === 0 
                  ? 'Cadastre seu primeiro plantão para começar.'
                  : 'Tente ajustar os filtros para encontrar os plantões desejados.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          plantoesFiltrados.map((plantao) => (
            <Card key={plantao.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{plantao.local}</span>
                      </div>
                      <Badge className={getStatusColor(plantao.statusPagamento)}>
                        {plantao.statusPagamento}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(plantao.data).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{plantao.horasTrabalhadas}h</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>R$ {plantao.valorRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                      {plantao.numeroNotaFiscal && (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>NF: {plantao.numeroNotaFiscal}</span>
                        </div>
                      )}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <span>Valor/hora: R$ {(plantao.valorRecebido / plantao.horasTrabalhadas).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      <span className="mx-2">•</span>
                      <span>Imposto: R$ {plantao.imposto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      <span className="mx-2">•</span>
                      <span>Líquido: R$ {(plantao.valorRecebido - plantao.imposto).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Dialog open={dialogAberto && editandoPlantao?.id === plantao.id} onOpenChange={setDialogAberto}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(plantao)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Editar Plantão</DialogTitle>
                        </DialogHeader>
                        {editandoPlantao && (
                          <PlantaoForm 
                            plantao={editandoPlantao} 
                            onSuccess={handleEditSuccess}
                          />
                        )}
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
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
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Resumo */}
      {plantoesFiltrados.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resumo dos Plantões Filtrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Total de Plantões:</span>
                <div className="font-semibold">{plantoesFiltrados.length}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Total Recebido:</span>
                <div className="font-semibold">
                  R$ {plantoesFiltrados.reduce((sum, p) => sum + p.valorRecebido, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Total de Horas:</span>
                <div className="font-semibold">
                  {plantoesFiltrados.reduce((sum, p) => sum + p.horasTrabalhadas, 0)}h
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Valor Médio/Hora:</span>
                <div className="font-semibold">
                  R$ {(
                    plantoesFiltrados.reduce((sum, p) => sum + p.valorRecebido, 0) /
                    plantoesFiltrados.reduce((sum, p) => sum + p.horasTrabalhadas, 0)
                  ).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}