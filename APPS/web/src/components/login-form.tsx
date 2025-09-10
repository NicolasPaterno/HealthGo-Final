import React from "react";
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
import { Eye, EyeOff } from "lucide-react";
import { getAuthUser } from "@/lib/jwt";
import type { DecodedToken } from "@/lib/jwt";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      });

      localStorage.setItem("authToken", response.data.token);
      // Decodificar o token para obter a role
      const user = getAuthUser() as DecodedToken | null;
      if (user && user.role === "Gerente") {
        navigate("/dashboard-gerente");
      } else if (user?.role === "PrestadorServico") {
        navigate("/dashboard-prestador"); // você cria essa rota
      } else {
        navigate("/dashboard");
      }

      toast.success("Login bem-sucedido!", {
        description: "Você será redirecionado para o dashboard.",
        duration: 2000,
      });

      setTimeout(() => {
       if (user?.role === "Consumidor") {
        navigate("/dashboard");
        } else if (user?.role === "PrestadorServico") {
          navigate("/dashboard-prestador");
        } else {
          navigate("/dashboard-gerente");
        }   
      }, 200);

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
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    to="/esqueci-senha"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Login"}
              </Button>
            </div>
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
  );
}