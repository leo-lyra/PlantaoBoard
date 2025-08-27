"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, Plus, Calculator } from 'lucide-react';
import { usePlantao } from '@/contexts/PlantaoContext';
import { Plantao } from '@/types/plantao';
import { toast } from 'sonner';

const plantaoSchema = z.object({
  local: z.string().min(1, 'Local é obrigatório'),
  data: z.string().min(1, 'Data é obrigatória'),
  horasTrabalhadas: z.number().min(0.1, 'Horas trabalhadas deve ser maior que 0'),
  valorRecebido: z.number().min(0, 'Valor deve ser maior ou igual a 0'),
  imposto: z.number().min(0, 'Imposto deve ser maior ou igual a 0'),
  statusPagamento: z.enum(['Pago', 'Pendente', 'Atrasado']),
  numeroNotaFiscal: z.string().optional(),
});

type PlantaoFormData = z.infer<typeof plantaoSchema>;

interface PlantaoFormProps {
  plantao?: Plantao;
  onSuccess?: () => void;
}

export function PlantaoForm({ plantao, onSuccess }: PlantaoFormProps) {
  const { addPlantao, updatePlantao, getUniqueLocais } = usePlantao();
  const [novoLocal, setNovoLocal] = useState('');
  const [mostrarNovoLocal, setMostrarNovoLocal] = useState(false);
  const [calcularImpostoAuto, setCalcularImpostoAuto] = useState(true);
  const [percentualImposto, setPercentualImposto] = useState(11); // 11% padrão para MEI

  const locaisExistentes = getUniqueLocais();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<PlantaoFormData>({
    resolver: zodResolver(plantaoSchema),
    defaultValues: plantao ? {
      local: plantao.local,
      data: plantao.data,
      horasTrabalhadas: plantao.horasTrabalhadas,
      valorRecebido: plantao.valorRecebido,
      imposto: plantao.imposto,
      statusPagamento: plantao.statusPagamento,
      numeroNotaFiscal: plantao.numeroNotaFiscal || '',
    } : {
      statusPagamento: 'Pendente',
      data: new Date().toISOString().split('T')[0],
    }
  });

  const valorRecebido = watch('valorRecebido');

  // Calcular imposto automaticamente
  React.useEffect(() => {
    if (calcularImpostoAuto && valorRecebido) {
      const impostoCalculado = (valorRecebido * percentualImposto) / 100;
      setValue('imposto', Number(impostoCalculado.toFixed(2)));
    }
  }, [valorRecebido, percentualImposto, calcularImpostoAuto, setValue]);

  const onSubmit = (data: PlantaoFormData) => {
    const localFinal = mostrarNovoLocal ? novoLocal : data.local;
    
    if (!localFinal) {
      toast.error('Por favor, selecione ou adicione um local');
      return;
    }

    const plantaoData = {
      ...data,
      local: localFinal,
    };

    if (plantao) {
      updatePlantao(plantao.id, plantaoData);
    } else {
      addPlantao(plantaoData);
      reset();
      setNovoLocal('');
      setMostrarNovoLocal(false);
    }

    onSuccess?.();
  };

  const adicionarNovoLocal = () => {
    if (novoLocal.trim()) {
      setValue('local', novoLocal);
      setMostrarNovoLocal(false);
      toast.success('Novo local adicionado!');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          {plantao ? 'Editar Plantão' : 'Cadastrar Novo Plantão'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Local */}
          <div className="space-y-2">
            <Label htmlFor="local">Local do Plantão</Label>
            {!mostrarNovoLocal ? (
              <div className="flex gap-2">
                <Select onValueChange={(value) => setValue('local', value)}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Selecione um local" />
                  </SelectTrigger>
                  <SelectContent>
                    {locaisExistentes.map((local) => (
                      <SelectItem key={local} value={local}>
                        {local}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setMostrarNovoLocal(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Digite o nome do novo local"
                  value={novoLocal}
                  onChange={(e) => setNovoLocal(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" onClick={adicionarNovoLocal}>
                  Adicionar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setMostrarNovoLocal(false)}
                >
                  Cancelar
                </Button>
              </div>
            )}
            {errors.local && (
              <p className="text-sm text-red-500">{errors.local.message}</p>
            )}
          </div>

          {/* Data */}
          <div className="space-y-2">
            <Label htmlFor="data">Data do Plantão</Label>
            <Input
              type="date"
              {...register('data')}
              className="w-full"
            />
            {errors.data && (
              <p className="text-sm text-red-500">{errors.data.message}</p>
            )}
          </div>

          {/* Horas e Valor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="horasTrabalhadas">Horas Trabalhadas</Label>
              <Input
                type="number"
                step="0.5"
                {...register('horasTrabalhadas', { valueAsNumber: true })}
                placeholder="Ex: 12"
              />
              {errors.horasTrabalhadas && (
                <p className="text-sm text-red-500">{errors.horasTrabalhadas.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="valorRecebido">Valor Recebido (R$)</Label>
              <Input
                type="number"
                step="0.01"
                {...register('valorRecebido', { valueAsNumber: true })}
                placeholder="Ex: 1200.00"
              />
              {errors.valorRecebido && (
                <p className="text-sm text-red-500">{errors.valorRecebido.message}</p>
              )}
            </div>
          </div>

          {/* Imposto */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label>Cálculo do Imposto</Label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={calcularImpostoAuto}
                  onChange={(e) => setCalcularImpostoAuto(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Calcular automaticamente</span>
              </div>
            </div>

            {calcularImpostoAuto && (
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                <Label htmlFor="percentualImposto">Percentual (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={percentualImposto}
                  onChange={(e) => setPercentualImposto(Number(e.target.value))}
                  className="w-20"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="imposto">Valor do Imposto (R$)</Label>
              <Input
                type="number"
                step="0.01"
                {...register('imposto', { valueAsNumber: true })}
                placeholder="Ex: 132.00"
                disabled={calcularImpostoAuto}
              />
              {errors.imposto && (
                <p className="text-sm text-red-500">{errors.imposto.message}</p>
              )}
            </div>
          </div>

          {/* Status e NF */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="statusPagamento">Status do Pagamento</Label>
              <Select onValueChange={(value) => setValue('statusPagamento', value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pago">Pago</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Atrasado">Atrasado</SelectItem>
                </SelectContent>
              </Select>
              {errors.statusPagamento && (
                <p className="text-sm text-red-500">{errors.statusPagamento.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="numeroNotaFiscal">Número da Nota Fiscal (Opcional)</Label>
              <Input
                {...register('numeroNotaFiscal')}
                placeholder="Ex: 001234"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            {plantao ? 'Atualizar Plantão' : 'Cadastrar Plantão'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}