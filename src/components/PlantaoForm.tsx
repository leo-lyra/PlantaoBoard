"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, Calculator, Clock, DollarSign, Percent } from 'lucide-react';
import { usePlantao } from '@/contexts/PlantaoContext';
import { Plantao } from '@/types/plantao';
import { HospitalSelector } from './HospitalSelector';
import { toast } from 'sonner';

const plantaoSchema = z.object({
  local: z.string().min(1, 'Local é obrigatório'),
  data: z.string().min(1, 'Data é obrigatória'),
  horasTrabalhadas: z.number().min(0.1, 'Horas trabalhadas deve ser maior que 0'),
  valorRecebido: z.number().min(0, 'Valor deve ser maior ou igual a 0'),
  imposto: z.number().min(0, 'Imposto deve ser maior ou igual a 0'),
});

type PlantaoFormData = z.infer<typeof plantaoSchema>;

interface PlantaoFormProps {
  plantao?: Plantao;
  onSuccess?: () => void;
}

export function PlantaoForm({ plantao, onSuccess }: PlantaoFormProps) {
  const { addPlantao, updatePlantao } = usePlantao();
  const [calcularImpostoAuto, setCalcularImpostoAuto] = useState(true);
  const [percentualImposto, setPercentualImposto] = useState(11);

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
    } : {
      data: new Date().toISOString().split('T')[0],
    }
  });

  const valorRecebido = watch('valorRecebido');
  const localValue = watch('local');

  React.useEffect(() => {
    if (calcularImpostoAuto && valorRecebido) {
      const impostoCalculado = (valorRecebido * percentualImposto) / 100;
      setValue('imposto', Number(impostoCalculado.toFixed(2)));
    }
  }, [valorRecebido, percentualImposto, calcularImpostoAuto, setValue]);

  const onSubmit = (data: PlantaoFormData) => {
    const plantaoData = {
      ...data,
      statusPagamento: plantao?.statusPagamento || 'Pendente' as const,
      numeroNotaFiscal: plantao?.numeroNotaFiscal,
    };

    if (plantao) {
      updatePlantao(plantao.id, plantaoData);
    } else {
      addPlantao(plantaoData);
      reset();
    }

    onSuccess?.();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
          <CalendarIcon className="h-6 w-6 text-white" />
          <h1 className="text-xl font-bold text-white">
            {plantao ? 'Editar Plantão' : 'Cadastrar Novo Plantão'}
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          {plantao ? 'Atualize as informações do seu plantão' : 'Registre os detalhes do seu plantão médico'}
        </p>
      </div>

      <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Local */}
            <HospitalSelector
              value={localValue || ''}
              onChange={(value) => setValue('local', value)}
              error={errors.local?.message}
            />

            {/* Data e Horas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-purple-600" />
                  Data do Plantão
                </Label>
                <Input
                  type="date"
                  {...register('data')}
                  className="h-12 border-2 border-gray-200 rounded-xl focus:border-purple-500 transition-colors"
                />
                {errors.data && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.data.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  Horas Trabalhadas
                </Label>
                <Input
                  type="number"
                  step="0.5"
                  {...register('horasTrabalhadas', { valueAsNumber: true })}
                  placeholder="Ex: 12"
                  className="h-12 border-2 border-gray-200 rounded-xl focus:border-emerald-500 transition-colors"
                />
                {errors.horasTrabalhadas && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.horasTrabalhadas.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Valor Recebido (R$)
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('valorRecebido', { valueAsNumber: true })}
                  placeholder="Ex: 1200.00"
                  className="h-12 border-2 border-gray-200 rounded-xl focus:border-green-500 transition-colors"
                />
                {errors.valorRecebido && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.valorRecebido.message}
                  </p>
                )}
              </div>
            </div>

            {/* Imposto */}
            <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-orange-600" />
                  Cálculo do Imposto
                </Label>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={calcularImpostoAuto}
                    onChange={(e) => setCalcularImpostoAuto(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Calcular automaticamente</span>
                </div>
              </div>

              {calcularImpostoAuto && (
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                  <Percent className="h-5 w-5 text-orange-600" />
                  <Label className="font-medium text-gray-700">Percentual:</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={percentualImposto}
                    onChange={(e) => setPercentualImposto(Number(e.target.value))}
                    className="w-24 h-10 border-2 border-gray-200 rounded-lg focus:border-orange-500"
                  />
                  <span className="text-gray-600 font-medium">%</span>
                </div>
              )}

              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-900">
                  Valor do Imposto (R$)
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('imposto', { valueAsNumber: true })}
                  placeholder="Ex: 132.00"
                  disabled={calcularImpostoAuto}
                  className="h-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 transition-colors disabled:bg-gray-100"
                />
                {errors.imposto && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.imposto.message}
                  </p>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {plantao ? 'Atualizar Plantão' : 'Cadastrar Plantão'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}