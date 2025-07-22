<<<<<<< HEAD
import React from "react";
=======
// src/components/login-form.tsx
>>>>>>> f020c72ff248e5ceee0884d496d899983b039e0e
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/services/api";
<<<<<<< HEAD
import { getAuthUser } from "@/lib/jwt";
import type { DecodedToken } from "@/lib/jwt";
=======
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
>>>>>>> f020c72ff248e5ceee0884d496d899983b039e0e

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Definir o estado inicial para 'Pessoa', 'PrestadorServico' ou 'ContaGerencia'
  const [userType, setUserType] = useState("Pessoa");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error("Erro", {
        description: "Por favor, preencha o email e a senha.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/Auth/login", {
        email,
        password,
<<<<<<< HEAD
=======
        UserType: userType, // Envia o tipo de usuário selecionado pelo rádio
>>>>>>> f020c72ff248e5ceee0884d496d899983b039e0e
      });

      localStorage.setItem("authToken", response.data.token);
      // Decodificar o token para obter a role
      const user = getAuthUser() as DecodedToken | null;
      if (user && user.role === "Gerente") {
        navigate("/dashboard-gerente");
      } else {
        navigate("/dashboard");
      }

      toast.success("Login bem-sucedido!", {
        description: "Você será redirecionado.",
        duration: 2000,
      });

      setTimeout(() => {
<<<<<<< HEAD
       if (user?.role === "Consumidor") {
        navigate("/dashboard");
       } else {
        navigate("/dashboard-gerente");
       }
      }, 200);

=======
        // Redirecionar com base no UserType retornado pelo backend
        const loggedInUserType = response.data.user.UserType;
        if (loggedInUserType === "PrestadorServico") {
          navigate("/prestador-dashboard"); // Exemplo de rota para Prestador de Serviço
        } else if (loggedInUserType === "ContaGerencia") {
          navigate("/hotel-dashboard"); // Exemplo de rota para Dono de Hotel
        } else {
          navigate("/dashboard"); // Rota padrão para Usuário comum
        }
      }, 2000);
>>>>>>> f020c72ff248e5ceee0884d496d899983b039e0e
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Não foi possível fazer login. Verifique suas credenciais.";
      toast.error("Falha no Login", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
<<<<<<< HEAD
    <Card className="w-full max-w-md mx-auto border-2">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
        <CardDescription>
          Faça login com seu email e senha
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
=======
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bem-vindo de volta</CardTitle>
          <CardDescription>Faça login com seu email e senha</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
>>>>>>> f020c72ff248e5ceee0884d496d899983b039e0e
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
<<<<<<< HEAD
                  placeholder="m@example.com"
=======
                  placeholder="m@exemplo.com"
>>>>>>> f020c72ff248e5ceee0884d496d899983b039e0e
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
<<<<<<< HEAD
                  <Link
                    to="/esqueci-senha"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
=======
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
>>>>>>> f020c72ff248e5ceee0884d496d899983b039e0e
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
<<<<<<< HEAD
              </div>
=======
              </div>

              {/* Seleção do tipo de login com RadioGroup */}
              <div className="grid gap-3">
                <Label>Tipo de Login</Label>
                <RadioGroup
                  defaultValue={userType} // Define o valor padrão
                  onValueChange={setUserType} // Atualiza o estado userType
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Pessoa" id="r1" />
                    <Label htmlFor="r1">Usuário Comum</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="PrestadorServico" id="r2" />
                    <Label htmlFor="r2">Prestador de Serviço</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ContaGerencia" id="r3" />
                    <Label htmlFor="r3">Dono de Hotel</Label>
                  </div>
                </RadioGroup>
              </div>

>>>>>>> f020c72ff248e5ceee0884d496d899983b039e0e
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Login"}
              </Button>
            </div>
<<<<<<< HEAD
            <div className="text-center text-sm">
              Não tem uma conta?{" "}
              <Link to="/register" className="underline underline-offset-4">
                Registre-se
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
=======
          </form>
          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{" "}
            <Link to="/register" className="underline">
              Registre-se
            </Link>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Ao clicar em continuar, você concorda com nossos{" "}
        <a href="#">Termos de Serviço</a> e{" "}
        <a href="#">Política de Privacidade</a>.
      </div>
    </div>
>>>>>>> f020c72ff248e5ceee0884d496d899983b039e0e
  );
}
