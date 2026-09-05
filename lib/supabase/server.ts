import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

/**
 * Server-only Supabase admin client.
 * Uses SUPABASE_SERVICE_ROLE_KEY and must NEVER be imported in client components.
 */
export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dzglmkwjbvvvqfieofdt.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error('Modern Man Kenya: SUPABASE_SERVICE_ROLE_KEY is required for server operations.');
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
