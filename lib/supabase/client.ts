import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dzglmkwjbvvvqfieofdt.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseAnonKey) {
  console.warn('Modern Man Kenya: NEXT_PUBLIC_SUPABASE_ANON_KEY is missing from environment.');
}

/**
 * Client-safe Supabase instance for browser execution.
 * Only accesses publicly granted tables/RLS policies.
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
