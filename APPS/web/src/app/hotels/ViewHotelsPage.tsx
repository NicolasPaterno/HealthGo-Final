import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import EditHotelModal from '@/components/edit-hotel-modal';

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

  const fetchHotels = async () => {
    try {
      const response = await api.get('/Hotel/my-hotels');
      setHotels(response.data.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast.error('Failed to fetch hotels.');
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

  const handleDelete = async (hotelId: number) => {
    try {
      await api.delete(`/Hotel/${hotelId}`);
      toast.success('Hotel deleted successfully!');
      fetchHotels(); // Refetch hotels after deletion
    } catch (error) {
      console.error('Failed to delete hotel:', error);
      toast.error('Failed to delete hotel.');
    }
  };

  const handleHotelUpdated = (updatedHotel: Hotel) => {
    setHotels(hotels.map(h => h.id === updatedHotel.id ? updatedHotel : h));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Meus Hotéis</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Foto</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hotels.map((hotel) => (
            <TableRow key={hotel.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={hotel.enderecoFoto} alt={hotel.nome} />
                  <AvatarFallback>{hotel.nome.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{hotel.nome}</TableCell>
              <TableCell>{hotel.cnpj}</TableCell>
              <TableCell>{hotel.email}</TableCell>
              <TableCell>{hotel.telefone}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(hotel)}>Editar</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(hotel.id)}>Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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