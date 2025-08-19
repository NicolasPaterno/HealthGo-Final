import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, MapPin, Building, Filter, Eye } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/services/api';

interface Hotel {
  id: number;
  nome: string;
  tipo: string;
  email: string;
  telefone: string;
  site: string;
  acessibilidade: string;
  cep: string;
  bairro: string;
  rua: string;
  numeroEndereco: string;
  descricao: string;
  cidade_Id: number;
  pessoa_id: number;
  ativo: boolean;
  dataInicio: string;
  cidade: {
    id: number;
    nome: string;
    estado_Id: number;
    estado: {
      id: number;
      nome: string;
      sigla: string;
    };
  };
  quartos: Room[];
}

interface Room {
  id: number;
  numero: string;
  andar: number;
  aceitaAnimal: boolean;
  observacao: string;
  preco: number;
  limitePessoa: number;
  Hotel_Id: number;
}

interface Filters {
  search: string;
  city: string;
  state: string;
  hotelType: string;
  priceRange: number[];
  acceptsPets: boolean;
  accessibility: boolean;
}

export default function HotelsBrowsePage() {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);

  // Inicializar filtros com base nos parâmetros da URL
  const getInitialFilters = (): Filters => {
    const cityParam = searchParams.get('city');
    const searchParam = searchParams.get('search');
    const stateParam = searchParams.get('state');

    return {
      search: searchParam || '',
      city: cityParam || 'all',
      state: stateParam || 'all',
      hotelType: 'all',
      priceRange: [0, 1000],
      acceptsPets: false,
      accessibility: false
    };
  };

  const [filters, setFilters] = useState<Filters>(getInitialFilters);
  const [showLocationInfo, setShowLocationInfo] = useState(false);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await api.get('/Hotel');
      const hotelsData = response.data.data || [];

      // Buscar quartos para cada hotel
      const hotelsWithRooms = await Promise.all(
        hotelsData.map(async (hotel: Hotel) => {
          try {
            const roomsResponse = await api.get(`/Quarto/hotel/${hotel.id}`);
            return {
              ...hotel,
              quartos: roomsResponse.data.data || []
            };
          } catch (error) {
            return {
              ...hotel,
              quartos: []
            };
          }
        })
      );

      setHotels(hotelsWithRooms);
      setFilteredHotels(hotelsWithRooms);

      // Extrair cidades únicas
      const uniqueCities = [...new Set(hotelsData.map((hotel: Hotel) => hotel.cidade?.nome).filter(Boolean))] as string[];
      setCities(uniqueCities);

      // Extrair estados únicos
      const uniqueStates = [...new Set(hotelsData.map((hotel: Hotel) => hotel.cidade?.estado?.sigla).filter(Boolean))] as string[];
      setStates(uniqueStates);
    } catch (error) {
      console.error('Erro ao carregar hotéis:', error);
      toast.error('Erro ao carregar hotéis. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Aplicar filtros iniciais quando os parâmetros da URL mudarem
  useEffect(() => {
    const initialFilters = getInitialFilters();
    setFilters(initialFilters);

    // Mostrar informação se há filtros aplicados
    if (initialFilters.city !== 'all' || initialFilters.search || initialFilters.state !== 'all') {
      setShowLocationInfo(true);
      // Esconder a mensagem após 5 segundos
      setTimeout(() => setShowLocationInfo(false), 5000);
    }
  }, [searchParams]);

  // Aplicar filtros sempre que os filtros ou hotéis mudarem
  useEffect(() => {
    if (hotels.length > 0) {
      applyFilters();
    }
  }, [filters, hotels]);

  const applyFilters = () => {
    console.log('Aplicando filtros:', filters);
    console.log('Hotéis disponíveis:', hotels.length);

    let filtered = [...hotels];

    // Filtro de busca
    if (filters.search) {
      filtered = filtered.filter(hotel =>
        hotel.nome.toLowerCase().includes(filters.search.toLowerCase()) ||
        (hotel.descricao && hotel.descricao.toLowerCase().includes(filters.search.toLowerCase())) ||
        (hotel.cidade?.nome && hotel.cidade.nome.toLowerCase().includes(filters.search.toLowerCase())) ||
        (hotel.bairro && hotel.bairro.toLowerCase().includes(filters.search.toLowerCase()))
      );
      console.log('Após filtro de busca:', filtered.length);
    }

    // Filtro de cidade
    if (filters.city && filters.city !== 'all') {
      filtered = filtered.filter(hotel => hotel.cidade?.nome === filters.city);
      console.log('Após filtro de cidade:', filtered.length);
    }

    // Filtro de estado
    if (filters.state && filters.state !== 'all') {
      filtered = filtered.filter(hotel => hotel.cidade?.estado?.sigla === filters.state);
      console.log('Após filtro de estado:', filtered.length);
    }

    // Filtro de tipo de hotel
    if (filters.hotelType && filters.hotelType !== 'all') {
      filtered = filtered.filter(hotel => hotel.tipo === filters.hotelType);
      console.log('Após filtro de tipo:', filtered.length);
    }

    // Filtro de preço
    filtered = filtered.filter(hotel => {
      if (hotel.quartos.length === 0) return false;
      const minPrice = Math.min(...hotel.quartos.map(room => room.preco));
      return minPrice >= filters.priceRange[0] && minPrice <= filters.priceRange[1];
    });
    console.log('Após filtro de preço:', filtered.length);

    // Filtro de aceita pets
    if (filters.acceptsPets) {
      filtered = filtered.filter(hotel =>
        hotel.quartos.some(room => room.aceitaAnimal)
      );
      console.log('Após filtro de pets:', filtered.length);
    }

    // Filtro de acessibilidade
    if (filters.accessibility) {
      filtered = filtered.filter(hotel =>
        hotel.acessibilidade && hotel.acessibilidade.trim().length > 0
      );
      console.log('Após filtro de acessibilidade:', filtered.length);
    }

    console.log('Resultado final:', filtered.length, 'hotéis');
    setFilteredHotels(filtered);
  };

  const getMinPrice = (hotel: Hotel) => {
    if (hotel.quartos.length === 0) return 0;
    return Math.min(...hotel.quartos.map(room => room.preco));
  };

  const getMaxPrice = (hotel: Hotel) => {
    if (hotel.quartos.length === 0) return 0;
    return Math.max(...hotel.quartos.map(room => room.preco));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleViewHotel = (hotel: Hotel) => {
    // Navegar para página de detalhes do hotel
    window.location.href = `/hotel/${hotel.id}`;
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      city: 'all',
      state: 'all',
      hotelType: 'all',
      priceRange: [0, 1000],
      acceptsPets: false,
      accessibility: false
    });

    // Limpar parâmetros da URL
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('city');
    newSearchParams.delete('search');
    newSearchParams.delete('state');

    // Navegar para a URL limpa
    const newUrl = window.location.pathname + (newSearchParams.toString() ? `?${newSearchParams.toString()}` : '');
    window.history.replaceState({}, '', newUrl);

    setShowLocationInfo(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando hotéis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Encontre o Hotel Perfeito
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Descubra hotéis confortáveis e acessíveis para suas necessidades
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mensagem informativa quando filtros são aplicados automaticamente */}
        {showLocationInfo && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-blue-800 dark:text-blue-200 font-medium">
                    Filtros aplicados automaticamente
                  </p>
                  <p className="text-blue-600 dark:text-blue-300 text-sm">
                    {filters.state !== 'all' && `Estado: ${filters.state}`}
                    {filters.state !== 'all' && filters.city !== 'all' && ' • '}
                    {filters.city !== 'all' && `Cidade: ${filters.city}`}
                    {(filters.state !== 'all' || filters.city !== 'all') && filters.search && ' • '}
                    {filters.search && `Busca: ${filters.search}`}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  clearFilters();
                  setShowLocationInfo(false);
                }}
                className="text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-700"
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Busca */}
                <div className="space-y-2">
                  <Label htmlFor="search">Buscar</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Nome do hotel, cidade..."
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Cidade */}
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Select value={filters.city} onValueChange={(value) => setFilters({ ...filters, city: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as cidades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as cidades</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Estado */}
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Select value={filters.state} onValueChange={(value) => setFilters({ ...filters, state: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os estados" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os estados</SelectItem>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tipo de Hotel */}
                <div className="space-y-2">
                  <Label htmlFor="hotelType">Tipo de Hotel</Label>
                  <Select value={filters.hotelType} onValueChange={(value) => setFilters({ ...filters, hotelType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os tipos</SelectItem>
                      <SelectItem value="Hotel">Hotel</SelectItem>
                      <SelectItem value="Pousada">Pousada</SelectItem>
                      <SelectItem value="Hostel">Hostel</SelectItem>
                      <SelectItem value="Apartamento">Apartamento</SelectItem>
                      <SelectItem value="Casa">Casa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Faixa de Preço */}
                <div className="space-y-2">
                  <Label>Faixa de Preço</Label>
                  <div className="px-2">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters({ ...filters, priceRange: value as number[] })}
                      max={1000}
                      min={0}
                      step={10}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{formatPrice(filters.priceRange[0])}</span>
                    <span>{formatPrice(filters.priceRange[1])}</span>
                  </div>
                </div>

                {/* Aceita Pets */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="acceptsPets"
                    checked={filters.acceptsPets}
                    onCheckedChange={(checked) => setFilters({ ...filters, acceptsPets: checked as boolean })}
                  />
                  <Label htmlFor="acceptsPets">Aceita animais de estimação</Label>
                </div>

                {/* Acessibilidade */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="accessibility"
                    checked={filters.accessibility}
                    onCheckedChange={(checked) => setFilters({ ...filters, accessibility: checked as boolean })}
                  />
                  <Label htmlFor="accessibility">Acessibilidade</Label>
                </div>

                {/* Limpar Filtros */}
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                >
                  Limpar Filtros
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Hotéis */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 'is' : ''} encontrado{filteredHotels.length !== 1 ? 's' : ''}
              </h2>
            </div>

            {filteredHotels.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Nenhum hotel encontrado
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Tente ajustar os filtros para encontrar mais opções.
                  </p>
                  <Button onClick={clearFilters}>
                    Limpar Filtros
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredHotels.map((hotel) => (
                  <Card key={hotel.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Informações do Hotel */}
                        <div className="md:col-span-2 space-y-4">
                          <div>
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                                  {hotel.nome}
                                </h3>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{hotel.cidade?.nome}, {hotel.cidade?.estado?.sigla}</span>
                                </div>
                              </div>
                              <Badge variant="secondary">{hotel.tipo}</Badge>
                            </div>

                            {hotel.descricao && (
                              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                                {hotel.descricao}
                              </p>
                            )}
                          </div>

                          {/* Características */}
                          <div className="flex flex-wrap gap-2">
                            {hotel.quartos.some(room => room.aceitaAnimal) && (
                              <Badge variant="outline" className="text-xs">
                                Aceita pets
                              </Badge>
                            )}
                            {hotel.acessibilidade && hotel.acessibilidade.trim() !== '' && (
                              <Badge variant="outline" className="text-xs">
                                Acessível
                              </Badge>
                            )}
                            {hotel.telefone && (
                              <Badge variant="outline" className="text-xs">
                                Contato disponível
                              </Badge>
                            )}
                          </div>

                          {/* Endereço */}
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <p>{hotel.rua}, {hotel.numeroEndereco}</p>
                            <p>{hotel.bairro && `${hotel.bairro} - `}CEP: {hotel.cep}</p>
                          </div>
                        </div>

                        {/* Preços e Ações */}
                        <div className="space-y-4">
                          <div className="text-right">
                            {hotel.quartos.length > 0 ? (
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">A partir de</p>
                                <p className="text-2xl font-bold text-green-600">
                                  {formatPrice(getMinPrice(hotel))}
                                </p>
                                {getMaxPrice(hotel) > getMinPrice(hotel) && (
                                  <p className="text-sm text-gray-500">
                                    até {formatPrice(getMaxPrice(hotel))}
                                  </p>
                                )}
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  {hotel.quartos.length} quarto{hotel.quartos.length !== 1 ? 's' : ''} disponível{hotel.quartos.length !== 1 ? 'is' : ''}
                                </p>
                              </div>
                            ) : (
                              <div>
                                <p className="text-sm text-gray-500">Sem quartos disponíveis</p>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Button
                              onClick={() => handleViewHotel(hotel)}
                              className="w-full"
                              disabled={hotel.quartos.length === 0}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalhes
                            </Button>

                            {hotel.telefone && (
                              <Button variant="outline" className="w-full text-sm">
                                {hotel.telefone}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
