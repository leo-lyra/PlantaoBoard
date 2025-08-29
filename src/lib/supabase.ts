import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://stylhfkfuzjuydcdjatf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0eWxoZmtmdXpqdXlkY2RqYXRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMTQ3MjMsImV4cCI6MjA3MTg5MDcyM30.9DQY8Df2Z0VJQszYF8vhpujNaFpHX1vmw-0G-2hAzqw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)