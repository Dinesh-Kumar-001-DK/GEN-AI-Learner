import { createContext, useContext, useState, useEffect } from 'react';
import { authApi, userApi } from '../api/axios';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('aileraner_token');
      const savedUser = localStorage.getItem('aileraner_user');
      
      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          const { data } = await userApi.getMe();
          setUser(data.user);
          localStorage.setItem('aileraner_user', JSON.stringify(data.user));
        } catch (err) {
          localStorage.removeItem('aileraner_token');
          localStorage.removeItem('aileraner_user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const { data } = await authApi.login({ email, password });
      localStorage.setItem('aileraner_token', data.token);
      localStorage.setItem('aileraner_user', JSON.stringify(data.user));
      setUser(data.user);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      throw new Error(message);
    }
  };

  const register = async (name, email, password, learningGoal) => {
    try {
      setError(null);
      const { data } = await authApi.register({ name, email, password, learningGoal });
      localStorage.setItem('aileraner_token', data.token);
      localStorage.setItem('aileraner_user', JSON.stringify(data.user));
      setUser(data.user);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      throw new Error(message);
    }
  };

  const logout = () => {
    localStorage.removeItem('aileraner_token');
    localStorage.removeItem('aileraner_user');
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('aileraner_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
