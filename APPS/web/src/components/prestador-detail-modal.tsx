import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Calendar as CalendarIcon
} from "lucide-react";
import api from "@/services/api";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

interface PrestadorServico {
  nomePessoa: string;
  email: string;
  cidade: string;
  estado: string;
  telefone: string;
  role: string;
  rua: string;
  numeroEndereco: string;
  bairro: string;
  enderecoFoto: string;
  precoHora: number;
  observacao: string;
  especialidade: string;
}

interface AgendaItem {
  DataInicio: string;
  DataFim: string;
  Funcao: string;
  NomeCliente: string;
  EmailCliente: string;
  TelefoneCliente: string;
  PrecoTotal: number;
}

interface PrestadorDetailModalProps {
  prestador: PrestadorServico | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PrestadorDetailModal({ prestador, isOpen, onClose }: PrestadorDetailModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
  const [isLoadingAgenda, setIsLoadingAgenda] = useState(false);
  const [prestadorId, setPrestadorId] = useState<number | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<Date[]>([]);

  const { addToCart, openCart } = useCart();

  useEffect(() => {
    if (prestador && isOpen) {
      fetchPrestadorId();
    }
  }, [prestador, isOpen]);

  useEffect(() => {
    if (prestadorId) {
      fetchAgenda();
    }
  }, [prestadorId]);

  const fetchPrestadorId = async () => {
    if (!prestador) return;
    
    console.log("Buscando ID do prestador para:", prestador);
    try {
      const response = await api.get(`/PrestadorServico/by-email-and-telefone?email=${encodeURIComponent(prestador.email)}&telefone=${encodeURIComponent(prestador.telefone)}`);
      const prestadorId = response.data?.id || response.data;
      
      if (prestadorId) {
        setPrestadorId(prestadorId);
      } else {
        toast.error("ID do prestador não encontrado");
      }
    } catch (error: any) {
      console.error("Erro ao buscar ID do prestador:", error);
      toast.error("Erro ao carregar informações do prestador");
    }
  };

    const fetchAgenda = async () => {
    if (!prestadorId) return;
    console.log("Buscando agenda para prestadorId:", prestadorId);
    
    try {
      setIsLoadingAgenda(true);
      const response = await api.get(`/PrestadorServico/agenda/${prestadorId}`);
      
      const raw = Array.isArray(response.data) 
        ? response.data 
        : Array.isArray(response.data?.data) 
        ? response.data.data 
        : Array.isArray(response.data?.result) 
        ? response.data.result 
        : [];
      
      const normalized: AgendaItem[] = raw.map((it: any) => ({
        DataInicio: it.dataInicio ?? it.DataInicio ?? it.dat-inicio ?? it.datainicio,
        DataFim: it.dataFim ?? it.DataFim ?? it.data_fim ?? it.datafim,
        Funcao: it.funcao ?? it.Funcao ?? it.funcaoNome ?? it.role,
        NomeCliente: it.nomeCliente ?? it.NomeCliente ?? it.clienteNome ?? it.nome,
        EmailCliente: it.emailCliente ?? it.EmailCliente ?? it.email,
        TelefoneCliente: it.telefoneCliente ?? it.TelefoneCliente ?? it.telefone,
        PrecoTotal: it.precoTotal ?? it.PrecoTotal ?? it.total ?? it.valor ?? 0,
      })).filter((it: AgendaItem) => Boolean(it.DataInicio));
      
      setAgendaItems(normalized);
    } catch (error: any) {
      console.error("Erro ao carregar agenda:", error);
      toast.error("Erro ao carregar agenda do prestador");
    } finally {
      setIsLoadingAgenda(false);
    }
  };

  const serviceDays = agendaItems.map(item => new Date(item.DataInicio));

  const getAvailableTimeSlots = (date: Date) => {
    const dayStart = new Date(date);
    dayStart.setHours(8, 0, 0, 0);
    
    const dayEnd = new Date(date);
    dayEnd.setHours(18, 0, 0, 0);
    
    const slots = [];
    const current = new Date(dayStart);
    
    while (current < dayEnd) {
      slots.push(new Date(current));
      current.setHours(current.getHours() + 1);
    }
    
    return slots;
  };

  const getBookedTimeSlots = (date: Date) => {
    return agendaItems.filter(item => {
      const itemDate = new Date(item.DataInicio);
      return (
        itemDate.getDate() === date.getDate() &&
        itemDate.getMonth() === date.getMonth() &&
        itemDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (!prestador) return null;

  const availableSlots = selectedDate ? getAvailableTimeSlots(selectedDate) : [];
  const bookedSlots = selectedDate ? getBookedTimeSlots(selectedDate) : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl md:min-w-[1100px] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações do Prestador
          </DialogTitle>
          <DialogDescription>
            Visualize as informações e agenda de disponibilidade do prestador de serviço.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
          {/* Informações do Prestador */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {prestador.enderecoFoto && prestador.enderecoFoto !== "default.jpg" ? (
                      <img
                        src={prestador.enderecoFoto}
                        alt={prestador.nomePessoa}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-10 w-10 text-primary" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-bold break-words">{prestador.nomePessoa}</h3>
                    <Badge variant="outline" className="mt-2">{prestador.especialidade}</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm break-all">{prestador.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm">{prestador.telefone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <div>{prestador.rua}, {prestador.numeroEndereco}</div>
                      <div>{prestador.bairro}</div>
                      <div>{prestador.cidade}, {prestador.estado}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-lg font-semibold text-primary">
                      {formatCurrency(prestador.precoHora)}/hora
                    </span>
                  </div>
                </div>
                
                {prestador.observacao && (
                  <div>
                    <h4 className="font-semibold mb-2">Sobre o prestador:</h4>
                    <p className="text-sm text-muted-foreground">{prestador.observacao}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Agenda */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Agenda de Disponibilidade
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full"
                  modifiers={{ hasService: serviceDays }}
                  modifiersClassNames={{ hasService: "bg-amber-100/50 dark:bg-amber-900/30" }}
                  classNames={{
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day: "font-normal aria-selected:rounded-md",
                    day_range_start: "rdp-day_range_start",
                    day_range_end: "rdp-day_range_end",
                    day_range_middle: "rdp-day_range_middle"
                  }}
                />
              </CardContent>
            </Card>

            {selectedDate && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Horários para {selectedDate.toLocaleDateString("pt-BR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long"
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    {isLoadingAgenda ? (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        Carregando horários...
                      </p>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-3 text-green-600">
                            Horários Disponíveis
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {availableSlots.map((slot, index) => {
                              const isBooked = bookedSlots.some(booked => {
                                const bookedStart = new Date(booked.DataInicio);
                                const bookedEnd = new Date(booked.DataFim);
                                return slot >= bookedStart && slot < bookedEnd;
                              });
                              
                              const isSelected = selectedTimeSlots.some(selectedSlot => 
                                selectedSlot.getTime() === slot.getTime()
                              );

                              const handleSlotClick = () => {
                                setSelectedTimeSlots(prevSelectedSlots => {
                                  if (isSelected) {
                                    return prevSelectedSlots.filter(
                                      selectedSlot => selectedSlot.getTime() !== slot.getTime()
                                    );
                                  } else {
                                    return [...prevSelectedSlots, slot];
                                  }
                                });
                              };

                              return (
                                <Button
                                  key={index}
                                  variant={isBooked ? "secondary" : (isSelected ? "default" : "outline")}
                                  size="sm"
                                  disabled={isBooked}
                                  onClick={handleSlotClick}
                                  className="text-sm h-8"
                                >
                                  {formatTime(slot)}
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                        
                        {selectedTimeSlots.length > 0 && (
                          <div className="mt-4 text-right">
                            <Button onClick={() => {
                              selectedTimeSlots.sort((a, b) => a.getTime() - b.getTime());
                              const firstSlot = selectedTimeSlots[0];
                              const lastSlot = selectedTimeSlots[selectedTimeSlots.length - 1];
                              
                              const itemToAdd = {
                                id: `${prestadorId}-${firstSlot.getTime()}-${prestador?.especialidade}`,
                                name: `Consulta com ${prestador?.nomePessoa} (${prestador?.especialidade})`,
                                price: prestador?.precoHora ? prestador.precoHora * selectedTimeSlots.length : 0,
                                image: prestador?.enderecoFoto,
                                prestadorId: prestadorId!,
                                especialidade: prestador?.especialidade || "",
                                dataInicio: firstSlot,
                                dataFim: new Date(lastSlot.setHours(lastSlot.getHours() + 1)),
                              };
                              
                              addToCart(itemToAdd);
                              openCart();
                              onClose(); 
                            }}>
                              Adicionar ao carrinho
                            </Button>
                          </div>
                        )}
                        
                        {bookedSlots.length > 0 && (
                          <div>
                            <Separator className="my-4" />
                            <h4 className="font-semibold text-sm mb-3 text-red-600">
                              Horários Ocupados
                            </h4>
                            <div className="space-y-2">
                              {bookedSlots.map((slot, index) => (
                                <div key={index} className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                                  {formatTime(new Date(slot.DataInicio))} - {formatTime(new Date(slot.DataFim))}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
