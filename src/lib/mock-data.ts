export interface MockUser {
  id: string;
  name: string;
  email: string;
  subscription_status: 'trial' | 'active' | 'expired' | 'cancelled';
  subscription_plan: 'mensal' | 'anual' | null;
  trial_ends_at: string;
  created_at: string;
  last_login: string;
  total_plantoes: number;
  total_revenue: number;
  city: string;
  specialty: string;
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'Dr. Carlos Silva',
    email: 'carlos.silva@email.com',
    subscription_status: 'active',
    subscription_plan: 'anual',
    trial_ends_at: '2024-12-31T23:59:59Z',
    created_at: '2024-01-15T10:30:00Z',
    last_login: '2024-12-20T14:22:00Z',
    total_plantoes: 45,
    total_revenue: 54000,
    city: 'São Paulo',
    specialty: 'Cardiologia'
  },
  {
    id: '2',
    name: 'Dra. Ana Costa',
    email: 'ana.costa@email.com',
    subscription_status: 'active',
    subscription_plan: 'mensal',
    trial_ends_at: '2024-12-31T23:59:59Z',
    created_at: '2024-02-20T09:15:00Z',
    last_login: '2024-12-20T16:45:00Z',
    total_plantoes: 32,
    total_revenue: 38400,
    city: 'Rio de Janeiro',
    specialty: 'Pediatria'
  },
  {
    id: '3',
    name: 'Dr. Roberto Lima',
    email: 'roberto.lima@email.com',
    subscription_status: 'trial',
    subscription_plan: null,
    trial_ends_at: '2024-12-25T23:59:59Z',
    created_at: '2024-12-18T11:20:00Z',
    last_login: '2024-12-20T08:30:00Z',
    total_plantoes: 3,
    total_revenue: 3600,
    city: 'Belo Horizonte',
    specialty: 'Ortopedia'
  },
  {
    id: '4',
    name: 'Dra. Maria Santos',
    email: 'maria.santos@email.com',
    subscription_status: 'expired',
    subscription_plan: null,
    trial_ends_at: '2024-12-10T23:59:59Z',
    created_at: '2024-12-03T14:45:00Z',
    last_login: '2024-12-15T12:10:00Z',
    total_plantoes: 8,
    total_revenue: 9600,
    city: 'Porto Alegre',
    specialty: 'Ginecologia'
  },
  {
    id: '5',
    name: 'Dr. João Oliveira',
    email: 'joao.oliveira@email.com',
    subscription_status: 'active',
    subscription_plan: 'anual',
    trial_ends_at: '2024-12-31T23:59:59Z',
    created_at: '2024-03-10T16:30:00Z',
    last_login: '2024-12-20T19:15:00Z',
    total_plantoes: 67,
    total_revenue: 80400,
    city: 'Brasília',
    specialty: 'Neurologia'
  },
  {
    id: '6',
    name: 'Dra. Patricia Ferreira',
    email: 'patricia.ferreira@email.com',
    subscription_status: 'trial',
    subscription_plan: null,
    trial_ends_at: '2024-12-28T23:59:59Z',
    created_at: '2024-12-21T08:00:00Z',
    last_login: '2024-12-21T08:05:00Z',
    total_plantoes: 0,
    total_revenue: 0,
    city: 'Fortaleza',
    specialty: 'Dermatologia'
  }
];

// Credenciais de admin para teste
export const adminCredentials = {
  email: 'admin@plantaomed.com',
  password: 'admin123',
  name: 'Administrador PlantãoMed'
};

// Dados de demonstração para o usuário teste
export const testUserCredentials = {
  email: 'teste@plantaomed.com',
  password: 'teste123',
  name: 'Dr. Teste Silva'
};

export const getDashboardStats = () => {
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(u => u.subscription_status === 'active').length;
  const trialUsers = mockUsers.filter(u => u.subscription_status === 'trial').length;
  const totalRevenue = mockUsers.reduce((sum, u) => sum + u.total_revenue, 0);
  const monthlyRevenue = mockUsers
    .filter(u => u.subscription_status === 'active')
    .reduce((sum, u) => sum + (u.subscription_plan === 'mensal' ? 9.90 : 7.92), 0);

  return {
    totalUsers,
    activeUsers,
    trialUsers,
    expiredUsers: mockUsers.filter(u => u.subscription_status === 'expired').length,
    totalRevenue,
    monthlyRevenue,
    conversionRate: totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0
  };
};