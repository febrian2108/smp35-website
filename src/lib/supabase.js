import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Replace with your actual Supabase URL and anon key
const supabaseUrl = 'https://xvetwsjrukjznyxdxmlz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2ZXR3c2pydWtqem55eGR4bWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MDM2NTMsImV4cCI6MjA3MTM3OTY1M30.TrP8QDF7J80Ok1fAi__2lvEdgM0c4L4493-j0h94gNk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

export default supabase;

