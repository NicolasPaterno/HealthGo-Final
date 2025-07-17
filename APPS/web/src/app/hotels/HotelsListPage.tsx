import { useEffect, useState } from "react";
import api from "@/services/api";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { IconStar } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface Hotel {
  id: number;
  Nome: string;
  Rua: string;
  NumeroEndereco: string;
  Cidade_Id: number;
  Tipo: string;
}

export default function HotelsListPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHotels() {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("/Hotel");
        // Se vier { data: { data: Hotel[] } }
        const data = response.data?.data || response.data;
        setHotels(data);
        console.log("Hotéis recebidos da API:", data);
      } catch (err) {
        setError("Erro ao buscar hotéis.");
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, []);

  return (
    <main className="flex-1 p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Meus Hotéis</h1>
        <p className="text-muted-foreground mt-1">
          Visualize todos os hotéis cadastrados da sua empresa.
        </p>
      </header>
      {loading ? (
        <p>Carregando hotéis...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : hotels.length === 0 ? (
        <p>Nenhum hotel cadastrado.</p>
      ) : (
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
                {/* Imagem pode ser adicionada depois se houver campo */}
                <div className="relative h-40 w-full bg-muted flex items-center justify-center">
                  <span className="text-4xl text-muted-foreground">🏨</span>
                  <div className="absolute right-0 top-0 p-3 flex items-center gap-1">
                    <IconStar className="h-5 w-5 text-yellow-400 fill-yellow-400 drop-shadow" />
                    <span className="text-white font-bold text-lg drop-shadow">
                      {hotel.Tipo || (hotel as any)["tipo"]}
                    </span>
                  </div>
                </div>
                <CardContent className="flex flex-col gap-1 p-4 bg-background">
                  <CardTitle className="text-xl">
                    {hotel.Nome || (hotel as any)["nome"]}
                  </CardTitle>
                  <CardDescription className="text-base font-medium">
                    {hotel.Rua || (hotel as any)["rua"]}
                    {", "}
                    {hotel.NumeroEndereco || (hotel as any)["numeroEndereco"]}
                  </CardDescription>
                  <span className="text-sm text-muted-foreground">
                    Cidade: {hotel.Cidade_Id || (hotel as any)["cidade_Id"]}
                  </span>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
