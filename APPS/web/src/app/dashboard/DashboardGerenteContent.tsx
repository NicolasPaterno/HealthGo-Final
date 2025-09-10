import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Bed,
  Users,
  DollarSign,
  TrendingUp,
  MapPin,
  Star,
  Plus,
  Eye
} from "lucide-react";
import { toast } from "sonner";
import api from "@/services/api";
import { LoadingSpinner } from "@/components/loading-spinner";
import { OccupancyChart } from "@/components/occupancy-chart";
import { HotelSkeleton } from "@/components/hotel-skeleton";

interface Hotel {
  id: number;
  nome: string;
  tipo: string;
  ativo: boolean;
  endereco?: string;
  cidade?: string;
  estado?: string;
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


interface DashboardStats {
  totalHotels: number;
  totalRooms: number;
  totalRevenue: number;
  occupancyRate: number;
  averageRoomPrice: number;
}


export default function DashboardGerenteContent() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalHotels: 0,
    totalRooms: 0,
    totalRevenue: 0,
    occupancyRate: 0,
    averageRoomPrice: 0
  });
  const [loading, setLoading] = useState(true);
  const [hotelsLoading, setHotelsLoading] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const fetchHotels = async () => {
    try {
      setHotelsLoading(true);
      const response = await api.get('/Hotel/my-hotels');
      const hotelsData = response.data.data || [];
      setHotels(hotelsData);

      if (hotelsData.length > 0) {
        setSelectedHotel(hotelsData[0]);
      }
    } catch (error) {
      console.error('Erro ao carregar hotéis:', error);
      toast.error('Erro ao carregar hotéis');
    } finally {
      setHotelsLoading(false);
    }
  };

  const fetchRooms = async () => {
    if (!selectedHotel) return;

    try {
      const response = await api.get(`/Quarto/hotel/${selectedHotel.id}`);
      setRooms(response.data.data || []);
    } catch (error) {
      console.error('Erro ao carregar quartos:', error);
      toast.error('Erro ao carregar quartos');
    }
  };



  const calculateStats = () => {
    const totalRevenue = 0; // Removido cálculo baseado em ordens de serviço

    const averageRoomPrice = rooms.length > 0
      ? rooms.reduce((sum, room) => sum + room.preco, 0) / rooms.length
      : 0;

    // Simulação de taxa de ocupação (em um cenário real, viria de dados de reservas)
    const occupancyRate = Math.min(85, Math.max(20, Math.random() * 100));

    setStats({
      totalHotels: hotels.length,
      totalRooms: rooms.length,
      totalRevenue,
      occupancyRate: Math.round(occupancyRate),
      averageRoomPrice: Math.round(averageRoomPrice)
    });
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchHotels();
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (selectedHotel) {
      fetchRooms();
    }
  }, [selectedHotel]);

  useEffect(() => {
    calculateStats();
  }, [hotels, rooms, stats.occupancyRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ativo':
      case 'confirmado':
        return 'bg-green-100 text-green-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard do Gerente
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Visão geral dos seus hotéis e operações
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.href = '/dashboard-gerente/add-hotel'}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Hotel
          </Button>
          <Button onClick={() => window.location.href = '/dashboard-gerente/quartos'}>
            <Eye className="h-4 w-4 mr-2" />
            Gerenciar Quartos
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Hotéis</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHotels}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalHotels > 0 ? 'Hotéis cadastrados' : 'Nenhum hotel cadastrado'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Quartos</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRooms}</div>
            <p className="text-xs text-muted-foreground">
              Quartos disponíveis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.occupancyRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Preço Médio</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.averageRoomPrice)}</div>
            <p className="text-xs text-muted-foreground">
              Por quarto por noite
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacidade Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rooms.reduce((sum, room) => sum + room.limitePessoa, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Pessoas simultâneas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <OccupancyChart
        occupancyRate={stats.occupancyRate}
        previousRate={Math.max(0, stats.occupancyRate - 5)}
      />

      {/* Hotels Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Meus Hotéis
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hotelsLoading ? (
            <HotelSkeleton />
          ) : hotels.length === 0 ? (
            <div className="text-center py-8">
              <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum hotel cadastrado</h3>
              <p className="text-muted-foreground mb-4">
                Comece cadastrando seu primeiro hotel
              </p>
              <Button onClick={() => window.location.href = '/dashboard-gerente/add-hotel'}>
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar Hotel
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${selectedHotel?.id === hotel.id
                    ? 'ring-2 ring-primary bg-primary/5'
                    : 'hover:bg-muted/50'
                    }`}
                  onClick={() => setSelectedHotel(hotel)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{hotel.nome}</h3>
                      <p className="text-sm text-muted-foreground">{hotel.tipo}</p>
                      {hotel.cidade && hotel.estado && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {hotel.cidade}, {hotel.estado}
                        </p>
                      )}
                    </div>
                    <Badge variant={hotel.ativo ? "default" : "secondary"}>
                      {hotel.ativo ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2"
              onClick={() => window.location.href = '/dashboard-gerente/quartos'}
            >
              <Bed className="h-6 w-6" />
              <span>Gerenciar Quartos</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2"
              onClick={() => window.location.href = '/dashboard-gerente/add-hotel'}
            >
              <Building className="h-6 w-6" />
              <span>Adicionar Hotel</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 