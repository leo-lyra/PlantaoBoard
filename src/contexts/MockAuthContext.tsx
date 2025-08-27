"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { testUserCredentials } from '@/lib/mock-data';

interface MockUser {
  id: string;
  name: string;
  email: string;
  subscription_status: 'trial' | 'active' | 'expired';
  trial_ends_at: string;
}

interface MockAuthContextType {
  user: MockUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const MockAuthContext = createContext<MockAuthContextType | undefined>(undefined);

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há sessão salva
    const savedSession = localStorage.getItem('mock-user-session');
    if (savedSession) {
      setUser(JSON.parse(savedSession));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === testUserCredentials.email && password === testUserCredentials.password) {
      const mockUser: MockUser = {
        id: 'test-user-1',
        name: testUserCredentials.name,
        email: testUserCredentials.email,
        subscription_status: 'trial',
        trial_ends_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() // 5 dias
      };

      setUser(mockUser);
      localStorage.setItem('mock-user-session', JSON.stringify(mockUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mock-user-session');
  };

  return (
    <MockAuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockAuth() {
  const context = useContext(MockAuthContext);
  if (context === undefined) {
    throw new Error('useMockAuth must be used within a MockAuthProvider');
  }
  return context;
}