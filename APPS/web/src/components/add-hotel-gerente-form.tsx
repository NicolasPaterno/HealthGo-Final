import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import api from "@/services/api";
import { LoadingSpinner } from "@/components/loading-spinner";
import { MapPin, Search, Edit3, Check, X, Building2, Phone, Mail, Globe, Accessibility } from "lucide-react";
import type { HotelInsertDTO } from "@/types/hotel";
import axios from "axios";

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export function AddHotelGerenteForm({ className, ...props }: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error("Sessão expirada", { description: "Por favor, faça login novamente." });
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Estados do formulário
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [cnpj, setCnpj] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [site, setSite] = useState("");
  const [acessibilidade, setAcessibilidade] = useState("");
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numeroEndereco, setNumeroEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Estados de controle
  const [loading, setLoading] = useState(false);
  const [isCepLoading, setIsCepLoading] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [enderecoPreenchido, setEnderecoPreenchido] = useState(false);
  const [editandoEndereco, setEditandoEndereco] = useState(false);
  const [coordenadasValidas, setCoordenadasValidas] = useState(false);

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

  const buscarCep = useCallback(async (cepValue: string) => {
    const cepLimpo = cepValue.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      toast.error("CEP inválido", {
        description: "O CEP deve ter 8 dígitos."
      });
      return;
    }

    setIsCepLoading(true);
    try {
      const { data } = await axios.get<ViaCepResponse>(`https://viacep.com.br/ws/${cepLimpo}/json/`);

      if (data.erro) {
        toast.error("CEP não encontrado", {
          description: "Verifique se o CEP está correto."
        });
        return;
      }

      // Preenche automaticamente os campos
      setRua(data.logradouro || "");
      setBairro(data.bairro || "");
      setCidade(data.localidade || "");
      setEstado(data.uf || "");
      setEnderecoPreenchido(true);
      setEditandoEndereco(false);

      toast.success("Endereço encontrado!", {
        description: `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`
      });

      // Geocodificar automaticamente o endereço
      if (data.logradouro && data.bairro && data.localidade && data.uf) {
        geocodificarEndereco(data.logradouro, data.bairro, data.localidade, data.uf);
      }

    } catch (error) {
      toast.error("Erro ao buscar CEP", {
        description: "Verifique sua conexão com a internet."
      });
      console.error("CEP fetch error:", error);
    } finally {
      setIsCepLoading(false);
    }
  }, []);

  // Função para geocodificar endereço usando OpenStreetMap Nominatim
  const geocodificarEndereco = async (rua: string, bairro: string, cidade: string, estado: string) => {
    if (!rua || !bairro || !cidade || !estado) return;

    setIsGeocoding(true);
    try {
      const address = `${rua}, ${bairro}, ${cidade}, ${estado}, Brasil`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=br`
      );

      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setLatitude(lat);
        setLongitude(lon);
        setCoordenadasValidas(true);

        toast.success("Coordenadas encontradas!", {
          description: `Latitude: ${lat}, Longitude: ${lon}`
        });
      } else {
        setCoordenadasValidas(false);
        toast.warning("Coordenadas não encontradas", {
          description: "Você pode inserir as coordenadas manualmente"
        });
      }
    } catch (error) {
      console.error('Erro ao geocodificar endereço:', error);
      setCoordenadasValidas(false);
      toast.error("Erro ao buscar coordenadas", {
        description: "Você pode inserir as coordenadas manualmente"
      });
    } finally {
      setIsGeocoding(false);
    }
  };

  // Função para geocodificar manualmente
  const geocodificarManual = () => {
    if (!rua || !bairro || !cidade || !estado) {
      toast.error("Preencha o endereço completo primeiro");
      return;
    }
    geocodificarEndereco(rua, bairro, cidade, estado);
  };

  const handleCepBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const currentCep = event.target.value.replace(/\D/g, "");
    if (currentCep.length === 8) {
      buscarCep(currentCep);
    }
  };

  const handleCepKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const currentCep = event.currentTarget.value.replace(/\D/g, "");
      if (currentCep.length === 8) {
        buscarCep(currentCep);
      }
    }
  };

  const editarEndereco = () => {
    setEditandoEndereco(true);
    setEnderecoPreenchido(false);
  };

  const confirmarEdicao = () => {
    setEditandoEndereco(false);
    setEnderecoPreenchido(true);
    toast.success("Endereço atualizado!");
  };

  const cancelarEdicao = () => {
    setEditandoEndereco(false);
    setEnderecoPreenchido(false);
    // Limpa os campos se não foram preenchidos manualmente
    if (!rua && !bairro && !cidade && !estado) {
      setRua("");
      setBairro("");
      setCidade("");
      setEstado("");
    }
  };

  const formatarCNPJ = (value: string) => {
    const cnpjLimpo = value.replace(/\D/g, "");
    return cnpjLimpo.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  };

  const formatarTelefone = (value: string) => {
    const telefoneLimpo = value.replace(/\D/g, "");
    if (telefoneLimpo.length === 11) {
      return telefoneLimpo.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (telefoneLimpo.length === 10) {
      return telefoneLimpo.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    }
    return telefoneLimpo;
  };

  const formatarCEP = (value: string) => {
    const cepLimpo = value.replace(/\D/g, "");
    return cepLimpo.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  };

  const validarFormulario = () => {
    const erros: string[] = [];

    // Validações obrigatórias
    if (!cnpj.replace(/\D/g, "")) erros.push("CNPJ é obrigatório");
    if (!nome.trim()) erros.push("Nome do hotel é obrigatório");
    if (nome.trim() && nome.length > 255) erros.push("Nome deve ter no máximo 255 caracteres");
    if (!tipo.trim()) erros.push("Tipo de estabelecimento é obrigatório");
    if (!email.trim()) erros.push("Email é obrigatório");
    if (!telefone.replace(/\D/g, "")) erros.push("Telefone é obrigatório");
    if (!cep.replace(/\D/g, "")) erros.push("CEP é obrigatório");
    if (!rua.trim()) erros.push("Rua é obrigatória");
    if (rua.trim() && rua.length > 255) erros.push("Rua deve ter no máximo 255 caracteres");
    if (!numeroEndereco.trim()) erros.push("Número do endereço é obrigatório");
    if (numeroEndereco.trim() && numeroEndereco.length > 255) erros.push("Número do endereço deve ter no máximo 255 caracteres");
    if (!bairro.trim()) erros.push("Bairro é obrigatório");
    if (bairro.trim() && bairro.length > 255) erros.push("Bairro deve ter no máximo 255 caracteres");
    if (!cidade.trim()) erros.push("Cidade é obrigatória");
    if (cidade.trim() && cidade.length > 255) erros.push("Cidade deve ter no máximo 255 caracteres");
    if (!estado.trim()) erros.push("Estado é obrigatório");
    if (estado.trim() && estado.length > 4) erros.push("Estado deve ter no máximo 4 caracteres");

    // Validações de formato
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) erros.push("CEP deve ter 8 dígitos");
    if (cepLimpo.length > 0 && cepLimpo.length < 8) erros.push("CEP deve ter 8 dígitos");
    if (cepLimpo.length > 20) erros.push("CEP deve ter no máximo 20 caracteres");

    const cnpjLimpo = cnpj.replace(/\D/g, "");
    if (cnpjLimpo.length !== 14) erros.push("CNPJ deve ter 14 dígitos");
    if (cnpjLimpo.length > 0 && cnpjLimpo.length < 14) erros.push("CNPJ deve ter 14 dígitos");

    const telefoneLimpo = telefone.replace(/\D/g, "");
    if (telefoneLimpo.length < 10) erros.push("Telefone deve ter pelo menos 10 dígitos");
    if (telefoneLimpo.length > 0 && telefoneLimpo.length < 10) erros.push("Telefone deve ter pelo menos 10 dígitos");
    if (telefoneLimpo.length > 45) erros.push("Telefone deve ter no máximo 45 caracteres");

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() && !emailRegex.test(email)) erros.push("Email inválido");
    if (email.trim() && email.length > 150) erros.push("Email deve ter no máximo 150 caracteres");

    // Validações de coordenadas
    if (latitude && (isNaN(parseFloat(latitude)) || parseFloat(latitude) < -90 || parseFloat(latitude) > 90)) {
      erros.push("Latitude deve ser um número entre -90 e 90");
    }
    if (longitude && (isNaN(parseFloat(longitude)) || parseFloat(longitude) < -180 || parseFloat(longitude) > 180)) {
      erros.push("Longitude deve ser um número entre -180 e 180");
    }

    // Validações de campos opcionais
    if (site && site.length > 255) erros.push("Site deve ter no máximo 255 caracteres");
    if (acessibilidade && acessibilidade.length > 255) erros.push("Acessibilidade deve ter no máximo 255 caracteres");
    if (descricao && descricao.length > 255) erros.push("Descrição deve ter no máximo 255 caracteres");

    return erros;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!isAuthenticated) {
      toast.error("Erro: Usuário não autenticado.");
      setLoading(false);
      return;
    }

    // Validação do formulário
    const erros = validarFormulario();
    if (erros.length > 0) {
      toast.error("Dados inválidos", {
        description: erros.join(", ")
      });
      setLoading(false);
      return;
    }

    const pessoaId = parseInt(user?.nameid || "0");

    const hotelData: HotelInsertDTO = {
      CNPJ: cnpj.replace(/\D/g, ""),
      Nome: nome.trim(),
      Tipo: tipo,
      Email: email.trim(),
      Telefone: telefone.replace(/\D/g, ""),
      Site: site.trim() || null,
      Acessibilidade: acessibilidade.trim() || null,
      CEP: cep.replace(/\D/g, ""),
      Bairro: bairro.trim(),
      Rua: rua.trim(),
      NumeroEndereco: numeroEndereco.trim(),
      Descricao: descricao.trim() || null,
      Ativo: true,
      DataInicio: new Date().toISOString(), // Formato ISO que o ASP.NET Core aceita automaticamente
      CidadeNome: cidade.trim(),
      EstadoSigla: estado.trim(),
      Latitude: latitude ? parseFloat(latitude) : null,
      Longitude: longitude ? parseFloat(longitude) : null,
      Pessoa_Id: pessoaId
    };

    try {
      const response = await api.post("/Hotel", hotelData);

      if (response.status === 201 || response.status === 200) {
        toast.success("Hotel cadastrado com sucesso!");
        navigate("/dashboard-gerente");
      } else {
        toast.error("Erro ao cadastrar hotel. Tente novamente.");
      }
    } catch (error: any) {
      console.error("Erro ao cadastrar hotel:", error);

      // Tratar erros de validação do backend
      if (error.response?.data?.errors) {
        const errosBackend = error.response.data.errors;
        toast.error("Dados inválidos", {
          description: Array.isArray(errosBackend) ? errosBackend.join(", ") : errosBackend
        });
      } else {
        toast.error("Erro ao cadastrar hotel. Verifique os dados e tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Card className={cn("mx-auto max-w-4xl w-full", className)} {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
          <Building2 className="h-8 w-8 text-primary" />
          Cadastrar Hotel
        </CardTitle>
        <CardDescription className="text-lg">
          Preencha os dados do seu estabelecimento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Seção de Foto */}
          <div className="flex flex-col items-center space-y-4">
            <input
              id="fotoPerfil"
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              className="hidden"
            />
            <label
              htmlFor="fotoPerfil"
              className="cursor-pointer flex flex-col items-center group"
            >
              {fotoPreview ? (
                <div className="relative">
                  <img
                    src={fotoPreview}
                    alt="Prévia da foto do hotel"
                    className="rounded-xl w-40 h-40 object-cover border-4 border-primary shadow-lg transition-all group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all flex items-center justify-center">
                    <Edit3 className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ) : (
                <div className="rounded-xl w-40 h-40 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border-4 border-dashed border-primary/30 text-primary/50 text-6xl group-hover:border-primary group-hover:text-primary transition-all">
                  <Building2 />
                </div>
              )}
              <span className="text-sm text-primary font-medium mt-2">
                {fotoPreview ? "Alterar Foto" : "Adicionar Foto do Hotel"}
              </span>
            </label>
          </div>

          {/* Seção de Informações Básicas */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Informações Básicas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ *</Label>
                <Input
                  id="cnpj"
                  type="text"
                  placeholder="00.000.000/0000-00"
                  required
                  value={cnpj}
                  onChange={(e) => setCnpj(formatarCNPJ(e.target.value))}
                  maxLength={18}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Hotel *</Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Digite o nome do hotel"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Estabelecimento *</Label>
                <Select value={tipo} onValueChange={setTipo}>
                  <SelectTrigger className={!tipo ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hotel">Hotel</SelectItem>
                    <SelectItem value="Pousada">Pousada</SelectItem>
                    <SelectItem value="Resort">Resort</SelectItem>
                    <SelectItem value="Hostel">Hostel</SelectItem>
                    <SelectItem value="Apartamento">Apartamento</SelectItem>
                    <SelectItem value="Casa">Casa</SelectItem>
                  </SelectContent>
                </Select>
                {!tipo && (
                  <p className="text-sm text-red-500">Tipo de estabelecimento é obrigatório</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva seu estabelecimento..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Seção de Contato */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Informações de Contato
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="hotel@exemplo.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="telefone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    required
                    value={telefone}
                    onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                    className="pl-10"
                    maxLength={15}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="site">Site</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="site"
                    type="url"
                    placeholder="https://www.exemplo.com"
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="acessibilidade">Acessibilidade</Label>
                <div className="relative">
                  <Accessibility className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="acessibilidade"
                    type="text"
                    placeholder="Descreva as facilidades de acessibilidade"
                    value={acessibilidade}
                    onChange={(e) => setAcessibilidade(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Seção de Endereço */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Endereço
            </h3>

            {/* Status do endereço */}
            {enderecoPreenchido && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700">Endereço preenchido automaticamente via ViaCEP</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={editarEndereco}
                  className="ml-auto"
                >
                  <Edit3 className="h-3 w-3 mr-1" />
                  Editar
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP *</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cep"
                    type="text"
                    placeholder="00000-000"
                    required
                    value={cep}
                    onChange={(e) => setCep(formatarCEP(e.target.value))}
                    onBlur={handleCepBlur}
                    onKeyPress={handleCepKeyPress}
                    disabled={isCepLoading}
                    className="pl-10"
                    maxLength={9}
                  />
                  {isCepLoading && (
                    <div className="absolute right-3 top-3">
                      <LoadingSpinner size="sm" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Digite o CEP e pressione Enter ou clique fora para buscar o endereço
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numeroEndereco">Número *</Label>
                <Input
                  id="numeroEndereco"
                  type="text"
                  placeholder="123"
                  required
                  value={numeroEndereco}
                  onChange={(e) => setNumeroEndereco(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rua">Rua *</Label>
                <Input
                  id="rua"
                  type="text"
                  placeholder="Rua será preenchida automaticamente"
                  required
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  disabled={!editandoEndereco && enderecoPreenchido}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bairro">Bairro *</Label>
                <Input
                  id="bairro"
                  type="text"
                  placeholder="Bairro será preenchido automaticamente"
                  required
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  disabled={!editandoEndereco && enderecoPreenchido}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="complemento">Complemento</Label>
                <Input
                  id="complemento"
                  type="text"
                  placeholder="Apartamento, sala, etc."
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade *</Label>
                <Input
                  id="cidade"
                  type="text"
                  placeholder="Cidade será preenchida automaticamente"
                  required
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  disabled={!editandoEndereco && enderecoPreenchido}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estado">Estado *</Label>
                <Input
                  id="estado"
                  type="text"
                  placeholder="Estado será preenchido automaticamente"
                  required
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  disabled={!editandoEndereco && enderecoPreenchido}
                />
              </div>
            </div>

            {/* Botões de edição do endereço */}
            {editandoEndereco && (
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={confirmarEdicao}
                  className="flex items-center gap-2"
                >
                  <Check className="h-4 w-4" />
                  Confirmar Edição
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={cancelarEdicao}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </Button>
              </div>
            )}
          </div>

          {/* Seção de Coordenadas Geográficas */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Coordenadas Geográficas
              <Badge variant={coordenadasValidas ? "default" : "secondary"} className="ml-2">
                {coordenadasValidas ? "✅ Válidas" : "⚠️ Pendentes"}
              </Badge>
            </h3>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                <strong>💡 Dica:</strong> As coordenadas são essenciais para que seu hotel apareça no mapa.
                Elas são preenchidas automaticamente quando você busca o CEP, mas você também pode inserir manualmente.
              </p>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={geocodificarManual}
                  disabled={isGeocoding || !rua || !bairro || !cidade || !estado}
                  className="text-blue-600 border-blue-300"
                >
                  {isGeocoding ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                      Buscando...
                    </div>
                  ) : (
                    <>
                      <MapPin className="h-3 w-3 mr-1" />
                      Buscar Coordenadas
                    </>
                  )}
                </Button>

                {coordenadasValidas && (
                  <Badge variant="default" className="bg-green-100 text-green-800 border-green-300">
                    <MapPin className="h-3 w-3 mr-1" />
                    Pronto para o mapa!
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="latitude">
                  Latitude
                  <span className="text-xs text-muted-foreground ml-1">(-90 a 90)</span>
                </Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  placeholder="Ex: -23.5505"
                  value={latitude}
                  onChange={(e) => {
                    setLatitude(e.target.value);
                    setCoordenadasValidas(false);
                  }}
                  className={latitude && (isNaN(parseFloat(latitude)) || parseFloat(latitude) < -90 || parseFloat(latitude) > 90) ? "border-red-500" : ""}
                />
                {latitude && (isNaN(parseFloat(latitude)) || parseFloat(latitude) < -90 || parseFloat(latitude) > 90) && (
                  <p className="text-sm text-red-500">Latitude deve ser um número entre -90 e 90</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">
                  Longitude
                  <span className="text-xs text-muted-foreground ml-1">(-180 a 180)</span>
                </Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  placeholder="Ex: -46.6333"
                  value={longitude}
                  onChange={(e) => {
                    setLongitude(e.target.value);
                    setCoordenadasValidas(false);
                  }}
                  className={longitude && (isNaN(parseFloat(longitude)) || parseFloat(longitude) < -180 || parseFloat(longitude) > 180) ? "border-red-500" : ""}
                />
                {longitude && (isNaN(parseFloat(longitude)) || parseFloat(longitude) < -180 || parseFloat(longitude) > 180) && (
                  <p className="text-sm text-red-500">Longitude deve ser um número entre -180 e 180</p>
                )}
              </div>
            </div>

            {/* Status das coordenadas */}
            {latitude && longitude && coordenadasValidas && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700">
                  Coordenadas válidas: {parseFloat(latitude).toFixed(6)}, {parseFloat(longitude).toFixed(6)}
                </span>
                <Badge variant="outline" className="ml-auto text-green-600 border-green-300">
                  <MapPin className="h-3 w-3 mr-1" />
                  Aparecerá no mapa
                </Badge>
              </div>
            )}

            {(!latitude || !longitude) && (
              <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <MapPin className="h-4 w-4 text-orange-600" />
                <span className="text-sm text-orange-700">
                  Sem coordenadas: seu hotel não aparecerá no mapa
                </span>
              </div>
            )}
          </div>

          {/* Botão de Submit */}
          <div className="pt-6">
            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold"
              disabled={loading || !isAuthenticated}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  Cadastrando Hotel...
                </div>
              ) : (
                "Cadastrar Hotel"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
