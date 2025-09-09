import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Combobox } from '@/components/ui/combobox';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, MapPin, Building, Filter, Eye, Map } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/services/api';
import type { Hotel } from '@/types/hotel';
import HotelsMap from '@/components/hotels-map';

// Extendendo o tipo Hotel para incluir quartos
interface HotelWithRooms extends Hotel {
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
  const [hotels, setHotels] = useState<HotelWithRooms[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<HotelWithRooms[]>([]);
  const [loading, setLoading] = useState(true);
  const [allCities, setAllCities] = useState<{ name: string; state: string }[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedHotel, setSelectedHotel] = useState<HotelWithRooms | null>(null);

  // Inicializar filtros com base nos parâmetros da URL
  const getInitialFilters = (): Filters => {
    const cityParam = searchParams.get('city');
    const searchParam = searchParams.get('search');
    const stateParam = searchParams.get('state');

    console.log('Parâmetros da URL recebidos:', {
      city: cityParam,
      search: searchParam,
      state: stateParam
    });

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

  // Função para normalizar strings para comparação
  const normalizeString = (str: string): string => {
    return str.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .trim();
  };

  // Função para filtrar cidades baseado no estado selecionado
  const getFilteredCities = (): { value: string; label: string }[] => {
    if (filters.state === 'all') {
      // Se nenhum estado está selecionado, mostrar todas as cidades
      return allCities.map(city => ({
        value: city.name,
        label: `${city.name} - ${city.state}`
      }));
    } else {
      // Filtrar cidades pelo estado selecionado
      const filteredCities = allCities.filter(city =>
        normalizeString(city.state) === normalizeString(filters.state)
      );
      return filteredCities.map(city => ({
        value: city.name,
        label: city.name
      }));
    }
  };

  // Função para obter o label correto da cidade selecionada
  const getSelectedCityLabel = (): string => {
    console.log('getSelectedCityLabel chamado:', {
      filtersCity: filters.city,
      filtersState: filters.state,
      allCitiesLength: allCities.length,
      allCities: allCities
    });

    if (filters.city === 'all') {
      console.log('Retornando: Todas as cidades');
      return 'Todas as cidades';
    }

    // Se ainda não temos cidades carregadas, retornar a cidade como está
    if (allCities.length === 0) {
      console.log('Cidades não carregadas ainda, retornando cidade original:', filters.city);
      return filters.city;
    }

    const selectedCity = allCities.find(city =>
      normalizeString(city.name) === normalizeString(filters.city)
    );
    console.log('Cidade encontrada:', selectedCity);

    if (!selectedCity) {
      console.log('Cidade não encontrada, retornando cidade original:', filters.city);
      return filters.city;
    }

    if (filters.state === 'all') {
      const label = `${selectedCity.name} - ${selectedCity.state}`;
      console.log('Retornando label com estado:', label);
      return label;
    } else {
      console.log('Retornando label sem estado:', selectedCity.name);
      return selectedCity.name;
    }
  };

  const fetchHotels = async () => {
    try {
      setLoading(true);
      console.log('Buscando hotéis da API...');
      const response = await api.get('/Hotel');
      console.log('Resposta da API:', response.data);

      const hotelsData = response.data.data || [];
      console.log('Hotéis recebidos:', hotelsData);

      // Verificar coordenadas dos hotéis
      const hotelsWithCoordinates = hotelsData.filter((hotel: Hotel) => {
        const hasCoords = hotel.latitude && hotel.longitude;
        console.log(`Hotel ${hotel.nome}:`, {
          id: hotel.id,
          latitude: hotel.latitude,
          longitude: hotel.longitude,
          hasCoordinates: hasCoords
        });
        return hasCoords;
      });

      console.log(`Total de hotéis: ${hotelsData.length}`);
      console.log(`Hotéis com coordenadas: ${hotelsWithCoordinates.length}`);
      console.log(`Hotéis sem coordenadas: ${hotelsData.length - hotelsWithCoordinates.length}`);

      // Buscar quartos para cada hotel
      const hotelsWithRooms = await Promise.all(
        hotelsWithCoordinates.map(async (hotel: Hotel) => {
          try {
            const roomsResponse = await api.get(`/Quarto/hotel/${hotel.id}`);
            return {
              ...hotel,
              quartos: roomsResponse.data.data || []
            };
          } catch (error) {
            console.log(`Erro ao buscar quartos para hotel ${hotel.id}:`, error);
            return {
              ...hotel,
              quartos: []
            };
          }
        })
      );

      console.log('Hotéis com quartos:', hotelsWithRooms);
      setHotels(hotelsWithRooms);
      setFilteredHotels(hotelsWithRooms);

      // Extrair cidades únicas com seus estados
      const citiesWithStates: { name: string; state: string }[] = hotelsData
        .filter((hotel: Hotel) => hotel.cidade?.nome && hotel.cidade?.estado?.sigla)
        .map((hotel: Hotel) => ({
          name: hotel.cidade!.nome,
          state: hotel.cidade!.estado!.sigla
        }));

      // Remover duplicatas usando Set
      const uniqueCitiesSet = new Set(citiesWithStates.map(city => `${city.name}-${city.state}`));
      const uniqueCitiesWithStates = Array.from(uniqueCitiesSet).map(cityKey => {
        const [name, state] = cityKey.split('-');
        return { name, state };
      });

      console.log('Cidades únicas encontradas:', uniqueCitiesWithStates);
      setAllCities(uniqueCitiesWithStates);
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
  }, [searchParams]);

  // Aplicar filtros sempre que os filtros ou hotéis mudarem
  useEffect(() => {
    if (hotels.length > 0) {
      applyFilters();
    }
  }, [filters, hotels]);

  // Aplicar filtros quando as cidades forem carregadas (para garantir que filtros da URL funcionem)
  useEffect(() => {
    if (allCities.length > 0 && hotels.length > 0) {
      // Verificar se há parâmetros da URL para aplicar
      const cityFromUrl = searchParams.get('city');
      const stateFromUrl = searchParams.get('state');

      if (cityFromUrl || stateFromUrl) {
        console.log('Aplicando filtros da URL após carregamento das cidades:', {
          city: cityFromUrl,
          state: stateFromUrl,
          allCities: allCities.length
        });
        applyFilters();
      }
    }
  }, [allCities, hotels, searchParams]);

  // Limpar cidade selecionada quando o estado mudar (apenas se não vier de parâmetros da URL)
  useEffect(() => {
    if (filters.state !== 'all' && allCities.length > 0) {
      // Verificar se a cidade selecionada pertence ao estado selecionado
      const cityBelongsToState = allCities.some(city =>
        city.name === filters.city && normalizeString(city.state) === normalizeString(filters.state)
      );

      // Só limpar se a cidade não pertencer ao estado E se não vier de parâmetros da URL
      const cityFromUrl = searchParams.get('city');
      if (!cityBelongsToState && filters.city !== 'all' && filters.city !== cityFromUrl) {
        setFilters(prev => ({ ...prev, city: 'all' }));
      }
    }
  }, [filters.state, allCities, searchParams]);

  const applyFilters = () => {
    console.log('Aplicando filtros:', filters);
    console.log('Hotéis disponíveis:', hotels.length);

    let filtered = [...hotels];

    // Filtro de busca (mais flexível)
    if (filters.search) {
      const searchTerm = normalizeString(filters.search);
      filtered = filtered.filter(hotel => {
        const searchFields = [
          hotel.nome,
          hotel.descricao,
          hotel.cidade?.nome,
          hotel.bairro,
          hotel.rua
        ].filter(Boolean).map(field => normalizeString(field || ''));

        return searchFields.some(field => field.includes(searchTerm));
      });
      console.log('Após filtro de busca:', filtered.length);
    }

    // Filtro de cidade (busca exata e parcial)
    if (filters.city && filters.city !== 'all') {
      filtered = filtered.filter(hotel => {
        const hotelCity = normalizeString(hotel.cidade?.nome || '');
        const filterCity = normalizeString(filters.city);
        return hotelCity === filterCity || hotelCity.includes(filterCity);
      });
      console.log('Após filtro de cidade:', filtered.length);
    }

    // Filtro de estado (busca por sigla)
    if (filters.state && filters.state !== 'all') {
      filtered = filtered.filter(hotel => {
        const hotelState = normalizeString(hotel.cidade?.estado?.sigla || '');
        const filterState = normalizeString(filters.state);
        return hotelState === filterState;
      });
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

  const getMinPrice = (hotel: HotelWithRooms) => {
    if (hotel.quartos.length === 0) return 0;
    return Math.min(...hotel.quartos.map(room => room.preco));
  };

  const getMaxPrice = (hotel: HotelWithRooms) => {
    if (hotel.quartos.length === 0) return 0;
    return Math.max(...hotel.quartos.map(room => room.preco));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleViewHotel = (hotel: HotelWithRooms) => {
    // Navegar para página de detalhes do hotel
    window.location.href = `/hotel/${hotel.id}`;
  };

  const handleHotelSelect = (hotel: HotelWithRooms) => {
    setSelectedHotel(hotel);
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
                  <Combobox
                    options={[
                      { value: 'all', label: 'Todas as cidades' },
                      ...getFilteredCities()
                    ]}
                    value={filters.city}
                    onValueChange={(value) => setFilters({ ...filters, city: value })}
                    placeholder="Selecione uma cidade..."
                    emptyText="Nenhuma cidade encontrada."
                    selectedLabel={getSelectedCityLabel()}
                  />
                </div>

                {/* Estado */}
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Select value={filters.state} onValueChange={(value) => setFilters({ ...filters, state: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a UF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os estados</SelectItem>
                      <SelectItem value="AC">Acre</SelectItem>
                      <SelectItem value="AL">Alagoas</SelectItem>
                      <SelectItem value="AP">Amapá</SelectItem>
                      <SelectItem value="AM">Amazonas</SelectItem>
                      <SelectItem value="BA">Bahia</SelectItem>
                      <SelectItem value="CE">Ceará</SelectItem>
                      <SelectItem value="DF">Distrito Federal</SelectItem>
                      <SelectItem value="ES">Espírito Santo</SelectItem>
                      <SelectItem value="GO">Goiás</SelectItem>
                      <SelectItem value="MA">Maranhão</SelectItem>
                      <SelectItem value="MT">Mato Grosso</SelectItem>
                      <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                      <SelectItem value="PA">Pará</SelectItem>
                      <SelectItem value="PB">Paraíba</SelectItem>
                      <SelectItem value="PR">Paraná</SelectItem>
                      <SelectItem value="PE">Pernambuco</SelectItem>
                      <SelectItem value="PI">Piauí</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                      <SelectItem value="RO">Rondônia</SelectItem>
                      <SelectItem value="RR">Roraima</SelectItem>
                      <SelectItem value="SC">Santa Catarina</SelectItem>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="SE">Sergipe</SelectItem>
                      <SelectItem value="TO">Tocantins</SelectItem>
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
            {/* Abas de Visualização */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  onClick={() => setViewMode('list')}
                  className="flex items-center gap-2"
                >
                  <Building className="h-4 w-4" />
                  Lista
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  onClick={() => setViewMode('map')}
                  className="flex items-center gap-2"
                >
                  <Map className="h-4 w-4" />
                  Mapa
                </Button>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {filteredHotels.length}
                {filteredHotels.length !== 1 ? 'hoteis' : 'hotel'} encontrado{filteredHotels.length !== 1 ? 's' : ''}
              </h2>
            </div>

            {/* Conteúdo baseado no modo de visualização */}
            {viewMode === 'map' ? (
              <HotelsMap
                hotels={filteredHotels}
                onHotelSelect={handleHotelSelect}
                selectedHotel={selectedHotel}
              />
            ) : (
              <>
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
                  <>

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
                                        <span>
                                          {hotel.cidade?.nome ? (
                                            <>
                                              {hotel.cidade.nome}
                                              {hotel.cidade.estado?.sigla && `, ${hotel.cidade.estado.sigla}`}
                                            </>
                                          ) : (
                                            'Localização não informada'
                                          )}
                                        </span>
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
                                  <p>
                                    {hotel.bairro && `${hotel.bairro}`}
                                    {hotel.bairro && hotel.cep && ' • '}
                                    {hotel.cep && `CEP: ${hotel.cep}`}
                                  </p>
                                  {hotel.cidade?.nome && (
                                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                                      📍 {hotel.cidade.nome}
                                      {hotel.cidade.estado?.sigla && ` - ${hotel.cidade.estado.sigla}`}
                                    </p>
                                  )}
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
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
