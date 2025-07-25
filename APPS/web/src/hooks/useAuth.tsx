import { useState, useEffect } from 'react';
import { getAuthUser, type DecodedToken } from '@/lib/jwt';

export const useAuth = () => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Adicionado estado de loading

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      setUser(getAuthUser());
    } else {
      setToken(null);
      setUser(null);
    }
    setIsLoading(false); // Finaliza o loading após a verificação
  }, []);

  const isAuthenticated = !!token && !!user;

  return { user, token, isAuthenticated, isLoading }; // Retorna o estado de loading
};