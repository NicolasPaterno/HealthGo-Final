import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Building,
  Users,
  Bed,
  ArrowLeft,
  Accessibility,
  Heart,
  Map,
  Navigation,
  ExternalLink,
  X
} from 'lucide-react';
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
  latitude?: number;
  longitude?: number;
  cidade: {
    nome: string;
    estado: {
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

export default function HotelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);

  useEffect(() => {
    if (id) {
      fetchHotelDetails();
    }
  }, [id]);

  const fetchHotelDetails = async () => {
    try {
      setLoading(true);

      // Buscar dados do hotel
      const hotelResponse = await api.get(`/Hotel/${id}`);
      const hotelData = hotelResponse.data;

      // Buscar quartos do hotel
      const roomsResponse = await api.get(`/Quarto/hotel/${id}`);
      const roomsData = roomsResponse.data.data || [];

      setHotel({
        ...hotelData,
        quartos: roomsData
      });
    } catch (error) {
      console.error('Erro ao carregar detalhes do hotel:', error);
      toast.error('Erro ao carregar detalhes do hotel. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleReserveRoom = (room: Room) => {
    // Implementar lógica de reserva
    toast.success(`Quarto ${room.numero} selecionado para reserva!`);
    setSelectedRoom(room);
  };

  const handleBack = () => {
    navigate('/dashboard/hotels');
  };

  // Função para geocodificar endereço usando OpenStreetMap Nominatim
  const geocodeAddress = async () => {
    if (!hotel || isGeocoding) return;

    setIsGeocoding(true);
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
        // Atualizar o hotel com as coordenadas
        setHotel(prev => prev ? {
          ...prev,
          latitude: parseFloat(lat),
          longitude: parseFloat(lon)
        } : null);

        toast.success('Localização do hotel atualizada com sucesso!');
      } else {
        toast.error('Não foi possível encontrar as coordenadas para este endereço.');
      }
    } catch (error) {
      console.error('Erro ao geocodificar endereço:', error);
      toast.error('Erro ao obter localização do hotel. Tente novamente.');
    } finally {
      setIsGeocoding(false);
    }
  };

  // Função para fazer ligação
  const handleCall = () => {
    if (hotel?.telefone) {
      // Formatar telefone removendo caracteres especiais
      const phoneNumber = hotel.telefone.replace(/[^\d+]/g, '');
      window.open(`tel:${phoneNumber}`, '_self');
    } else {
      toast.error('Telefone não disponível para este hotel.');
    }
  };

  // Função para enviar e-mail
  const handleEmail = () => {
    if (hotel?.email) {
      window.open(`mailto:${hotel.email}?subject=Consulta sobre ${hotel.nome}`, '_self');
    } else {
      toast.error('E-mail não disponível para este hotel.');
    }
  };

  // Função para abrir rota no Google Maps
  const handleGetDirections = () => {
    if (hotel?.latitude && hotel?.longitude) {
      // Usar coordenadas específicas do hotel se disponíveis
      const url = `https://www.google.com/maps/dir/?api=1&destination=${hotel.latitude},${hotel.longitude}`;
      window.open(url, '_blank');
    } else if (hotel?.rua && hotel?.cidade?.nome) {
      // Usar endereço se não houver coordenadas
      const address = `${hotel.rua}, ${hotel.numeroEndereco}, ${hotel.bairro}, ${hotel.cidade.nome}, ${hotel.cidade.estado.sigla}, Brasil`;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
      window.open(url, '_blank');
    } else {
      toast.error('Informações de localização insuficientes para obter rota.');
    }
  };

  // Função para abrir site do hotel
  const handleVisitWebsite = () => {
    if (hotel?.site) {
      // Verificar se o site já tem protocolo
      const url = hotel.site.startsWith('http') ? hotel.site : `https://${hotel.site}`;
      window.open(url, '_blank');
    } else {
      toast.error('Site não disponível para este hotel.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando detalhes do hotel...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Hotel não encontrado
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            O hotel que você está procurando não existe ou foi removido.
          </p>
          <Button onClick={handleBack}>
            Voltar para Hotéis
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {hotel.nome}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                <MapPin className="h-4 w-4" />
                <span>{hotel.cidade?.nome}, {hotel.cidade?.estado?.sigla}</span>
                <Badge variant="secondary">{hotel.tipo}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações do Hotel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Descrição */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre o Hotel</CardTitle>
              </CardHeader>
              <CardContent>
                {hotel.descricao ? (
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {hotel.descricao}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">
                    Nenhuma descrição disponível para este hotel.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Características */}
            <Card>
              <CardHeader>
                <CardTitle>Características</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">Tipo: {hotel.tipo}</span>
                  </div>

                  {hotel.acessibilidade && (
                    <div className="flex items-center gap-3">
                      <Accessibility className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">Acessível</span>
                    </div>
                  )}

                  {hotel.quartos.some(room => room.aceitaAnimal) && (
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">Aceita animais de estimação</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Bed className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {hotel.quartos.length} quarto{hotel.quartos.length !== 1 ? 's' : ''} disponível{hotel.quartos.length !== 1 ? 'is' : ''}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Endereço */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Localização</span>
                  {!hotel.latitude && !hotel.longitude && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={geocodeAddress}
                      disabled={isGeocoding}
                      className="text-orange-600 border-orange-300 hover:bg-orange-100"
                    >
                      {isGeocoding ? (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-orange-600"></div>
                      ) : (
                        <Globe className="h-3 w-3 mr-1" />
                      )}
                      Obter Localização
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {hotel.rua}, {hotel.numeroEndereco}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {hotel.bairro}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {hotel.cidade?.nome} - {hotel.cidade?.estado?.sigla}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        CEP: {hotel.cep}
                      </p>
                      {hotel.latitude && hotel.longitude && (
                        <p className="text-sm text-green-600 font-medium mt-1">
                          ✅ Coordenadas: {hotel.latitude.toFixed(6)}, {hotel.longitude.toFixed(6)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quartos */}
            <Card>
              <CardHeader>
                <CardTitle>Quartos Disponíveis</CardTitle>
              </CardHeader>
              <CardContent>
                {hotel.quartos.length === 0 ? (
                  <div className="text-center py-8">
                    <Bed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Nenhum quarto disponível
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Este hotel não possui quartos cadastrados no momento.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {hotel.quartos.map((room) => (
                      <div
                        key={room.id}
                        className={`border rounded-lg p-4 transition-all ${selectedRoom?.id === room.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                          }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                Quarto {room.numero}
                              </h4>
                              {room.andar > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  {room.andar}º andar
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{room.limitePessoa} pessoa{room.limitePessoa !== 1 ? 's' : ''}</span>
                              </div>
                              {room.aceitaAnimal && (
                                <Badge variant="secondary" className="text-xs">
                                  Aceita pets
                                </Badge>
                              )}
                            </div>

                            {room.observacao && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {room.observacao}
                              </p>
                            )}
                          </div>

                          <div className="text-right">
                            <div className="mb-2">
                              <p className="text-2xl font-bold text-green-600">
                                {formatPrice(room.preco)}
                              </p>
                              <p className="text-sm text-gray-500">por noite</p>
                            </div>

                            <Button
                              onClick={() => handleReserveRoom(room)}
                              className="w-full"
                            >
                              Reservar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preços */}
            <Card>
              <CardHeader>
                <CardTitle>Preços</CardTitle>
              </CardHeader>
              <CardContent>
                {hotel.quartos.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">A partir de:</span>
                      <span className="text-xl font-bold text-green-600">
                        {formatPrice(Math.min(...hotel.quartos.map(room => room.preco)))}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Até:</span>
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        {formatPrice(Math.max(...hotel.quartos.map(room => room.preco)))}
                      </span>
                    </div>
                    <Separator />
                    <p className="text-sm text-gray-500">
                      Preços por noite, variam conforme o quarto
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500">Nenhum quarto disponível</p>
                )}
              </CardContent>
            </Card>

            {/* Contato */}
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {hotel.telefone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {hotel.telefone}
                      </p>
                      <p className="text-sm text-gray-500">Telefone</p>
                    </div>
                  </div>
                )}

                {hotel.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {hotel.email}
                      </p>
                      <p className="text-sm text-gray-500">E-mail</p>
                    </div>
                  </div>
                )}

                {hotel.site && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <div>
                      <Button
                        variant="link"
                        className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        onClick={handleVisitWebsite}
                      >
                        Visitar site
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                      <p className="text-sm text-gray-500">Website</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Ações */}
            <Card>
              <CardHeader>
                <CardTitle>Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleCall}
                  disabled={!hotel.telefone}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Ligar Agora
                </Button>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleEmail}
                  disabled={!hotel.email}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar Mensagem
                </Button>

                <Dialog open={showMap} onOpenChange={setShowMap}>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                      <Map className="h-4 w-4 mr-2" />
                      Ver no Mapa
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        Localização: {hotel.nome}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="relative">
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 z-10"
                        onClick={() => setShowMap(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>

                      {hotel.latitude && hotel.longitude ? (
                        <div className="h-96 w-full rounded-lg overflow-hidden border">
                          <iframe
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${hotel.longitude - 0.01},${hotel.latitude - 0.01},${hotel.longitude + 0.01},${hotel.latitude + 0.01}&layer=mapnik&marker=${hotel.latitude},${hotel.longitude}`}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            title={`Mapa de ${hotel.nome}`}
                            className="w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="h-96 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg border">
                          <div className="text-center">
                            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                              Localização não disponível
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                              Este hotel não possui coordenadas geográficas.
                            </p>
                            <Button onClick={geocodeAddress} disabled={isGeocoding}>
                              {isGeocoding ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
                              ) : (
                                <Globe className="h-3 w-3 mr-1" />
                              )}
                              Obter Localização
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={handleGetDirections}
                        >
                          <Navigation className="h-4 w-4 mr-2" />
                          Obter Rota no Google Maps
                        </Button>
                        {hotel.latitude && hotel.longitude && (
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                              const url = `https://www.openstreetmap.org/?mlat=${hotel.latitude}&mlon=${hotel.longitude}#map=15/${hotel.latitude}/${hotel.longitude}`;
                              window.open(url, '_blank');
                            }}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Abrir no OpenStreetMap
                          </Button>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
