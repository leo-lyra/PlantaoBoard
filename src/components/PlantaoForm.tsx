"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, Calculator, Clock, DollarSign, Percent, CheckCircle } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const horasTrabalhadas = watch('horasTrabalhadas');
  const imposto = watch('imposto');
  const localValue = watch('local');

  // Cálculo automático do imposto
  React.useEffect(() => {
    if (calcularImpostoAuto && valorRecebido) {
      const impostoCalculado = (valorRecebido * percentualImposto) / 100;
      setValue('imposto', Number(impostoCalculado.toFixed(2)));
    }
  }, [valorRecebido, percentualImposto, calcularImpostoAuto, setValue]);

  // Cálculos em tempo real
  const valorLiquido = valorRecebido && imposto ? valorRecebido - imposto : 0;
  const valorPorHora = valorRecebido && horasTrabalhadas ? valorRecebido / horasTrabalhadas : 0;

  const onSubmit = async (data: PlantaoFormData) => {
    setIsSubmitting(true);
    
    try {
      const plantaoData = {
        ...data,
        statusPagamento: plantao?.statusPagamento || 'À Receber' as const,
        numeroNotaFiscal: plantao?.numeroNotaFiscal,
      };

      if (plantao) {
        updatePlantao(plantao.id, plantaoData);
        toast.success('Plantão atualizado com sucesso!', {
          description: 'As informações foram salvas e o dashboard foi atualizado.',
        });
      } else {
        addPlantao(plantaoData);
        toast.success('Plantão cadastrado com sucesso!', {
          description: 'Status: À Receber • Disponível na planilha de plantões.',
        });
        reset();
      }

      onSuccess?.();
    } catch (error) {
      toast.error('Erro ao salvar plantão', {
        description: 'Tente novamente ou verifique os dados informados.',
      });
    } finally {
      setIsSubmitting(false);
    }
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
        {!plantao && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 border border-yellow-200 rounded-lg">
            <CheckCircle className="h-4 w-4 text-yellow-600" />
            <span className="text-yellow-800 text-sm font-medium">
              Status padrão: À Receber
            </span>
          </div>
        )}
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

            {/* Cálculos em Tempo Real */}
            {(valorRecebido || horasTrabalhadas || imposto) && (
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Cálculos Automáticos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-gray-600">Valor Líquido</p>
                      <p className="text-lg font-bold text-blue-600">
                        R$ {valorLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-gray-600">Valor por Hora</p>
                      <p className="text-lg font-bold text-emerald-600">
                        R$ {valorPorHora.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-gray-600">% Imposto</p>
                      <p className="text-lg font-bold text-orange-600">
                        {valorRecebido ? ((imposto / valorRecebido) * 100).toFixed(1) : 0}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

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
                  <div className="ml-auto text-sm text-gray-600">
                    Sugestão: MEI 11% • Simples 15-20%
                  </div>
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
              disabled={isSubmitting}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Salvando...
                </div>
              ) : (
                plantao ? 'Atualizar Plantão' : 'Cadastrar Plantão'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}