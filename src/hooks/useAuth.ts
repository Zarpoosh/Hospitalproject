import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserRole } from '../types';
import { MOCK_USERS } from '../constants/auth';

interface LoginCredentials {
  username: string;
  password: string;
}

interface UserData {
  role: UserRole;
  username: string;
  name: string;
  token: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const login = useCallback(async (
    credentials: LoginCredentials, 
    role: UserRole
  ): Promise<boolean> => {
    setError('');
    setLoading(true);

    try {
      const user = MOCK_USERS[role];
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (credentials.username === user.username && 
          credentials.password === user.password) {
        
        const userData: UserData = {
          role,
          username: credentials.username,
          name: user.name,
          token: 'mock-jwt-token',
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      } else {
        setError('نام کاربری یا رمز عبور اشتباه است');
        return false;
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('خطا در ارتباط با سرور');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const redirectByRole = useCallback((role: UserRole) => {
    const routes: Record<UserRole, string> = {
      patient: '/patient/dashboard',
      doctor: '/doctor/dashboard',
      pharmacist: '/pharmacist/dashboard',
      admin: '/admin/dashboard',
    };
    
    navigate(routes[role] || '/dashboard');
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    navigate('/login');
  }, [navigate]);

  return {
    error,
    loading,
    login,
    redirectByRole,
    logout,
    setError,
  };
};
