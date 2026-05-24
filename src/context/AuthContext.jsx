'use client';
import { createContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { setToken, clearToken, isAuthenticated } from '@/lib/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (isAuthenticated()) {
        try {
          const res = await api.getMe();
          if (res.success) {
            setUser(res.data);
          } else {
            clearToken();
          }
        } catch (error) {
          clearToken();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.login({ email, password });
      if (res.success) {
        setToken(res.data.accessToken);
        setUser(res.data.user);
        return { success: true };
      }
      return { success: false, error: res.message || 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (data) => {
    try {
      const res = await api.register(data);
      if (res.success) {
        setToken(res.data.accessToken);
        setUser(res.data.user);
        return { success: true };
      }
      return { success: false, error: res.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (e) {
      // ignore
    } finally {
      clearToken();
      setUser(null);
      if (typeof window !== 'undefined') window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      role: user?.role || null,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
