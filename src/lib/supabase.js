import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Replace with your actual Supabase URL and anon key
const supabaseUrl = 'https://ahuebyuorohgxlngtjsg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFodWVieXVvcm9oZ3hsbmd0anNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMDMwNzIsImV4cCI6MjA3Mjg3OTA3Mn0.qbzqwllgz8KAx1lSoqNhM3ylVYsCsC2bP0WZKjvt5DA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

export default supabase;

