import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconArrowLeft, IconBuilding, IconCalendar, IconMapPin } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

// Dados mockados de reservas
const bookingsMock = [
  {
    id: "1",
    hotelName: "Hotel Palace",
    city: "São Paulo",
    checkIn: "2024-07-01",
    checkOut: "2024-07-05",
    status: "Confirmada",
  },
  {
    id: "2",
    hotelName: "Pousada Beira Mar",
    city: "Rio de Janeiro",
    checkIn: "2024-08-10",
    checkOut: "2024-08-15",
    status: "Pendente",
  },
];

export default function MyHotelBookings() {
  const navigate = useNavigate();

  return (
    <main className="flex-1 p-4 md:p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <IconBuilding className="size-8 text-primary" />
            <CardTitle className="text-2xl">Minhas Reservas de Hotéis</CardTitle>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard/hotels")}>
            <IconArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos Hotéis
          </Button>
        </CardHeader>
        <CardContent>
          {bookingsMock.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookingsMock.map((booking) => (
                <Card key={booking.id} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{booking.hotelName}</CardTitle>
                      <Badge 
                        variant={booking.status === "Confirmada" ? "default" : "secondary"}
                        className="capitalize"
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <IconMapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Cidade:</span>
                      <span className="font-medium">{booking.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <IconCalendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Check-in:</span>
                      <span className="font-medium">{booking.checkIn}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <IconCalendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Check-out:</span>
                      <span className="font-medium">{booking.checkOut}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <IconBuilding className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma reserva encontrada</h3>
              <p className="text-muted-foreground mb-4">
                Você ainda não possui reservas de hotéis.
              </p>
              <Button onClick={() => navigate("/dashboard/hotels")}>
                <IconBuilding className="mr-2 h-4 w-4" />
                Explorar Hotéis
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}