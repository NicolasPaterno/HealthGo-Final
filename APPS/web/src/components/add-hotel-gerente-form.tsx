import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Assuming you have sonner for toasts
import { cn } from "@/lib/utils"; // Assuming cn is a utility for class names
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Adjust paths if necessary
import { Label } from "@/components/ui/label"; // Adjust paths if necessary
import { Input } from "@/components/ui/input"; // Adjust paths if necessary
import { Button } from "@/components/ui/button"; // Adjust paths if necessary
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Adjust paths if necessary
import { useAuth } from "@/hooks/useAuth"; // Assuming useAuth hook exists
import  api  from "@/services/api"; // Assuming api service exists
import { getAuthUser } from "@/lib/jwt";

// Definindo a interface para HotelInsertDTO para tipagem segura
interface HotelInsertDTO {
  CNPJ: string;
  Nome: string;
  Tipo: string;
  Email: string;
  Telefone: string;
  Site: string;
  Acessibilidade: string; // Added missing field
  CEP: string;
  Bairro: string;
  Rua: string;
  NumeroEndereco: string;
  Descricao: string;
  Ativo: boolean; // Added missing field, assuming boolean
  DataInicio: string; // Added missing field, assuming string for date
  Cidade_Id: number; // Added missing field
  ContaGerencia_Id: number; // Added missing field
}

