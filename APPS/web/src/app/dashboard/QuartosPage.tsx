import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, Bed, Users, DollarSign, MapPin, Building } from "lucide-react";
import { toast } from "sonner";
import api from "@/services/api";
import AddRoomModal from "@/components/add-room-modal";
import EditRoomModal from "@/components/edit-room-modal";
import { LoadingSpinner } from "@/components/loading-spinner";

interface Hotel {
  id: number;
  nome: string;
  tipo: string;
  ativo: boolean;
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

export default function QuartosPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [deletingRoomId, setDeletingRoomId] = useState<number | null>(null);

  const fetchHotels = async () => {
    try {
      const response = await api.get('/Hotel/my-hotels');
      setHotels(response.data.data || []);
    } catch (error) {
      console.error('Erro ao carregar hotéis:', error);
      toast.error('Erro ao carregar hotéis. Tente novamente.');
    }
  };

  const fetchRooms = async () => {
    if (!selectedHotel) return;

    try {
      setLoading(true);
      const response = await api.get(`/Quarto/hotel/${selectedHotel.id}`);
      console.log('Resposta da API de quartos:', response.data);
      setRooms(response.data.data || []);
    } catch (error) {
      console.error('Erro ao carregar quartos:', error);
      toast.error('Erro ao carregar quartos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    if (selectedHotel) {
      fetchRooms();
    }
  }, [selectedHotel]);

  const handleHotelSelect = (hotel: Hotel) => {
    setSelectedHotel(hotel);
  };

  const handleAddRoom = () => {
    if (!selectedHotel) {
      toast.error('Selecione um hotel primeiro');
      return;
    }
    setIsAddModalOpen(true);
  };

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);
    setIsEditModalOpen(true);
  };

  const handleDeleteRoom = async (roomId: number, roomNumber: string) => {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir o quarto "${roomNumber}"? Esta ação não pode ser desfeita.`
    );

    if (!confirmed) return;

    try {
      setDeletingRoomId(roomId);
      await api.delete(`/Quarto/${roomId}`);
      toast.success('Quarto excluído com sucesso!');
      fetchRooms();
    } catch (error) {
      console.error('Erro ao excluir quarto:', error);
      toast.error('Erro ao excluir quarto. Tente novamente.');
    } finally {
      setDeletingRoomId(null);
    }
  };

  const handleRoomAdded = () => {
    fetchRooms();
  };

  const handleRoomUpdated = () => {
    fetchRooms();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (hotels.length === 0) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center py-12">
          <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum hotel encontrado</h3>
          <p className="text-muted-foreground mb-4">
            Você precisa cadastrar um hotel primeiro para poder gerenciar quartos.
          </p>
          <Button onClick={() => window.location.href = '/dashboard-gerente/add-hotel'}>
            Cadastrar Hotel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Quartos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os quartos dos seus hotéis
          </p>
        </div>

        {/* Seleção de Hotel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Selecione um Hotel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotels.map((hotel) => (
                <Card
                  key={hotel.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${selectedHotel?.id === hotel.id
                    ? 'ring-2 ring-primary bg-primary/5'
                    : 'hover:bg-muted/50'
                    }`}
                  onClick={() => handleHotelSelect(hotel)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{hotel.nome}</h3>
                        <p className="text-sm text-muted-foreground">{hotel.tipo}</p>
                      </div>
                      <Badge variant={hotel.ativo ? "default" : "secondary"}>
                        {hotel.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gerenciamento de Quartos */}
        {selectedHotel && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Quartos do Hotel {selectedHotel.nome}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Gerencie os quartos disponíveis no seu hotel
                </p>
              </div>
              <Button onClick={handleAddRoom} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Quarto
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-32">
                <LoadingSpinner size="lg" />
              </div>
            ) : rooms.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Bed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Nenhum quarto cadastrado
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Você ainda não cadastrou nenhum quarto neste hotel. Comece adicionando o primeiro quarto.
                  </p>
                  <Button onClick={handleAddRoom} className="flex items-center gap-2 mx-auto">
                    <Plus className="h-4 w-4" />
                    Adicionar Primeiro Quarto
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bed className="h-5 w-5" />
                    Lista de Quartos ({rooms.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Quarto</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Capacidade</TableHead>
                        <TableHead>Características</TableHead>
                        <TableHead>Observações</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rooms.map((room) => (
                        <TableRow key={room.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {room.numero}
                              </div>
                              {room.andar > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {room.andar}º andar
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 font-semibold text-green-600">
                              <DollarSign className="h-4 w-4" />
                              {formatPrice(room.preco)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span>{room.limitePessoa} pessoa{room.limitePessoa > 1 ? 's' : ''}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {room.aceitaAnimal && (
                                <Badge variant="secondary" className="text-xs">
                                  Aceita pets
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs">
                              {room.observacao ? (
                                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                  {room.observacao}
                                </p>
                              ) : (
                                <span className="text-sm text-gray-400">-</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditRoom(room)}
                                className="flex items-center gap-1"
                              >
                                <Edit className="h-3 w-3" />
                                Editar
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                disabled={deletingRoomId === room.id}
                                onClick={() => handleDeleteRoom(room.id, room.numero)}
                                className="flex items-center gap-1"
                              >
                                <Trash2 className="h-3 w-3" />
                                {deletingRoomId === room.id ? 'Excluindo...' : 'Excluir'}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <AddRoomModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          hotelId={selectedHotel?.id || 0}
          onRoomAdded={handleRoomAdded}
        />

        <EditRoomModal
          room={selectedRoom}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedRoom(null);
          }}
          onRoomUpdated={handleRoomUpdated}
        />
      </div>
    </div>
  );
}
