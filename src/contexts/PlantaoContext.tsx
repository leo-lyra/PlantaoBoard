"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Plantao, DashboardMetrics, LocalStats, PeriodFilter } from '@/types/plantao';
import { toast } from 'sonner';

interface PlantaoContextType {
  plantoes: Plantao[];
  addPlantao: (plantao: Omit<Plantao, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePlantao: (id: string, plantao: Partial<Plantao>) => void;
  deletePlantao: (id: string) => void;
  getPlantoesByPeriod: (filter: PeriodFilter) => Plantao[];
  getDashboardMetrics: (plantoes: Plantao[]) => DashboardMetrics;
  getLocalStats: (plantoes: Plantao[]) => LocalStats[];
  getUniqueLocais: () => string[];
  filteredPlantoes: Plantao[];
  setFilteredPlantoes: (plantoes: Plantao[]) => void;
}

const PlantaoContext = createContext<PlantaoContextType | undefined>(undefined);

export function PlantaoProvider({ children }: { children: React.ReactNode }) {
  const [plantoes, setPlantoes] = useState<Plantao[]>([]);
  const [filteredPlantoes, setFilteredPlantoes] = useState<Plantao[]>([]);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedPlantoes = localStorage.getItem('plantoes-medicos');
    if (savedPlantoes) {
      const parsed = JSON.parse(savedPlantoes);
      setPlantoes(parsed);
      setFilteredPlantoes(parsed);
    }
  }, []);

  // Salvar no localStorage sempre que plantoes mudar
  useEffect(() => {
    localStorage.setItem('plantoes-medicos', JSON.stringify(plantoes));
  }, [plantoes]);

  const addPlantao = (plantaoData: Omit<Plantao, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPlantao: Plantao = {
      ...plantaoData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setPlantoes(prev => [...prev, newPlantao]);
    setFilteredPlantoes(prev => [...prev, newPlantao]);
    toast.success('Plantão cadastrado com sucesso!');
  };

  const updatePlantao = (id: string, plantaoData: Partial<Plantao>) => {
    setPlantoes(prev => prev.map(plantao => 
      plantao.id === id 
        ? { ...plantao, ...plantaoData, updatedAt: new Date().toISOString() }
        : plantao
    ));
    setFilteredPlantoes(prev => prev.map(plantao => 
      plantao.id === id 
        ? { ...plantao, ...plantaoData, updatedAt: new Date().toISOString() }
        : plantao
    ));
    toast.success('Plantão atualizado com sucesso!');
  };

  const deletePlantao = (id: string) => {
    setPlantoes(prev => prev.filter(plantao => plantao.id !== id));
    setFilteredPlantoes(prev => prev.filter(plantao => plantao.id !== id));
    toast.success('Plantão removido com sucesso!');
  };

  const getPlantoesByPeriod = (filter: PeriodFilter): Plantao[] => {
    return plantoes.filter(plantao => {
      const plantaoDate = new Date(plantao.data);
      const inicio = new Date(filter.inicio);
      const fim = new Date(filter.fim);
      
      return plantaoDate >= inicio && plantaoDate <= fim;
    });
  };

  const getDashboardMetrics = (plantoesList: Plantao[]): DashboardMetrics => {
    const totalRecebido = plantoesList.reduce((sum, p) => sum + p.valorRecebido, 0);
    const totalHoras = plantoesList.reduce((sum, p) => sum + p.horasTrabalhadas, 0);
    const impostoTotal = plantoesList.reduce((sum, p) => sum + p.imposto, 0);
    const totalPlantoes = plantoesList.length;
    
    return {
      totalRecebido,
      totalHoras,
      totalPlantoes,
      valorMedioHora: totalHoras > 0 ? totalRecebido / totalHoras : 0,
      valorMedioPlantao: totalPlantoes > 0 ? totalRecebido / totalPlantoes : 0,
      impostoTotal,
      valorLiquido: totalRecebido - impostoTotal,
    };
  };

  const getLocalStats = (plantoesList: Plantao[]): LocalStats[] => {
    const localMap = new Map<string, LocalStats>();
    const totalGeral = plantoesList.reduce((sum, p) => sum + p.valorRecebido, 0);

    plantoesList.forEach(plantao => {
      const existing = localMap.get(plantao.local) || {
        local: plantao.local,
        totalRecebido: 0,
        totalHoras: 0,
        totalPlantoes: 0,
        valorMedio: 0,
        percentualTotal: 0,
      };

      existing.totalRecebido += plantao.valorRecebido;
      existing.totalHoras += plantao.horasTrabalhadas;
      existing.totalPlantoes += 1;
      existing.valorMedio = existing.totalRecebido / existing.totalPlantoes;
      existing.percentualTotal = totalGeral > 0 ? (existing.totalRecebido / totalGeral) * 100 : 0;

      localMap.set(plantao.local, existing);
    });

    return Array.from(localMap.values()).sort((a, b) => b.totalRecebido - a.totalRecebido);
  };

  const getUniqueLocais = (): string[] => {
    const locais = new Set(plantoes.map(p => p.local));
    return Array.from(locais).sort();
  };

  return (
    <PlantaoContext.Provider value={{
      plantoes,
      addPlantao,
      updatePlantao,
      deletePlantao,
      getPlantoesByPeriod,
      getDashboardMetrics,
      getLocalStats,
      getUniqueLocais,
      filteredPlantoes,
      setFilteredPlantoes,
    }}>
      {children}
    </PlantaoContext.Provider>
  );
}

export function usePlantao() {
  const context = useContext(PlantaoContext);
  if (context === undefined) {
    throw new Error('usePlantao must be used within a PlantaoProvider');
  }
  return context;
}