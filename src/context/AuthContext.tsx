
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if we have a session
    const checkSession = async () => {
      try {
        // This will be implemented when Supabase is connected
        setLoading(false);
      } catch (error) {
        console.error('Error checking auth session:', error);
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Placeholder for Supabase sign-in
      toast({
        title: "Please connect Supabase",
        description: "Authentication requires Supabase connection",
      });
    } catch (error) {
      console.error('Error signing in:', error);
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: "Please check your credentials and try again.",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      // Placeholder for Supabase sign-up
      toast({
        title: "Please connect Supabase",
        description: "Authentication requires Supabase connection",
      });
    } catch (error) {
      console.error('Error signing up:', error);
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: "Please check your input and try again.",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Placeholder for Supabase sign-out
      toast({
        title: "Please connect Supabase",
        description: "Authentication requires Supabase connection",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        variant: "destructive",
        title: "Sign Out Failed",
        description: "An error occurred while signing out.",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
