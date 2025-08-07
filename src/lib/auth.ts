import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  fullName: string;
}

export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const auth = {
  async signIn(credentials: LoginCredentials) {
    const { email, password } = credentials;
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new AuthError(error.message, error.message);
    }

    return data;
  },

  async signUp(credentials: SignupCredentials) {
    const { email, password, fullName } = credentials;
    
    const redirectUrl = `${window.location.origin}/admin/dashboard`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) {
      throw new AuthError(error.message, error.message);
    }

    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw new AuthError(error.message, error.message);
    }
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      throw new AuthError(error.message, error.message);
    }

    return session;
  },

  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw new AuthError(error.message, error.message);
    }

    return user;
  },

  async checkAdminRole(userId?: string): Promise<boolean> {
    try {
      if (!userId) {
        const session = await this.getSession();
        if (!session?.user?.id) return false;
        userId = session.user.id;
      }

      const { data, error } = await supabase
        .from('admin_users')
        .select('role, is_active')
        .eq('id', userId)
        .single();

      if (error || !data) return false;
      
      return data.is_active && ['admin', 'super_admin'].includes(data.role);
    } catch {
      return false;
    }
  },

  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};