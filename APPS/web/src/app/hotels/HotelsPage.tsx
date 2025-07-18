import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { IconFilter, IconShoppingCart, IconBuilding, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Dados mockados de hotéis
const hotelsMock = [
  {
    id: "hotel-palace",
    name: "Hotel Palace",
    description: "Um hotel de luxo no coração da cidade com vista panorâmica.",
    price: 550.0,
    city: "São Paulo",
    image: "https://via.placeholder.com/300x200/8B4513/FFFFFF?text=Hotel+Palace",
    bedType: "Casal",
    capacity: 2,
    availableFrom: "2024-07-01",
    availableTo: "2024-07-31",
  },
  {
    id: "pousada-beira-mar",
    name: "Pousada Beira Mar",
    description: "Aconchegante e com acesso direto à praia. Ideal para famílias.",
    price: 320.0,
    city: "Rio de Janeiro",
    image: "https://via.placeholder.com/300x200/1E90FF/FFFFFF?text=Beira+Mar",
    bedType: "Solteiro",
    capacity: 4,
    availableFrom: "2024-08-01",
    availableTo: "2024-08-31",
  },
  {
    id: "resort-montanhas",
    name: "Resort das Montanhas",
    description: "Refúgio tranquilo com spa, piscinas e atividades ao ar livre.",
    price: 780.0,
    city: "Belo Horizonte",
    image: "https://via.placeholder.com/300x200/228B22/FFFFFF?text=Resort",
    bedType: "Queen",
    capacity: 3,
    availableFrom: "2024-09-01",
    availableTo: "2024-09-30",
  },
];

// Gerar lista de cidades únicas
const citiesMock = Array.from(new Set(hotelsMock.map((h) => h.city)));

export default function HotelsPage() {
  const [cityFilter, setCityFilter] = useState<string>("Todas");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [bedType, setBedType] = useState<string>("Todas");
  const [capacity, setCapacity] = useState(1);
  const [date, setDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<typeof hotelsMock[0] | null>(null);
  const [reservationData, setReservationData] = useState({
    checkIn: "",
    checkOut: "",
    rooms: 1,
    capacity: 1,
    bedType: "Casal"
  });
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleReserve = (hotel: typeof hotelsMock[0]) => {
    setSelectedHotel(hotel);
    setReservationData({
      checkIn: "",
      checkOut: "",
      rooms: 1,
      capacity: 1,
      bedType: hotel.bedType
    });
    setShowReservationModal(true);
  };

  const handleConfirmReservation = () => {
    if (!selectedHotel) return;
    
    toast.success("Reserva feita!", {
      description: `Sua reserva para ${selectedHotel.name} foi confirmada com sucesso!`,
      duration: 4000,
    });
    
    setShowReservationModal(false);
    setSelectedHotel(null);
  };

  const handleAddToCart = (hotel: typeof hotelsMock[0]) => {
    addToCart({
      id: hotel.id,
      name: hotel.name,
      price: hotel.price,
      image: hotel.image,
    });
  };

  const filteredHotels = hotelsMock.filter((hotel) => {
    const cityOk = cityFilter === "Todas" || hotel.city === cityFilter;
    const priceOk = hotel.price >= minPrice && hotel.price <= maxPrice;
    const bedOk = bedType === "Todas" || hotel.bedType === bedType;
    const capacityOk = hotel.capacity >= capacity;
    const dateOk = !date || (date >= hotel.availableFrom && date <= hotel.availableTo);
    return cityOk && priceOk && bedOk && capacityOk && dateOk;
  });

  return (
    <main className="flex-1 p-4 md:p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <IconBuilding className="size-8 text-primary" />
            <CardTitle className="text-2xl">Catálogo de Hotéis</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <IconFilter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
            <Button variant="outline" onClick={() => navigate("/dashboard/hotels/bookings")}>
              Minhas Reservas
            </Button>
          </div>
        </CardHeader>
        
        {showFilters && (
          <CardContent className="border-t mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Select value={cityFilter} onValueChange={setCityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todas">Todas as cidades</SelectItem>
                    {citiesMock.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Faixa de Preço</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Mín"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="Máx"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bedType">Tipo de Cama</Label>
                <Select value={bedType} onValueChange={setBedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de cama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todas">Todos os tipos</SelectItem>
                    <SelectItem value="Solteiro">Solteiro</SelectItem>
                    <SelectItem value="Casal">Casal</SelectItem>
                    <SelectItem value="Queen">Queen</SelectItem>
                    <SelectItem value="Futon">Futon</SelectItem>
                    <SelectItem value="Beliche">Beliche</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Quantidade de Pessoas</Label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Data de Disponibilidade</Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        )}

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <Card key={hotel.id} className="flex flex-col">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{hotel.name}</CardTitle>
                    <CardDescription>{hotel.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Cidade:</span>
                      <span className="font-medium">{hotel.city}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tipo de cama:</span>
                      <span className="font-medium">{hotel.bedType}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Capacidade:</span>
                      <span className="font-medium">{hotel.capacity} pessoa(s)</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Disponível:</span>
                      <span className="font-medium text-xs">
                        {hotel.availableFrom} até {hotel.availableTo}
                      </span>
                    </div>
                    <div className="pt-2">
                      <p className="text-2xl font-bold text-primary">
                        R$ {hotel.price.toFixed(2)}
                        <span className="text-sm font-normal text-muted-foreground">/noite</span>
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => handleReserve(hotel)}>
                      Reservar
                    </Button>
                    <Button className="flex-1" onClick={() => handleAddToCart(hotel)}>
                      <IconShoppingCart className="mr-2 h-4 w-4" />
                      Carrinho
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <IconBuilding className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum hotel encontrado</h3>
                <p className="text-muted-foreground">
                  Tente ajustar os filtros para encontrar mais opções.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Reserva */}
      <Sheet open={showReservationModal} onOpenChange={setShowReservationModal}>
        <SheetContent className="sm:max-w-[425px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <IconBuilding className="h-5 w-5" />
              Reservar {selectedHotel?.name}
            </SheetTitle>
            <SheetDescription>
              Preencha os detalhes da sua reserva
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="checkIn">Data de Chegada</Label>
                <Input
                  id="checkIn"
                  type="date"
                  value={reservationData.checkIn}
                  onChange={(e) => setReservationData({
                    ...reservationData,
                    checkIn: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkOut">Data de Saída</Label>
                <Input
                  id="checkOut"
                  type="date"
                  value={reservationData.checkOut}
                  onChange={(e) => setReservationData({
                    ...reservationData,
                    checkOut: e.target.value
                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rooms">Quantidade de Quartos</Label>
                <Input
                  id="rooms"
                  type="number"
                  min={1}
                  max={10}
                  value={reservationData.rooms}
                  onChange={(e) => setReservationData({
                    ...reservationData,
                    rooms: Number(e.target.value)
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacidade</Label>
                <Input
                  id="capacity"
                  type="number"
                  min={1}
                  max={10}
                  value={reservationData.capacity}
                  onChange={(e) => setReservationData({
                    ...reservationData,
                    capacity: Number(e.target.value)
                  })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bedType">Tipo de Cama</Label>
              <Select 
                value={reservationData.bedType} 
                onValueChange={(value) => setReservationData({
                  ...reservationData,
                  bedType: value
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de cama" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Solteiro">Solteiro</SelectItem>
                  <SelectItem value="Casal">Casal</SelectItem>
                  <SelectItem value="Queen">Queen</SelectItem>
                  <SelectItem value="Futon">Futon</SelectItem>
                  <SelectItem value="Beliche">Beliche</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setShowReservationModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmReservation}>
              Confirmar Reserva
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </main>
  );
}