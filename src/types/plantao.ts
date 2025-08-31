export interface Plantao {
  id: string;
  local: string;
  data: string;
  horasTrabalhadas: number;
  valorRecebido: number;
  imposto: number;
  statusPagamento: 'Recebido' | 'À Receber' | 'Atrasado';
  numeroNotaFiscal?: string;
  anexo?: string;
  // Coordenadas para futuro mapa
  latitude?: number;
  longitude?: number;
  cidade?: string;
  estado?: string;
  tipoLocal?: 'Hospital' | 'UBS' | 'UPA' | 'Pronto Socorro' | 'Hospital Universitário' | 'Outro';
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
  cidade?: string;
  estado?: string;
  latitude?: number;
  longitude?: number;
}

export interface PeriodFilter {
  inicio: string;
  fim: string;
  tipo: 'dia' | 'semana' | 'mes' | 'ano' | 'personalizado';
}
