import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('mendx_auth_token') || null);
  const [loading, setLoading] = useState(true);

  // Check initial authentication
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('mendx_auth_token');
      if (storedToken) {
        try {
          const res = await api.auth.getMe();
          if (res.success && res.user) {
            setUser(res.user);
          } else {
            logout();
          }
        } catch (err) {
          console.warn('[AuthContext] Session expired or invalid');
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const data = await api.auth.login({ email, password });
    if (data.token) {
      localStorage.setItem('mendx_auth_token', data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const loginWithOtp = async (email) => {
    return await api.auth.loginWithOtp(email);
  };

  const verifyOtp = async (challengeId, otp) => {
    const data = await api.auth.verifyOtp({ challengeId, otp });
    if (data.token) {
      localStorage.setItem('mendx_auth_token', data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const resendOtp = async (challengeId) => {
    return await api.auth.resendOtp({ challengeId });
  };

  const register = async (userData) => {
    const data = await api.auth.register(userData);
    if (data.token) {
      localStorage.setItem('mendx_auth_token', data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const logout = () => {
    api.auth.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        loginWithOtp,
        verifyOtp,
        resendOtp,
        register,
        logout,
        isAdmin: user?.role === 'admin',
        isWorker: user?.role === 'worker',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
