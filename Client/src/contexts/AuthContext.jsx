import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch profile & merge with auth session
  const fetchProfile = async (session) => {
    if (!session) {
      setUser(null);
      return;
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .maybeSingle();

    if (error) console.error('Error fetching profile:', error.message);

    setUser(profile ? { ...session.user, ...profile } : session.user);
  };

  useEffect(() => {
    const initializeUser = async () => {
      const { data } = await supabase.auth.getSession();
      await fetchProfile(data.session);
      setLoading(false);
    };

    initializeUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      fetchProfile(session);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  // 🔹 Update profile (for user settings page)
  const updateProfile = async (updates) => {
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date() })
      .eq('id', user.id)
      .maybeSingle();

    if (error) throw error;

    setUser((prev) => ({ ...prev, ...data }));
    return data;
  };

  // 🔹 Google sign in
  const signInWithGoogle = async () => {
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  // 🔹 Sign up with email/password
  const signUp = async (credentials, acceptedTerms) => {
    if (!acceptedTerms) {
      throw new Error('You must accept the Terms of Service and Privacy Policy.');
    }

    const { data, error } = await supabase.auth.signUp(credentials);
    if (error) throw error;

    if (data.user) {
      // ✅ Create profile row immediately
      await supabase.from('profiles').upsert({
        id: data.user.id,
        full_name: credentials.options?.data?.name || null,
        brand_name: credentials.options?.data?.brand_name || null,
        avatar_url: credentials.options?.data?.avatar_url || null,
        accepted_terms: true,
        accepted_at: new Date(),
      });
    }

    return data;
  };

  // 🔹 Forgot password
  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return true;
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    signUp,
    signIn: (credentials) => supabase.auth.signInWithPassword(credentials),
    signOut: async () => {
      await supabase.auth.signOut();
      setUser(null);
    },
    updateProfile,
    signInWithGoogle,
    resetPassword, // ✅ use this instead of sendPasswordEmail
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
