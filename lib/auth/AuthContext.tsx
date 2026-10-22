'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: (redirectTo?: string) => Promise<{ error: AuthError | null }>;
  signInWithEmail: (email: string, pass: string) => Promise<{ error: AuthError | null }>;
  signUpWithEmail: (
    email: string,
    pass: string,
    metadata?: { full_name?: string; phone?: string }
  ) => Promise<{ error: AuthError | null; user: User | null }>;
  signOut: () => Promise<void>;
  resetPasswordForEmail: (email: string) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Derive profile from user and user_metadata
  const profile: UserProfile | null = useMemo(() => {
    if (!user) return null;
    const meta = user.user_metadata || {};
    return {
      id: user.id,
      email: user.email || '',
      fullName: meta.full_name || meta.name || user.email?.split('@')[0] || 'Modern Gentleman',
      phone: meta.phone || user.phone || undefined,
      avatarUrl: meta.avatar_url || meta.picture || undefined,
    };
  }, [user]);

  useEffect(() => {
    // 1. Initial session retrieval
    const initializeAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.warn('Modern Man Kenya: Session retrieval notice:', error.message);
        }
        setSession(data.session);
        setUser(data.session?.user ?? null);
      } catch (err) {
        console.warn('Modern Man Kenya: Auth initialization notice:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // 2. Real-time auth listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async (customRedirect?: string) => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const redirectUrl = customRedirect || `${origin}/auth/callback`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      return { error };
    } catch (err: any) {
      return { error: err as AuthError };
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: pass,
      });
      return { error };
    } catch (err: any) {
      return { error: err as AuthError };
    }
  };

  const signUpWithEmail = async (
    email: string,
    pass: string,
    metadata?: { full_name?: string; phone?: string }
  ) => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password: pass,
        options: {
          data: {
            full_name: metadata?.full_name?.trim(),
            phone: metadata?.phone?.trim(),
          },
          emailRedirectTo: `${origin}/auth/callback`,
        },
      });
      return { error, user: data.user };
    } catch (err: any) {
      return { error: err as AuthError, user: null };
    }
  };

  const resetPasswordForEmail = async (email: string) => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${origin}/account/reset-password`,
      });
      return { error };
    } catch (err: any) {
      return { error: err as AuthError };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Sign out notice:', err);
    } finally {
      setUser(null);
      setSession(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        resetPasswordForEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
