import React, { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import api from "@/services/api";

export function RegisterPrestadorForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  // Dados de pessoa
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [numeroEndereco, setNumeroEndereco] = useState("");
  const [caoGuia, setCaoGuia] = useState(false);

  // Dados de prestador
  const [cnpj, setCnpj] = useState("");
  const [precoHora, setPrecoHora] = useState("");
  // Removidos: observacao, especialidadeId

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const pessoa = {
      Nome: nome,
      DataNascimento: dataNascimento,
      CPF: cpf,
      Telefone: telefone,
      Email: email,
      Senha: senha,
      EnderecoFoto: "default.jpg",
      CaoGuia: caoGuia,
      CEP: cep,
      Bairro: bairro,
      Rua: rua,
      NumeroEndereco: numeroEndereco,
      Cidade_Id: 1, // Ajustar se necessário
    };

    const prestador = {
      PrecoHora: parseFloat(precoHora),
      // Removido: Observacao: observacao,
      CNPJ: cnpj || null,
      Ativo: true,
      // Removido: Especialidade_Id: parseInt(especialidadeId),
      Pessoa_Id: 0 // será preenchido no backend
    };

    try {
      const response = await api.post("/Auth/register-prestador", {
        pessoa,
        prestador
      });

      toast.success("Conta de prestador criada com sucesso!", {
        description: "Você será redirecionado para a página de login em instantes.",
        duration: 3000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);

      console.log("Resposta da API:", response.data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Por favor, verifique seus dados e tente novamente.";
      toast.error("Erro ao criar a conta de prestador.", {
        description: errorMessage,
      });
      console.error("Erro ao registrar prestador:", error);
    }
  };

  return (
    <Card className={cn("mx-auto max-w-lg", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Cadastro de Prestador de Serviço</CardTitle>
        <CardDescription>
          Insira seus dados abaixo para criar sua conta de prestador
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {/* Campos de Pessoa */}
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" type="text" placeholder="Seu nome completo" required value={nome} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="nome@exemplo.com" required value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required value={senha} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" type="text" placeholder="000.000.000-00" required value={cpf} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCpf(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="birthdate">Data de Nascimento</Label>
                <Input id="birthdate" type="date" required value={dataNascimento} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDataNascimento(e.target.value)} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" type="tel" placeholder="(00) 00000-0000" value={telefone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelefone(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" type="text" placeholder="00000-000" value={cep} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCep(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" type="text" placeholder="Sua cidade" value={cidade} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCidade(e.target.value)} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="street">Rua</Label>
              <Input id="street" type="text" placeholder="Nome da sua rua" value={rua} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRua(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input id="neighborhood" type="text" placeholder="Seu bairro" value={bairro} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBairro(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="addressNumber">Número</Label>
                <Input id="addressNumber" type="text" placeholder="Número" value={numeroEndereco} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumeroEndereco(e.target.value)} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="guideDog" checked={caoGuia} onCheckedChange={(checked) => setCaoGuia(Boolean(checked))} />
              <Label htmlFor="guideDog" className="font-normal">Possui cão guia</Label>
            </div>
            {/* Campos de Prestador */}
            <div className="grid gap-2">
              <Label htmlFor="cnpj">CNPJ (opcional)</Label>
              <Input id="cnpj" type="text" placeholder="CNPJ" value={cnpj} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCnpj(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="precoHora">Preço por hora</Label>
              <Input id="precoHora" type="number" min="0" step="0.01" placeholder="Preço" required value={precoHora} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrecoHora(e.target.value)} />
            </div>
            {/* Removidos os campos de descrição/observação e especialidade */}
            <Button type="submit" className="w-full">
              Criar conta de prestador
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
  );
} 