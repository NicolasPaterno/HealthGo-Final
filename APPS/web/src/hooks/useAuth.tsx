import { useState, useEffect } from 'react';
import { getAuthUser, type DecodedToken } from '@/lib/jwt';

export const useAuth = () => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
          const decodedUser = getAuthUser();
          if (decodedUser) {
            setToken(storedToken);
            setUser(decodedUser);
          } else {
            // Token inválido ou expirado
            setToken(null);
            setUser(null);
            localStorage.removeItem('authToken');
          }
        } else {
          setToken(null);
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const isAuthenticated = !!token && !!user;

  return { user, token, isAuthenticated, isLoading };
};