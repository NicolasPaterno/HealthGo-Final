import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { IconStar } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

// Dados de exemplo para os hotéis
const hotels = [
  {
    id: "hotel-palace",
    name: "Hotel Palace",
    image:
      "https://via.placeholder.com/400x200/8B4513/FFFFFF?text=Hotel+Palace",
    rating: 4.7,
    rua: "Av. Central, 123",
    cidade: "Florianópolis",
  },
  {
    id: "pousada-beira-mar",
    name: "Pousada Beira Mar",
    image: "https://via.placeholder.com/400x200/1E90FF/FFFFFF?text=Beira+Mar",
    rating: 4.3,
    rua: "Rua das Gaivotas, 456",
    cidade: "Balneário Camboriú",
  },
  {
    id: "resort-montanhas",
    name: "Resort das Montanhas",
    image: "https://via.placeholder.com/400x200/228B22/FFFFFF?text=Resort",
    rating: 4.9,
    rua: "Estrada das Montanhas, 789",
    cidade: "Urubici",
  },
];

export default function HotelsListPage() {
  const navigate = useNavigate();
  return (
    <main className="flex-1 p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Meus Hotéis</h1>
        <p className="text-muted-foreground mt-1">
          Visualize todos os hotéis cadastrados da sua empresa.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <button
            key={hotel.id}
            type="button"
            className="group text-left focus:outline-none"
            onClick={() => navigate(`/dashboard/hotels/profile/${hotel.id}`)}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <Card className="flex flex-col overflow-hidden shadow-lg transition-transform duration-150 group-hover:scale-[1.03] group-hover:shadow-xl cursor-pointer">
              <div className="relative h-40 w-full">
                <img
                  src={hotel.image}
                  alt={`Imagem do ${hotel.name}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute left-0 bottom-0 p-4">
                  <CardTitle className="text-white drop-shadow-lg text-xl">
                    {hotel.name}
                  </CardTitle>
                </div>
                <div className="absolute right-0 top-0 p-3 flex items-center gap-1">
                  <IconStar className="h-5 w-5 text-yellow-400 fill-yellow-400 drop-shadow" />
                  <span className="text-white font-bold text-lg drop-shadow">
                    {hotel.rating}
                  </span>
                </div>
              </div>
              <CardContent className="flex flex-col gap-1 p-4 bg-background">
                <CardDescription className="text-base font-medium">
                  {hotel.rua}
                </CardDescription>
                <span className="text-sm text-muted-foreground">
                  {hotel.cidade}
                </span>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </main>
  );
}
