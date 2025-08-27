import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// Configuração com fallbacks para desenvolvimento
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Cliente para componentes do lado do cliente
export const createSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey);
};

// Cliente para componentes do servidor
export const createSupabaseServerClient = () => {
  return createServerComponentClient({ cookies });
};

// Cliente para componentes do cliente (hook)
export const useSupabase = () => {
  return createClientComponentClient();
};

// Verificar se as variáveis estão configuradas
export const isSupabaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'placeholder-key'
  );
};