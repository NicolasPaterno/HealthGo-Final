import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import api from '@/services/api';

interface AddRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotelId: number;
  onRoomAdded: () => void;
}

interface RoomFormData {
  numero: string;
  andar: number;
  aceitaAnimal: boolean;
  observacao: string;
  preco: number;
  limitePessoa: number;
}

export default function AddRoomModal({ isOpen, onClose, hotelId, onRoomAdded }: AddRoomModalProps) {
  const [formData, setFormData] = useState<RoomFormData>({
    numero: '',
    andar: 1,
    aceitaAnimal: false,
    observacao: '',
    preco: 0,
    limitePessoa: 1
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.numero.trim()) {
      toast.error('Número do quarto é obrigatório');
      return;
    }

    if (formData.preco <= 0) {
      toast.error('Preço deve ser maior que zero');
      return;
    }

    if (formData.limitePessoa <= 0) {
      toast.error('Limite de pessoas deve ser maior que zero');
      return;
    }

    try {
      setLoading(true);
      await api.post('/Quarto', {
        ...formData,
        hotel: hotelId
      });
      
      toast.success('Quarto adicionado com sucesso!');
      setFormData({
        numero: '',
        andar: 1,
        aceitaAnimal: false,
        observacao: '',
        preco: 0,
        limitePessoa: 1
      });
      onRoomAdded();
      onClose();
    } catch (error) {
      console.error('Erro ao adicionar quarto:', error);
      toast.error('Erro ao adicionar quarto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof RoomFormData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Quarto</DialogTitle>
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
              {loading ? 'Adicionando...' : 'Adicionar Quarto'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
