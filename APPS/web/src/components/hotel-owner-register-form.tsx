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

export default function HotelOwnerRegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmacaoSenha: "",
    cnpj: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.senha !== form.confirmacaoSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/HotelOwner/Register", {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        cnpj: form.cnpj,
      });
      toast.success("Conta criada com sucesso!", {
        description:
          "Você será redirecionado para a página de login em instantes.",
        duration: 3000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      toast.error("Erro ao criar a conta.", {
        description:
          err?.response?.data?.message || "Erro ao cadastrar. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background flex-col">
      <div className="w-full max-w-lg mx-auto flex flex-col items-start mb-4">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          ← Voltar
        </Button>
      </div>
      <Card className={cn("mx-auto max-w-lg", className)} {...props}>
        <CardHeader>
          <CardTitle className="text-2xl">Cadastro de Dono de Hotel</CardTitle>
          <CardDescription>
            Insira seus dados abaixo para criar sua conta de dono de hotel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nome@exemplo.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    name="cnpj"
                    type="text"
                    placeholder="00.000.000/0000-00"
                    required
                    value={form.cnpj}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Seu nome completo"
                  required
                  value={form.nome}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="senha">Senha</Label>
                  <Input
                    id="senha"
                    name="senha"
                    type="password"
                    required
                    value={form.senha}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmacaoSenha">Confirmação de Senha</Label>
                  <Input
                    id="confirmacaoSenha"
                    name="confirmacaoSenha"
                    type="password"
                    required
                    value={form.confirmacaoSenha}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Já possui uma conta?{" "}
            <Link to="/login" className="underline">
              Entrar
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
