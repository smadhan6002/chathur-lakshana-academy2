import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://xoeizbsngsattbeykuvf.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvZWl6YnNuZ3NhdHRiZXlrdXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5MjA2MzYsImV4cCI6MjEwODQ5NjYzNn0._VBOFTcH0vbKYase9tNo2MvIrfYGJWK-ojX-XKRMowA';

export const supabaseUrl: string = (
  (import.meta.env.VITE_SUPABASE_URL as string) || DEFAULT_SUPABASE_URL
).trim().replace(/\/+$/, '');

export const supabaseKey: string = (
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string) ||
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  DEFAULT_SUPABASE_ANON_KEY
).trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  !supabaseUrl.includes('placeholder') &&
  !supabaseUrl.includes('your-project')
);

// Reusable singleton Supabase client
export const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

/**
 * Diagnostic helper to test Supabase Auth endpoint connectivity
 */
export async function testSupabaseConnection(): Promise<{
  ok: boolean;
  status?: number;
  message?: string;
  isPausedPossible?: boolean;
}> {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      message: 'Supabase configuration is missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
    };
  }

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return {
      ok: false,
      message: 'Your browser is currently offline. Please check your internet connection.',
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`${supabaseUrl}/auth/v1/health`, {
      method: 'GET',
      headers: {
        apikey: supabaseKey,
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      return { ok: true, status: res.status };
    }
    return {
      ok: false,
      status: res.status,
      message: `Authentication endpoint returned status ${res.status}.`,
    };
  } catch (err: any) {
    const isAbort = err?.name === 'AbortError';
    return {
      ok: false,
      isPausedPossible: true,
      message: isAbort
        ? 'Connection to Supabase timed out after 6 seconds.'
        : 'Cannot reach Supabase host. The project may be paused due to inactivity on the Free Tier.',
    };
  }
}

export default supabase;
