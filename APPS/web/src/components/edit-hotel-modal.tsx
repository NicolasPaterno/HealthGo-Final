import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import api from '@/services/api';

interface Hotel {
  id: number;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  enderecoFoto: string;
  // Add all other hotel properties to be edited
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

interface EditHotelModalProps {
  hotel: Hotel | null;
  isOpen: boolean;
  onClose: () => void;
  onHotelUpdated: (updatedHotel: Hotel) => void;
}

const EditHotelModal: React.FC<EditHotelModalProps> = ({ hotel, isOpen, onClose, onHotelUpdated }) => {
  const [formData, setFormData] = useState<Hotel | null>(hotel);

  useEffect(() => {
    setFormData(hotel);
  }, [hotel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      await api.put(`/Hotel`, formData);
      toast.success('Hotel updated successfully!');
      onHotelUpdated(formData);
      onClose();
    } catch (error) {
      console.error('Failed to update hotel:', error);
      toast.error('Failed to update hotel.');
    }
  };

  if (!isOpen || !formData) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Hotel</DialogTitle>
          <DialogDescription>
            Make changes to your hotel here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nome" className="text-right">
              Name
            </Label>
            <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cnpj" className="text-right">
              CNPJ
            </Label>
            <Input id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleChange} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" name="email" value={formData.email} onChange={handleChange} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="telefone" className="text-right">
              Telefone
            </Label>
            <Input id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="enderecoFoto" className="text-right">
              Photo URL
            </Label>
            <Input id="enderecoFoto" name="enderecoFoto" value={formData.enderecoFoto} onChange={handleChange} className="col-span-3" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditHotelModal;