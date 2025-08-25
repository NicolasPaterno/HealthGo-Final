import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './hotels-map.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building, Eye, Navigation, Globe, AlertCircle } from 'lucide-react';
import type { Hotel } from '@/types/hotel';

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

interface HotelsMapProps {
  hotels: HotelWithRooms[];
  onHotelSelect: (hotel: HotelWithRooms) => void;
  selectedHotel?: HotelWithRooms | null;
}

// Componente para ajustar a visualização do mapa
function MapBounds({ hotels }: { hotels: HotelWithRooms[] }) {
  const map = useMap();

  useEffect(() => {
    if (hotels.length > 0) {
      // Encontrar a primeira coordenada válida para inicializar os limites
      const firstValidHotel = hotels.find(hotel => hotel.latitude && hotel.longitude);

      if (firstValidHotel) {
        const bounds = new LatLngBounds([[firstValidHotel.latitude!, firstValidHotel.longitude!]]);

        hotels.forEach(hotel => {
          if (hotel.latitude && hotel.longitude) {
            bounds.extend([hotel.latitude, hotel.longitude]);
          }
        });

        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  }, [hotels, map]);

  return null;
}

// Ícone personalizado para os marcadores
const createCustomIcon = (isSelected: boolean) => {
  return new Icon({
    iconUrl: isSelected
      ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyQzIgMTcuNTIgNi40OCAyMiAxMiAyMkMxNy41MiAyMiAyMiAxNy41MiAyMiAxMkMyMiA2LjQ4IDE3LjUyIDIgMTIgMloiIGZpbGw9IiNFNjM0RjEiLz4KPHBhdGggZD0iTTEyIDZDNi40OCA2IDIgMTAuNDggMiAxNkMyIDE5LjUyIDQuNDggMjIgOCAyMkMxMS41MiAyMiAxNSAxOS41MiAxNSAxNkMxNSAxMC40OCAxMC41MiA2IDcgNloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo='
      : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iMjQgMjRIMFYwaDI0djI0eiIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJDMiAxNy41MiA2LjQ4IDIyIDEyIDIyQzE3LjUyIDIyIDIyIDE3LjUyIDIyIDEyQzIyIDYuNDggMTcuNTIgMiAxMiAyWk0xMiAyMEM3LjU4IDIwIDQgMTYuNDIgNCAxMkM0IDcuNTggNy41OCA0IDEyIDRDMTYuNDIgNCAyMCA3LjU4IDIwIDEyQzIwIDE2LjQyIDE2LjQyIDIwIDEyIDIwWiIgZmlsbD0iIzNCODJGRiIvPgo8cGF0aCBkPSJNMTIgNkM5Ljc5IDYgOCA3Ljc5IDggMTBDOCAxMi4yMSA5Ljc5IDE0IDEyIDE0QzE0LjIxIDE0IDE2IDEyLjIxIDE2IDEwQzE2IDcuNzkgMTQuMjEgNiAxMiA2Wk0xMiAxMkMxMC45IDEyIDEwIDExLjEgMTAgMTBDMTAgOC45IDEwLjkgOCAxMiA4QzEzLjEgOCAxNCA4LjkgMTQgMTBDMTQgMTEuMSAxMy4xIDEyIDEyIDEyWiIgZmlsbD0iIzNCODJGRiIvPgo8L3N2Zz4K',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

export default function HotelsMap({ hotels, onHotelSelect, selectedHotel }: HotelsMapProps) {
  const [mapView, setMapView] = useState<'map' | 'list' | 'split'>('split');
  const [hoveredHotel, setHoveredHotel] = useState<HotelWithRooms | null>(null);
  const [geocodingStatus, setGeocodingStatus] = useState<Record<number, 'idle' | 'loading' | 'success' | 'error'>>({});

  // Filtrar hotéis com coordenadas válidas
  const hotelsWithCoordinates = useMemo(() => {
    console.log('HotelsMap - Hotéis recebidos:', hotels);

    const validHotels = hotels.filter(hotel => {
      const hasCoords = hotel.latitude &&
        hotel.longitude &&
        !isNaN(hotel.latitude) &&
        !isNaN(hotel.longitude);

      console.log(`Hotel ${hotel.nome}:`, {
        id: hotel.id,
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        hasValidCoords: hasCoords,
        latitudeType: typeof hotel.latitude,
        longitudeType: typeof hotel.longitude
      });

      return hasCoords;
    });

    console.log(`HotelsMap - Total de hotéis: ${hotels.length}`);
    console.log(`HotelsMap - Hotéis com coordenadas válidas: ${validHotels.length}`);

    return validHotels;
  }, [hotels]);

  // Hotéis sem coordenadas
  const hotelsWithoutCoordinates = useMemo(() => {
    return hotels.filter(hotel =>
      !hotel.latitude ||
      !hotel.longitude ||
      isNaN(hotel.latitude) ||
      isNaN(hotel.longitude)
    );
  }, [hotels]);

  // Coordenadas padrão (Brasil)
  const defaultCenter: [number, number] = [-14.235, -51.9253];
  const defaultZoom = 5;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getMinPrice = (hotel: HotelWithRooms) => {
    if (hotel.quartos.length === 0) return 0;
    return Math.min(...hotel.quartos.map(room => room.preco));
  };

  const handleHotelClick = (hotel: HotelWithRooms) => {
    onHotelSelect(hotel);
  };

  const handleViewHotel = (hotel: HotelWithRooms) => {
    window.location.href = `/hotel/${hotel.id}`;
  };

  const handleGetDirections = (hotel: HotelWithRooms) => {
    if (hotel.latitude && hotel.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${hotel.latitude},${hotel.longitude}`;
      window.open(url, '_blank');
    }
  };

  // Função para geocodificar endereço usando OpenStreetMap Nominatim
  const geocodeAddress = async (hotel: HotelWithRooms) => {
    if (geocodingStatus[hotel.id] === 'loading') return;

    setGeocodingStatus(prev => ({ ...prev, [hotel.id]: 'loading' }));

    try {
      const address = [
        hotel.rua,
        hotel.numeroEndereco,
        hotel.bairro,
        hotel.cidade?.nome,
        hotel.cidade?.estado?.sigla,
        'Brasil'
      ].filter(Boolean).join(', ');

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=br`
      );

      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        // Atualizar o hotel com as coordenadas (em uma aplicação real, isso seria salvo no backend)
        hotel.latitude = parseFloat(lat);
        hotel.longitude = parseFloat(lon);
        setGeocodingStatus(prev => ({ ...prev, [hotel.id]: 'success' }));

        // Forçar re-render do componente
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setGeocodingStatus(prev => ({ ...prev, [hotel.id]: 'error' }));
      }
    } catch (error) {
      console.error('Erro ao geocodificar endereço:', error);
      setGeocodingStatus(prev => ({ ...prev, [hotel.id]: 'error' }));
    }
  };

  if (hotels.length === 0) {
    return (
      <Card className="w-full h-96 flex items-center justify-center">
        <CardContent className="text-center">
          <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhum hotel encontrado
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Não há hotéis disponíveis para exibir no mapa.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full">
      {/* Controles de visualização */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button
            variant={mapView === 'map' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapView('map')}
          >
            <MapPin className="h-4 w-4 mr-2" />
            Apenas Mapa
          </Button>
          <Button
            variant={mapView === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapView('list')}
          >
            <Building className="h-4 w-4 mr-2" />
            Apenas Lista
          </Button>
          <Button
            variant={mapView === 'split' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapView('split')}
          >
            Mapa + Lista
          </Button>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          {hotelsWithCoordinates.length} hotel{hotelsWithCoordinates.length !== 1 ? 'is' : ''} no mapa
          {hotelsWithoutCoordinates.length > 0 && (
            <span className="ml-2 text-orange-600">
              • {hotelsWithoutCoordinates.length} sem localização
            </span>
          )}
        </div>
      </div>

      {/* Aviso sobre hotéis sem coordenadas */}
      {hotelsWithoutCoordinates.length > 0 && (
        <Card className="mb-4 border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">
                  {hotelsWithoutCoordinates.length} hotel{hotelsWithoutCoordinates.length !== 1 ? 'is' : ''} sem localização no mapa
                </h4>
                <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                  Alguns hotéis não possuem coordenadas geográficas e não podem ser exibidos no mapa.
                  Você pode tentar geocodificar automaticamente os endereços.
                </p>
                <div className="flex flex-wrap gap-2">
                  {hotelsWithoutCoordinates.slice(0, 5).map(hotel => (
                    <div key={hotel.id} className="flex items-center gap-2 bg-white dark:bg-orange-800 px-3 py-2 rounded-lg">
                      <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                        {hotel.nome}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => geocodeAddress(hotel)}
                        disabled={geocodingStatus[hotel.id] === 'loading'}
                        className="h-6 px-2 text-xs"
                      >
                        {geocodingStatus[hotel.id] === 'loading' ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-orange-600"></div>
                        ) : geocodingStatus[hotel.id] === 'success' ? (
                          <Globe className="h-3 w-3 text-green-600" />
                        ) : geocodingStatus[hotel.id] === 'error' ? (
                          <AlertCircle className="h-3 w-3 text-red-600" />
                        ) : (
                          <Globe className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  ))}
                  {hotelsWithoutCoordinates.length > 5 && (
                    <span className="text-sm text-orange-600 dark:text-orange-400">
                      +{hotelsWithoutCoordinates.length - 5} mais
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className={`grid gap-4 ${mapView === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
        }`}>
        {/* Mapa */}
        {(mapView === 'map' || mapView === 'split') && (
          <div className="relative">
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Mapa de Hotéis</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 w-full">
                  <MapContainer
                    center={defaultCenter}
                    zoom={defaultZoom}
                    className="h-full w-full"
                    style={{ minHeight: '384px' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {hotelsWithCoordinates.length > 0 && (
                      <MapBounds hotels={hotelsWithCoordinates} />
                    )}

                    {hotelsWithCoordinates.map((hotel) => (
                      <Marker
                        key={hotel.id}
                        position={[hotel.latitude!, hotel.longitude!]}
                        icon={createCustomIcon(selectedHotel?.id === hotel.id)}
                        eventHandlers={{
                          click: () => handleHotelClick(hotel),
                          mouseover: () => setHoveredHotel(hotel),
                          mouseout: () => setHoveredHotel(null),
                        }}
                      >
                        <Popup>
                          <div className="p-2 min-w-48">
                            <h3 className="font-semibold text-gray-900 mb-2">{hotel.nome}</h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {hotel.cidade?.nome}, {hotel.cidade?.estado?.sigla}
                            </p>
                            {hotel.quartos.length > 0 && (
                              <p className="text-sm text-green-600 font-medium mb-2">
                                A partir de {formatPrice(getMinPrice(hotel))}
                              </p>
                            )}
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleViewHotel(hotel)}
                                className="flex-1"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Ver
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleGetDirections(hotel)}
                              >
                                <Navigation className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Lista de hotéis */}
        {(mapView === 'list' || mapView === 'split') && (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {/* Hotéis com coordenadas */}
            {hotelsWithCoordinates.map((hotel) => (
              <Card
                key={hotel.id}
                className={`cursor-pointer transition-all hover:shadow-md ${selectedHotel?.id === hotel.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                onClick={() => handleHotelClick(hotel)}
                onMouseEnter={() => setHoveredHotel(hotel)}
                onMouseLeave={() => setHoveredHotel(null)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {hotel.nome}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {hotel.cidade?.nome}, {hotel.cidade?.estado?.sigla}
                        </span>
                      </div>

                      {hotel.quartos.length > 0 && (
                        <p className="text-sm text-green-600 font-medium">
                          A partir de {formatPrice(getMinPrice(hotel))}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {hotel.tipo}
                        </Badge>
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
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewHotel(hotel);
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Ver
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGetDirections(hotel);
                        }}
                      >
                        <Navigation className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Hotéis sem coordenadas */}
            {hotelsWithoutCoordinates.map((hotel) => (
              <Card
                key={hotel.id}
                className="cursor-pointer transition-all hover:shadow-md border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800"
                onClick={() => handleHotelClick(hotel)}
                onMouseEnter={() => setHoveredHotel(hotel)}
                onMouseLeave={() => setHoveredHotel(null)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {hotel.nome}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {hotel.cidade?.nome}, {hotel.cidade?.estado?.sigla}
                        </span>
                      </div>

                      {hotel.quartos.length > 0 && (
                        <p className="text-sm text-green-600 font-medium">
                          A partir de {formatPrice(getMinPrice(hotel))}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {hotel.tipo}
                        </Badge>
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
                        <Badge variant="outline" className="text-xs text-orange-600 border-orange-300">
                          Sem localização
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewHotel(hotel);
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Ver
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          geocodeAddress(hotel);
                        }}
                        disabled={geocodingStatus[hotel.id] === 'loading'}
                        className="text-orange-600 border-orange-300 hover:bg-orange-100"
                      >
                        {geocodingStatus[hotel.id] === 'loading' ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-orange-600"></div>
                        ) : (
                          <Globe className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Informações do hotel selecionado */}
      {selectedHotel && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Hotel Selecionado: {selectedHotel.nome}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Localização</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedHotel.rua}, {selectedHotel.numeroEndereco}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedHotel.bairro && `${selectedHotel.bairro}, `}
                  {selectedHotel.cidade?.nome}, {selectedHotel.cidade?.estado?.sigla}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  CEP: {selectedHotel.cep}
                </p>
                {selectedHotel.latitude && selectedHotel.longitude ? (
                  <p className="text-sm text-green-600 font-medium mt-1">
                    ✅ Coordenadas: {selectedHotel.latitude.toFixed(6)}, {selectedHotel.longitude.toFixed(6)}
                  </p>
                ) : (
                  <div className="mt-2">
                    <p className="text-sm text-orange-600 font-medium mb-2">
                      ⚠️ Sem coordenadas geográficas
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => geocodeAddress(selectedHotel)}
                      disabled={geocodingStatus[selectedHotel.id] === 'loading'}
                      className="text-orange-600 border-orange-300"
                    >
                      {geocodingStatus[selectedHotel.id] === 'loading' ? (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-orange-600"></div>
                      ) : (
                        <>
                          <Globe className="h-3 w-3 mr-1" />
                          Geocodificar Endereço
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Informações</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tipo: {selectedHotel.tipo}
                </p>
                {selectedHotel.descricao && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedHotel.descricao}
                  </p>
                )}
                {selectedHotel.quartos.length > 0 && (
                  <p className="text-sm text-green-600 font-medium mt-2">
                    {selectedHotel.quartos.length} quarto{selectedHotel.quartos.length !== 1 ? 's' : ''} disponível{selectedHotel.quartos.length !== 1 ? 'is' : ''}
                  </p>
                )}
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <Button onClick={() => handleViewHotel(selectedHotel)}>
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalhes Completos
              </Button>
              {selectedHotel.latitude && selectedHotel.longitude && (
                <Button variant="outline" onClick={() => handleGetDirections(selectedHotel)}>
                  <Navigation className="h-4 w-4 mr-2" />
                  Como Chegar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
