"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function TestSupabase() {
  const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [message, setMessage] = useState('Testando conexão...');
  const supabase = createClientComponentClient();

  const testConnection = async () => {
    setStatus('testing');
    setMessage('Testando conexão com Supabase...');

    try {
      // Testar conexão básica
      const { data, error } = await supabase.from('profiles').select('count').limit(1);
      
      if (error) {
        setStatus('error');
        setMessage(`Erro: ${error.message}`);
        return;
      }

      setStatus('success');
      setMessage('✅ Conexão com Supabase funcionando!');
    } catch (error) {
      setStatus('error');
      setMessage(`Erro de conexão: ${error}`);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  const getIcon = () => {
    switch (status) {
      case 'testing':
        return <AlertCircle className="h-6 w-6 text-yellow-500 animate-pulse" />;
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'error':
        return <XCircle className="h-6 w-6 text-red-500" />;
    }
  };

  const getColor = () => {
    switch (status) {
      case 'testing':
        return 'border-yellow-200 bg-yellow-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
    }
  };

  return (
    <Card className={`${getColor()} border-2`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getIcon()}
          Teste de Conexão Supabase
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{message}</p>
        
        <div className="space-y-2 text-sm">
          <div>
            <strong>URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Não configurada'}
          </div>
          <div>
            <strong>Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Configurada' : 'Não configurada'}
          </div>
        </div>

        <Button 
          onClick={testConnection} 
          className="mt-4"
          disabled={status === 'testing'}
        >
          {status === 'testing' ? 'Testando...' : 'Testar Novamente'}
        </Button>
      </CardContent>
    </Card>
  );
}