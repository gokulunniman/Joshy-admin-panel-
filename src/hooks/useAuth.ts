import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { auth, AuthState } from '@/lib/auth';

export function useAuth(): AuthState & {
  signIn: typeof auth.signIn;
  signUp: typeof auth.signUp;
  signOut: typeof auth.signOut;
} {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check admin role when user changes
        if (session?.user) {
          // Defer admin check to avoid blocking auth state change
          setTimeout(async () => {
            try {
              const adminStatus = await auth.checkAdminRole(session.user.id);
              setIsAdmin(adminStatus);
            } catch (error) {
              console.error('Error checking admin role:', error);
              setIsAdmin(false);
            }
          }, 0);
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    auth.getSession().then((session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        auth.checkAdminRole(session.user.id).then(setIsAdmin);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    session,
    isAdmin,
    loading,
    signIn: auth.signIn,
    signUp: auth.signUp,
    signOut: auth.signOut,
  };
}