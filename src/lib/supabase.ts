import { createClient } from '@supabase/supabase-js';

// Extract clean Supabase project URL from env
const raw = (import.meta.env.VITE_SUPABASE_URL || '').trim();

// Strip any trailing path segments (/rest/v1, /storage/v1, etc.)
const supabaseUrl = raw
  .replace(/\/(rest|storage|auth|realtime|functions)(\/v\d+)?\/?.*$/i, '')
  .replace(/\/+$/, '') || '';

const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  !supabaseUrl.includes('your-project') &&
  !supabaseUrl.includes('placeholder') &&
  supabaseAnonKey &&
  !supabaseAnonKey.includes('your-anon-key') &&
  !supabaseAnonKey.includes('placeholder')
);

if (!isSupabaseConfigured) {
  console.warn('[Supabase] Not configured — running in localStorage fallback mode.');
} else {
  console.info('[Supabase] Connected to:', supabaseUrl);
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
