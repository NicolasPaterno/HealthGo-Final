import { useState, useCallback } from "react";
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
import axios from "axios"; 

export function RegisterManagerForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();

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
  const [isCepLoading, setIsCepLoading] = useState(false);
  const [cidadeId, setCidadeId] = useState<number | null>(null);

  const handleCepBlur = useCallback(async (event: React.FocusEvent<HTMLInputElement>) => {
    const currentCep = event.target.value.replace(/\D/g, "");

    if (currentCep.length !== 8) {
      return;
    }

    setIsCepLoading(true);
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${currentCep}/json/`);

      if (data.erro) {
        toast.error("CEP não encontrado.");
        return;
      }

      setRua(data.logradouro);
      setBairro(data.bairro);
      setCidade(data.localidade);
      if (data.ibge) {
        setCidadeId(parseInt(data.ibge, 10));
      }

    } catch (error) {
      toast.error("Não foi possível buscar o CEP.");
      console.error("CEP fetch error:", error);
    } finally {
      setIsCepLoading(false);
    }
  }, []);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!cidadeId) {
      toast.error("Cidade inválida", {
        description: "Por favor, insira um CEP válido para buscar a cidade.",
      });
      return;
    }

    const userData = {
      Nome: nome,
      DataNascimento: dataNascimento,
      CPF: cpf,
      Telefone: telefone,
      Email: email,
      Senha: senha,
      EnderecoFoto: "default.jpg",
      CEP: cep,
      Bairro: bairro,
      Rua: rua,
      NumeroEndereco: numeroEndereco,
      Cidade_Id: 1,
      Role: 1
    };

    try {
      const response = await api.post("/Pessoa", userData);

      toast.success("Conta de Gerente criada com sucesso!", {
        description: "Você será redirecionado para a página de login em instantes.",
        duration: 3000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);

      console.log("Resposta da API:", response.data);

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Por favor, verifique seus dados e tente novamente.";
      toast.error("Erro ao criar a conta.", {
        description: errorMessage,
      });
      console.error("Erro ao registrar:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
    <Card className={cn("mx-auto max-w-lg border-2", className)} {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Criar Conta de Gerente</CardTitle>
        <CardDescription>
          Insira seus dados abaixo para criar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {/* Campos do Formulário com 'value' e 'onChange' atualizados */}
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" type="text" placeholder="Seu nome completo" required value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="nome@exemplo.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" type="text" placeholder="000.000.000-00" required value={cpf} onChange={(e) => setCpf(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="birthdate">Data de Nascimento</Label>
                <Input id="birthdate" type="date" required value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
              </div>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" type="tel" placeholder="(00) 00000-0000" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
              </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" type="text" placeholder="00000-000" value={cep} onChange={(e) => setCep(e.target.value)} onBlur={handleCepBlur} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" type="text" placeholder="Sua cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} disabled={isCepLoading} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="street">Rua</Label>
              <Input id="street" type="text" placeholder="Nome da sua rua" value={rua} onChange={(e) => setRua(e.target.value)} disabled={isCepLoading} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input id="neighborhood" type="text" placeholder="Seu bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} disabled={isCepLoading} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="addressNumber">Número</Label>
                <Input id="addressNumber" type="text" placeholder="Número" value={numeroEndereco} onChange={(e) => setNumeroEndereco(e.target.value)} />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isCepLoading}>
              {isCepLoading ? "Buscando CEP..." : "Criar conta"}
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
    <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Ao clicar em continuar, você concorda com nossos{" "}
        <a href="#">Termos de Serviço</a> e{" "}
        <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  );
}
