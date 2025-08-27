export interface Plantao {
  id: string;
  local: string;
  data: string;
  horasTrabalhadas: number;
  valorRecebido: number;
  imposto: number;
  statusPagamento: 'Pago' | 'Pendente' | 'Atrasado';
  numeroNotaFiscal?: string;
  anexo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardMetrics {
  totalRecebido: number;
  totalHoras: number;
  totalPlantoes: number;
  valorMedioHora: number;
  valorMedioPlantao: number;
  impostoTotal: number;
  valorLiquido: number;
}

export interface LocalStats {
  local: string;
  totalRecebido: number;
  totalHoras: number;
  totalPlantoes: number;
  valorMedio: number;
  percentualTotal: number;
}

export interface PeriodFilter {
  inicio: string;
  fim: string;
  tipo: 'dia' | 'semana' | 'mes' | 'ano' | 'personalizado';
}