export function AddHotelGerenteForm({ className, ...props }: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();
  const  user  = useAuth(); // Get user from auth context
const decodedUser = getAuthUser();
if (!decodedUser) {
  toast.error("Sessão expirada", { description: "Por favor, faça login novamente." });
  // Redirect to login if no valid token
  window.location.href = '/login';
  return;
}


  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [cnpj, setCnpj] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [site, setSite] = useState("");
  const [acessibilidade, setAcessibilidade] = useState(""); // State for acessibilidade
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numeroEndereco, setNumeroEndereco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cidadeId, setCidadeId] = useState<number | string>(""); // State for Cidade_Id
  const [loading, setLoading] = useState(false);


  const handleFotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFotoPreview(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!user || !user.token) {
      toast.error("Erro: Usuário não autenticado ou ID do usuário não disponível.");
      setLoading(false);
      return;
    }

    // Prepare the data to be sent to the backend
    const hotelData: HotelInsertDTO = {
      CNPJ: cnpj,
      Nome: nome,
      Tipo: tipo,
      Email: email,
      Telefone: telefone,
      Site: site,
      Acessibilidade: acessibilidade,
      CEP: cep,
      Bairro: bairro,
      Rua: rua,
      NumeroEndereco: numeroEndereco,
      Descricao: descricao,
      Ativo: true, // Assuming true by default for new hotels
      DataInicio: new Date().toISOString(), // Current date
      Cidade_Id: Number(cidadeId), // Convert to number
      ContaGerencia_Id: parseInt(decodedUser.nameid), // Assuming user.id is the ContaGerencia_Id
    };

    console.log(hotelData);
    try {
      const response = await api.post("/Hotel", hotelData); // Use the correct endpoint
      if (response.status === 200) {
        toast.success("Hotel cadastrado com sucesso!");
        navigate("/dashboard"); // Redirect to dashboard or another appropriate page
      } else {
        toast.error("Erro ao cadastrar hotel. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar hotel:", error);
      toast.error("Erro ao cadastrar hotel. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={cn("mx-auto max-w-4xl w-full", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Cadastrar Hotel</CardTitle>
        <CardDescription>Preencha os dados do hotel abaixo</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-8 grid-cols-1 md:grid-cols-2">
          <div className="w-full flex flex-col items-center md:col-span-2 mb-4">
            <input
              id="fotoPerfil"
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              className="hidden"
            />
            <label
              htmlFor="fotoPerfil"
              className="cursor-pointer flex flex-col items-center"
            >
              {fotoPreview ? (
                <img
                  src={fotoPreview}
                  alt="Prévia da foto de perfil"
                  className="rounded-full w-32 h-32 object-cover border-2 border-primary shadow mb-2 transition-all hover:opacity-80"
                />
              ) : (
                <div className="rounded-full w-32 h-32 bg-muted flex items-center justify-center border-2 border-dashed border-primary text-muted-foreground text-4xl mb-2">
                  +
                </div>
              )}
              <span className="text-sm text-primary font-medium">
                Adicionar Foto de Perfil
              </span>
            </label>
          </div>
          <div className="grid gap-2 w-full">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input
              id="cnpj"
              type="text"
              placeholder="00.000.000/0000-00"
              required
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
          </div>
          <div className="grid gap-2 w-full">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              type="text"
              placeholder="Nome do hotel"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="grid gap-2 w-full">
            <Label htmlFor="tipo">Tipo</Label>
            <Select value={tipo} onValueChange={setTipo}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Apartamento">Apartamento</SelectItem>
                <SelectItem value="Pousada">Pousada</SelectItem>
                <SelectItem value="Hotel">Hotel</SelectItem>
                <SelectItem value="Casa">Casa</SelectItem>
                <SelectItem value="Hostel">Hostel</SelectItem> {/* Added Hostel */}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2 w-full">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="hotel@exemplo.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2 w-full">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
          <div className="grid gap-2 w-full">
            <Label htmlFor="site">Site</Label>
            <Input
              id="site"
              type="url"
              placeholder="https://"
              value={site}
              onChange={(e) => setSite(e.target.value)}
            />
          </div>
          {/* New field: Acessibilidade */}
          <div className="grid gap-2 w-full">
            <Label htmlFor="acessibilidade">Acessibilidade</Label>
            <Input
              id="acessibilidade"
              type="text"
              placeholder="Descreva a acessibilidade"
              value={acessibilidade}
              onChange={(e) => setAcessibilidade(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="grid gap-2 w-full">
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                type="text"
                placeholder="00000-000"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
            </div>
            <div className="grid gap-2 w-full">
              <Label htmlFor="bairro">Bairro</Label>
              <Input
                id="bairro"
                type="text"
                placeholder="Bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
            	/>
          	</div>
        	</div>
        	<div className="grid grid-cols-2 gap-4 w-full">
          	<div className="grid gap-2 w-full">
            	<Label htmlFor="rua">Rua</Label>
            	<Input
              	id="rua"
              	type="text"
              	placeholder="Rua"
              	value={rua}
              	onChange={(e) => setRua(e.target.value)}
            	/>
          	</div>
          	<div className="grid gap-2 w-full">
            	<Label htmlFor="numeroEndereco">Número</Label>
            	<Input
              	id="numeroEndereco"
              	type="text"
              	placeholder="Número"
              	value={numeroEndereco}
              	onChange={(e) => setNumeroEndereco(e.target.value)}
            	/>
          	</div>
        	</div>
        	{/* Placeholder for Cidade_Id. Ideally, this would be a Select fetching cities from an API */}
        	<div className="grid gap-2 w-full">
          	<Label htmlFor="cidadeId">ID da Cidade</Label>
          	<Input
            	id="cidadeId"
            	type="number"
            	placeholder="Ex: 1"
            	required
            	value={cidadeId}
            	onChange={(e) => setCidadeId(e.target.value)}
          	/>
        	</div>
        	<div className="grid gap-2 w-full md:col-span-2">
          	<Label htmlFor="descricao">Descrição</Label>
          	<Input
            	id="descricao"
            	type="text"
            	placeholder="Descrição do hotel"
            	value={descricao}
            	onChange={(e) => setDescricao(e.target.value)}
          	/>
        	</div>
        	<Button
          	type="submit"
          	className="w-full md:col-span-2"
          	disabled={loading || !user}
        	>
          	{loading ? "Cadastrando..." : "Cadastrar Hotel"}
        	</Button>
      	</form>
    	</CardContent>
  	</Card>
	);
}