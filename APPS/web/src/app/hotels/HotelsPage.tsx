import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import api from "@/services/api";
import { LoadingSpinner } from "@/components/loading-spinner";
import {
  ShoppingCart,
  Search,
  MapPin,
  Star,
  Filter,
  Building2,
  Phone,
  Mail,
  Globe,
  Accessibility,
  Users,
  Waves
} from "lucide-react";
import { toast } from "sonner";
import type { Hotel } from "@/types/hotel";
import DefaultHotelImage from "@/assets/logo.png"; // Importar a imagem padrão

interface Filtros {
  nome: string;
  tipo: string;
  cidade: string;
  precoMin: string;
  precoMax: string;
  acessibilidade: string;
}

export default function HotelsPage() {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [hotelsFiltrados, setHotelsFiltrados] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState<Filtros>({
    nome: "",
    tipo: "all",
    cidade: "",
    precoMin: "",
    precoMax: "",
    acessibilidade: "",
  });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Carregar hotéis da API
  useEffect(() => {
    carregarHoteis();
  }, []);

  // Aplicar filtros da URL quando a página carrega
  useEffect(() => {
    const cityParam = searchParams.get('city');
    const stateParam = searchParams.get('state');
    const searchParam = searchParams.get('search');

    if (cityParam || stateParam || searchParam) {
      setFiltros(prev => ({
        ...prev,
        cidade: cityParam || '',
        nome: searchParam || '',
      }));
      setMostrarFiltros(true);
    }
  }, [searchParams]);

  const carregarHoteis = async () => {
    try {
      setLoading(true);
      const response = await api.get("/Hotel");
      console.log("Resposta da API /Hotel:", response.data); // Adicionar este log
      if (response.data && Array.isArray(response.data)) { // Ajustar a condição
        setHotels(response.data);
        setHotelsFiltrados(response.data);
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setHotels(response.data.data);
        setHotelsFiltrados(response.data.data);
      } else {
        console.error("Formato de dados inesperado da API /Hotel:", response.data);
        toast.error("Formato de dados de hotéis inesperado");
      }
    } catch (error) {
      console.error("Erro ao carregar hotéis:", error);
      toast.error("Erro ao carregar hotéis");
    } finally {
      setLoading(false);
    }
  };

  // Aplicar filtros
  useEffect(() => {
    let filtrados = hotels;

    if (filtros.nome) {
      filtrados = filtrados.filter(hotel =>
        hotel.nome.toLowerCase().includes(filtros.nome.toLowerCase())
      );
    }

    if (filtros.tipo && filtros.tipo !== "all") {
      filtrados = filtrados.filter(hotel => hotel.tipo === filtros.tipo);
    }

    if (filtros.cidade) {
      filtrados = filtrados.filter(hotel =>
        hotel.cidade?.nome.toLowerCase().includes(filtros.cidade.toLowerCase())
      );
    }

    if (filtros.acessibilidade) {
      filtrados = filtrados.filter(hotel =>
        hotel.acessibilidade?.toLowerCase().includes(filtros.acessibilidade.toLowerCase())
      );
    }

    setHotelsFiltrados(filtrados);
  }, [hotels, filtros]);

  const handleAddToCart = (hotel: Hotel) => {
    // Simular preço baseado no tipo do hotel
    const precos = {
      "Hotel": 350,
      "Pousada": 200,
      "Resort": 800,
      "Hostel": 80,
      "Apartamento": 250,
      "Casa": 300
    };

    const preco = precos[hotel.tipo as keyof typeof precos] || 200;

    addToCart({
      id: hotel.id.toString(),
      name: hotel.nome,
      price: preco,
      image: DefaultHotelImage,
    });

    toast.success(`${hotel.nome} adicionado ao carrinho!`);
  };

  const limparFiltros = () => {
    setFiltros({
      nome: "",
      tipo: "all",
      cidade: "",
      precoMin: "",
      precoMax: "",
      acessibilidade: "",
    });
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "Hotel": return <Building2 className="h-4 w-4" />;
      case "Pousada": return <MapPin className="h-4 w-4" />;
      case "Resort": return <Waves className="h-4 w-4" />;
      case "Hostel": return <Users className="h-4 w-4" />;
      case "Apartamento": return <Building2 className="h-4 w-4" />;
      case "Casa": return <Building2 className="h-4 w-4" />;
      default: return <Building2 className="h-4 w-4" />;
    }
  };

  const getPrecoEstimado = (tipo: string) => {
    const precos = {
      "Hotel": 350,
      "Pousada": 200,
      "Resort": 800,
      "Hostel": 80,
      "Apartamento": 250,
      "Casa": 300
    };
    return precos[tipo as keyof typeof precos] || 200;
  };

  if (loading) {
    return (
      <main className="flex-1 p-6">
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner />
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Catálogo de Hotéis</h1>
        <p className="text-muted-foreground text-lg">
          Encontre o lugar perfeito para sua próxima viagem
        </p>
        <div className="flex items-center gap-2 mt-4">
          <Badge variant="secondary" className="text-sm">
            {hotelsFiltrados.length} hotéis encontrados
          </Badge>
          {hotelsFiltrados.length !== hotels.length && (
            <Badge variant="outline" className="text-sm">
              Filtros ativos
            </Badge>
          )}
        </div>
      </header>

      {/* Filtros */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
          >
            {mostrarFiltros ? "Ocultar" : "Mostrar"} Filtros
          </Button>
        </div>

        {mostrarFiltros && (
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Hotel</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="nome"
                    placeholder="Buscar por nome..."
                    value={filtros.nome}
                    onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Estabelecimento</Label>
                <Select value={filtros.tipo} onValueChange={(value) => setFiltros({ ...filtros, tipo: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="Hotel">Hotel</SelectItem>
                    <SelectItem value="Pousada">Pousada</SelectItem>
                    <SelectItem value="Resort">Resort</SelectItem>
                    <SelectItem value="Hostel">Hostel</SelectItem>
                    <SelectItem value="Apartamento">Apartamento</SelectItem>
                    <SelectItem value="Casa">Casa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  placeholder="Buscar por cidade..."
                  value={filtros.cidade}
                  onChange={(e) => setFiltros({ ...filtros, cidade: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="acessibilidade">Acessibilidade</Label>
                <Input
                  id="acessibilidade"
                  placeholder="Buscar por acessibilidade..."
                  value={filtros.acessibilidade}
                  onChange={(e) => setFiltros({ ...filtros, acessibilidade: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="precoMin">Preço Mínimo</Label>
                <Input
                  id="precoMin"
                  type="number"
                  placeholder="R$ 0"
                  value={filtros.precoMin}
                  onChange={(e) => setFiltros({ ...filtros, precoMin: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="precoMax">Preço Máximo</Label>
                <Input
                  id="precoMax"
                  type="number"
                  placeholder="R$ 1000"
                  value={filtros.precoMax}
                  onChange={(e) => setFiltros({ ...filtros, precoMax: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={limparFiltros}>
                Limpar Filtros
              </Button>
              <Button onClick={() => setMostrarFiltros(false)}>
                Aplicar Filtros
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Lista de Hotéis */}
      {hotelsFiltrados.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Nenhum hotel encontrado</h3>
          <p className="text-muted-foreground mb-4">
            Tente ajustar os filtros ou buscar por outros critérios
          </p>
          <Button onClick={limparFiltros}>
            Limpar Filtros
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotelsFiltrados.map((hotel) => (
            <Card key={hotel.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="relative">
                  <img
                    src={DefaultHotelImage}
                    alt={`Imagem do ${hotel.nome}`}
                    className="rounded-t-lg w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {getTipoIcon(hotel.tipo)}
                      {hotel.tipo}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="default" className="bg-green-600">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      4.5
                    </Badge>
                  </div>
                </div>
                <CardTitle className="mt-4 text-xl">{hotel.nome}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {hotel.descricao || "Descrição não disponível"}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Localização */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {hotel.cidade?.nome}, {hotel.cidade?.estado?.sigla}
                  </span>
                </div>

                {/* Contato */}
                <div className="space-y-1">
                  {hotel.telefone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{hotel.telefone}</span>
                    </div>
                  )}
                  {hotel.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{hotel.email}</span>
                    </div>
                  )}
                  {hotel.site && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{hotel.site}</span>
                    </div>
                  )}
                </div>

                {/* Acessibilidade */}
                {hotel.acessibilidade && (
                  <div className="flex items-center gap-2 text-sm">
                    <Accessibility className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                      {hotel.acessibilidade}
                    </span>
                  </div>
                )}

                {/* Preço */}
                <div className="pt-2 border-t">
                  <p className="text-2xl font-bold text-primary">
                    R$ {getPrecoEstimado(hotel.tipo).toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">por noite</p>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => handleAddToCart(hotel)}
                  className="w-full group-hover:bg-primary/90 transition-colors"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Adicionar ao Carrinho
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}