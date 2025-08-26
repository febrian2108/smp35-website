import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Replace with your actual Supabase URL and anon key
const supabaseUrl = 'https://nzxardyeubnagfuyqoph.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56eGFyZHlldWJuYWdmdXlxb3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMzIxNjIsImV4cCI6MjA3MTcwODE2Mn0.PLVxIBUcPLdUzks3-PTDhQhV11mpaCCYyzT9S5aZiI8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

export default supabase;

