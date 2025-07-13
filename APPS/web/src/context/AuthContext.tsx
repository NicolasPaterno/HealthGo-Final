import { createContext, useContext, useState, useEffect,type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import { toast } from "sonner";

// Definindo a interface para os dados do usuário
interface User {
  id: number;
  nome: string;
  email: string;
  // Adicione outros campos do usuário que você queira disponibilizar globalmente
}

// Definindo a interface para o valor do contexto
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean; // Para saber se a autenticação inicial está em andamento
}

// Criando o contexto com um valor padrão
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Criando o provedor do contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Começa como true para verificar a sessão
  const navigate = useNavigate();

  // Efeito para verificar o token no carregamento inicial da aplicação
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api.get<User>("/Auth/me")
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          // Se o token for inválido, limpa tudo
          localStorage.removeItem("authToken");
          setUser(null);
          toast.error("Sessão expirada", { description: "Por favor, faça o login novamente."});
          navigate("/login");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false); // Não há token, então terminamos o carregamento
    }
  }, [navigate]);

  // Função de login
  const login = async (token: string) => {
    setIsLoading(true);
    localStorage.setItem("authToken", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await api.get<User>("/Auth/me");
      setUser(response.data);
      toast.success("Login bem-sucedido!", {
        description: "Você será redirecionado para o dashboard.",
        duration: 2000,
      });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("Falha ao buscar dados do usuário após login:", error);
      logout(); // Limpa em caso de erro
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  const value = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook customizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};