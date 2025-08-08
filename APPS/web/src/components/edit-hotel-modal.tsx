import React, { useState, useEffect, useCallback } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import api from '@/services/api';
import { LoadingSpinner } from '@/components/loading-spinner';
import type { Hotel } from '@/types/hotel';
import axios from 'axios';

interface EditHotelModalProps {
  hotel: Hotel | null;
  isOpen: boolean;
  onClose: () => void;
  onHotelUpdated: (updatedHotel: Hotel) => void;
}

const EditHotelModal: React.FC<EditHotelModalProps> = ({ hotel, isOpen, onClose, onHotelUpdated }) => {
  const [formData, setFormData] = useState<Hotel | null>(hotel);
  const [loading, setLoading] = useState(false);
  const [isCepLoading, setIsCepLoading] = useState(false);

  useEffect(() => {
    setFormData(hotel);
  }, [hotel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (formData) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    if (formData) {
      setFormData({ ...formData, ativo: checked });
    }
  };

  const handleCepBlur = useCallback(async (event: React.FocusEvent<HTMLInputElement>) => {
    if (!formData) return;

    const currentCep = event.target.value.replace(/\D/g, "");

    if (currentCep.length !== 8) {
      return;
    }

    setIsCepLoading(true);
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${currentCep}/json/`);

      if (data.erro) {
        toast.error("CEP não encontrado.");
        return;
      }

      setFormData({
        ...formData,
        rua: data.logradouro,
        bairro: data.bairro,
        cep: event.target.value
      });

    } catch (error) {
      toast.error("Erro ao buscar CEP.");
      console.error("CEP fetch error:", error);
    } finally {
      setIsCepLoading(false);
    }
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setLoading(true);
    try {
      const response = await api.put('/Hotel', formData);
      if (response.status === 200) {
        onHotelUpdated(formData);
        onClose();
        toast.success('Hotel atualizado com sucesso!');
      }
    } catch (error) {
      console.error('Failed to update hotel:', error);
      toast.error('Erro ao atualizar hotel. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!hotel) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Hotel</DialogTitle>
          <DialogDescription>
            Atualize as informações do hotel {hotel.nome}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Hotel</Label>
              <Input
                id="nome"
                name="nome"
                value={formData?.nome || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                name="cnpj"
                value={formData?.cnpj || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo</Label>
              <Select value={formData?.tipo || ''} onValueChange={(value) => handleSelectChange('tipo', value)}>
                <SelectTrigger>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData?.email || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                name="telefone"
                value={formData?.telefone || ''}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="site">Site</Label>
              <Input
                id="site"
                name="site"
                value={formData?.site || ''}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                name="cep"
                value={formData?.cep || ''}
                onChange={handleChange}
                onBlur={handleCepBlur}
                disabled={isCepLoading}
              />
              {isCepLoading && (
                <div className="text-sm text-muted-foreground">
                  Buscando endereço...
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rua">Rua</Label>
              <Input
                id="rua"
                name="rua"
                value={formData?.rua || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numeroEndereco">Número</Label>
              <Input
                id="numeroEndereco"
                name="numeroEndereco"
                value={formData?.numeroEndereco || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bairro">Bairro</Label>
              <Input
                id="bairro"
                name="bairro"
                value={formData?.bairro || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="acessibilidade">Acessibilidade</Label>
              <Input
                id="acessibilidade"
                name="acessibilidade"
                value={formData?.acessibilidade || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              name="descricao"
              value={formData?.descricao || ''}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="ativo"
              checked={formData?.ativo || false}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="ativo">Hotel Ativo</Label>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  Atualizando...
                </div>
              ) : (
                'Atualizar Hotel'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditHotelModal;