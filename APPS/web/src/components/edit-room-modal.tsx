import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import api from '@/services/api';

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

interface EditRoomModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onRoomUpdated: () => void;
}

interface RoomFormData {
  numero: string;
  andar: number;
  aceitaAnimal: boolean;
  observacao: string;
  preco: number;
  limitePessoa: number;
}

export default function EditRoomModal({ room, isOpen, onClose, onRoomUpdated }: EditRoomModalProps) {
  const [formData, setFormData] = useState<RoomFormData>({
    numero: '',
    andar: 1,
    aceitaAnimal: false,
    observacao: '',
    preco: 0,
    limitePessoa: 1
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (room) {
      console.log('Room recebido no modal:', room);
      console.log('Hotel_Id do room:', room.Hotel_Id);
      setFormData({
        numero: room.numero,
        andar: room.andar,
        aceitaAnimal: room.aceitaAnimal,
        observacao: room.observacao || '',
        preco: room.preco,
        limitePessoa: room.limitePessoa
      });
    }
  }, [room]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!room) return;

    // Validações mais robustas
    if (!formData.numero || !formData.numero.trim()) {
      toast.error('Número do quarto é obrigatório');
      return;
    }

    if (!formData.preco || formData.preco <= 0) {
      toast.error('Preço deve ser maior que zero');
      return;
    }

    if (!formData.limitePessoa || formData.limitePessoa <= 0) {
      toast.error('Limite de pessoas deve ser maior que zero');
      return;
    }

    // Verificar se o Hotel_Id existe e é válido
    const hotelId = room.Hotel_Id || (room as any).hotel_Id || (room as any).hotelId;
    if (!hotelId || hotelId <= 0) {
      console.error('Hotel_Id inválido:', hotelId, 'Room completo:', room);
      toast.error('ID do hotel é inválido');
      return;
    }

    try {
      setLoading(true);

      // Preparar os dados para envio com tipos corretos
      const updateData = {
        Id: parseInt(room.id.toString()),
        Numero: formData.numero.trim(),
        Andar: parseInt(formData.andar.toString()),
        AceitaAnimal: Boolean(formData.aceitaAnimal),
        Observacao: formData.observacao ? formData.observacao.trim() : '',
        Preco: parseFloat(formData.preco.toString()),
        LimitePessoa: parseInt(formData.limitePessoa.toString()),
        Hotel_Id: parseInt(hotelId.toString())
      };

      console.log('Enviando dados para atualização:', updateData);

      const response = await api.put('/Quarto', updateData);

      // Verificar se a resposta contém uma mensagem de erro
      if (response.data && response.data.message) {
        if (response.data.message.includes('sucesso')) {
          toast.success('Quarto atualizado com sucesso!');
          onRoomUpdated();
          onClose();
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.success('Quarto atualizado com sucesso!');
        onRoomUpdated();
        onClose();
      }
    } catch (error: any) {
      console.error('Erro ao atualizar quarto:', error);

      // Tratar diferentes tipos de erro
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 400) {
        toast.error('Dados inválidos. Verifique os campos preenchidos.');
      } else if (error.response?.status === 404) {
        toast.error('Quarto não encontrado.');
      } else if (error.response?.status === 500) {
        toast.error('Erro interno do servidor. Tente novamente mais tarde.');
      } else {
        toast.error('Erro ao atualizar quarto. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof RoomFormData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Log para debug
    console.log(`Campo ${field} alterado para:`, value);
  };

  if (!room) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Quarto {room.numero}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numero">Número do Quarto *</Label>
              <Input
                id="numero"
                value={formData.numero}
                onChange={(e) => handleInputChange('numero', e.target.value)}
                placeholder="Ex: 101"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="andar">Andar</Label>
              <Input
                id="andar"
                type="number"
                min="0"
                value={formData.andar}
                onChange={(e) => handleInputChange('andar', parseInt(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preco">Preço por Noite (R$) *</Label>
              <Input
                id="preco"
                type="number"
                min="0"
                step="0.01"
                value={formData.preco}
                onChange={(e) => handleInputChange('preco', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="limitePessoa">Limite de Pessoas *</Label>
              <Input
                id="limitePessoa"
                type="number"
                min="1"
                value={formData.limitePessoa}
                onChange={(e) => handleInputChange('limitePessoa', parseInt(e.target.value) || 1)}
                placeholder="1"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacao">Observações</Label>
            <Textarea
              id="observacao"
              value={formData.observacao}
              onChange={(e) => handleInputChange('observacao', e.target.value)}
              placeholder="Informações adicionais sobre o quarto..."
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="aceitaAnimal"
              checked={formData.aceitaAnimal}
              onCheckedChange={(checked) => handleInputChange('aceitaAnimal', checked)}
            />
            <Label htmlFor="aceitaAnimal">Aceita animais de estimação</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
