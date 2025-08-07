import React, { useEffect, useState } from 'react';
import api from '@/services/api';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import EditHotelModal from '@/components/edit-hotel-modal';
import HotelRoomsSection from '@/components/hotel-rooms-section';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Building, Plus, Bed, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Hotel {
  id: number;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  enderecoFoto: string;
  tipo: string;
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
}

const ViewHotelsPage = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingHotelId, setDeletingHotelId] = useState<number | null>(null);
  const [expandedHotels, setExpandedHotels] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await api.get('/Hotel/my-hotels');
      setHotels(response.data.data || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast.error('Erro ao carregar hotéis. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleEdit = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsModalOpen(true);
  };

  const handleDelete = async (hotelId: number, hotelName: string) => {
    const confirmed = window.confirm(`Tem certeza que deseja excluir o hotel "${hotelName}"? Esta ação não pode ser desfeita.`);

    if (!confirmed) return;

    try {
      setDeletingHotelId(hotelId);
      await api.delete(`/Hotel/${hotelId}`);
      toast.success('Hotel excluído com sucesso!');
      fetchHotels(); // Recarrega a lista após exclusão
    } catch (error) {
      console.error('Failed to delete hotel:', error);
      toast.error('Erro ao excluir hotel. Tente novamente.');
    } finally {
      setDeletingHotelId(null);
    }
  };

  const handleHotelUpdated = (updatedHotel: Hotel) => {
    setHotels(hotels.map(h => h.id === updatedHotel.id ? updatedHotel : h));
    toast.success('Hotel atualizado com sucesso!');
  };

  const toggleHotelExpansion = (hotelId: number) => {
    const newExpanded = new Set(expandedHotels);
    if (newExpanded.has(hotelId)) {
      newExpanded.delete(hotelId);
    } else {
      newExpanded.add(hotelId);
    }
    setExpandedHotels(newExpanded);
  };

  const formatCNPJ = (cnpj: string) => {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  };

  const formatPhone = (phone: string) => {
    return phone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
  };

  const getHotelTypeColor = (tipo: string) => {
    const colors = {
      'Hotel': 'bg-blue-100 text-blue-800',
      'Pousada': 'bg-green-100 text-green-800',
      'Hostel': 'bg-yellow-100 text-yellow-800',
      'Apartamento': 'bg-purple-100 text-purple-800',
      'Casa': 'bg-orange-100 text-orange-800'
    };
    return colors[tipo as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Meus Hotéis</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gerencie todos os hotéis cadastrados na sua conta
          </p>
        </div>
        <Button
          onClick={() => navigate('/dashboard-gerente/add-hotel')}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Cadastrar Novo Hotel
        </Button>
      </div>

      {hotels.length === 0 ? (
        <div className="text-center py-12">
          <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhum hotel cadastrado
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Você ainda não cadastrou nenhum hotel. Comece cadastrando seu primeiro hotel.
          </p>
          <Button
            onClick={() => navigate('/dashboard-gerente/add-hotel')}
            className="flex items-center gap-2 mx-auto"
          >
            <Plus className="h-4 w-4" />
            Cadastrar Primeiro Hotel
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={hotel.enderecoFoto} alt={hotel.nome} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                        {hotel.nome.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {hotel.nome}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getHotelTypeColor(hotel.tipo)}>
                          {hotel.tipo}
                        </Badge>
                        <Badge variant={hotel.ativo ? "default" : "secondary"}>
                          {hotel.ativo ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {hotel.rua}, {hotel.numeroEndereco} - {hotel.bairro}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleHotelExpansion(hotel.id)}
                      className="flex items-center gap-2"
                    >
                      <Bed className="h-4 w-4" />
                      Gerenciar Quartos
                      {expandedHotels.has(hotel.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(hotel)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-3 w-3" />
                      Editar Hotel
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={deletingHotelId === hotel.id}
                      onClick={() => handleDelete(hotel.id, hotel.nome)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      {deletingHotelId === hotel.id ? 'Excluindo...' : 'Excluir'}
                    </Button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <span className="font-medium">CNPJ:</span> {formatCNPJ(hotel.cnpj)}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {hotel.email}
                  </div>
                  <div>
                    <span className="font-medium">Telefone:</span> {formatPhone(hotel.telefone)}
                  </div>
                  <div>
                    <span className="font-medium">Site:</span> {hotel.site || 'Não informado'}
                  </div>
                </div>
              </div>

              {expandedHotels.has(hotel.id) && (
                <div className="border-t border-gray-200 dark:border-gray-700">
                  <div className="p-6">
                    <HotelRoomsSection
                      hotelId={hotel.id}
                      hotelName={hotel.nome}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <EditHotelModal
        hotel={selectedHotel}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onHotelUpdated={handleHotelUpdated}
      />
    </div>
  );
};

export default ViewHotelsPage;