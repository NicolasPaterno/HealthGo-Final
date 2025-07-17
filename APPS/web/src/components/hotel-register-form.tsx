import { useState } from "react";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import api from "@/services/api";

// ⚠️ IMPORTANTE: Substitua estes valores pelas suas credenciais do Cloudinary
const CLOUDINARY_CLOUD_NAME = "dkgrpzzkb"; // Ex: 'minhalojanuvens'
const CLOUDINARY_UPLOAD_PRESET = "Hotel-dono"; // Ex: 'preset_de_upload_hoteis'

export function HotelRegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [cnpj, setCnpj] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [site, setSite] = useState("");
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numeroEndereco, setNumeroEndereco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [fotoPerfilUrl, setFotoPerfilUrl] = useState<string | null>(null); // Novo estado para armazenar a URL da imagem no Cloudinary

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao fazer upload da imagem para o Cloudinary.");
      }

      const data = await response.json();
      return data.secure_url; // Retorna a URL da imagem hospedada no Cloudinary
    } catch (error) {
      console.error("Erro no upload para o Cloudinary:", error);
      toast.error("Erro ao carregar a imagem.", {
        description: "Não foi possível enviar a foto de perfil.",
      });
      return null;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    let uploadedImageUrl: string | null = null;
    if (fotoPerfil) {
      uploadedImageUrl = await uploadImageToCloudinary(fotoPerfil);
      if (!uploadedImageUrl) {
        setLoading(false);
        return; // Parar a execução se o upload da imagem falhar
      }
      setFotoPerfilUrl(uploadedImageUrl); // Armazena a URL no estado
    }

    const hotelData = {
      CNPJ: cnpj,
      Nome: nome,
      Tipo: tipo,
      Email: email,
      Telefone: telefone,
      Site: site,
      Acessibilidade: "",
      CEP: cep,
      Bairro: bairro,
      Rua: rua,
      NumeroEndereco: numeroEndereco,
      Descricao: descricao,
      // Adiciona a URL da imagem ao objeto que será enviado para sua API
      //FotoPerfilUrl: uploadedImageUrl, // ou uma string vazia se não houver foto
      Ativo: true,
      DataInicio: new Date().toISOString(),
      DataFim: new Date().toISOString(),
      Cidade_Id: 1, // Ajuste conforme a lógica real de cidade
      ContaGerencia_Id: 1, // Ajuste conforme a lógica real de conta de gerência
    };

    console.log(hotelData);
    try {
      const response = await api.post("/Hotel", hotelData);

      toast.success("Hotel cadastrado com sucesso!", {
        description: "O hotel foi cadastrado com sucesso.",
        duration: 3000,
      });

      console.log("Resposta da API:", response.data);

      // Limpar estados após o sucesso, incluindo os da foto
      setCnpj("");
      setNome("");
      setTipo("");
      setEmail("");
      setTelefone("");
      setSite("");
      setCep("");
      setBairro("");
      setRua("");
      setNumeroEndereco("");
      setDescricao("");
      setFotoPerfil(null);
      setFotoPreview(null);
      setFotoPerfilUrl(null);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Verifique os dados e tente novamente.";
      toast.error("Erro ao cadastrar hotel.", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFotoPerfil(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setFotoPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setFotoPreview(null);
    }
  };

  return (
    <Card className={cn("mx-auto max-w-4xl w-full", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Cadastrar Hotel</CardTitle>
        <CardDescription>Preencha os dados do hotel abaixo</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="grid gap-8 grid-cols-1 md:grid-cols-2"
        >
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
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar Hotel"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
