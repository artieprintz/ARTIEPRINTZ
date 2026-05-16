import { createClient } from '@supabase/supabase-js';

const supabaseUrlRaw = (import.meta.env.VITE_SUPABASE_URL || '').trim();
let supabaseUrl = supabaseUrlRaw
  .split('/storage/v1')[0]
  .split('/rest/v1')[0]
  .split('/v1')[0]
  .replace(/\/$/, '');

// Ensure protocol is present
if (supabaseUrl && !supabaseUrl.startsWith('http')) {
  supabaseUrl = `https://${supabaseUrl}`;
}

const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && 
  !import.meta.env.VITE_SUPABASE_URL.includes('your-project') &&
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  !import.meta.env.VITE_SUPABASE_ANON_KEY.includes('your-anon-key')
);

if (!isSupabaseConfigured) {
  console.warn('Supabase credentials missing or set to placeholder. Application will operate in local fallback mode.');
} else {
  console.info('Supabase initialized with project:', supabaseUrl);
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-project.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
