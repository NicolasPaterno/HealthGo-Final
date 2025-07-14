import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconStar, IconEdit } from "@tabler/icons-react";
import { ChartContainer } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Dados mockados do hotel
const hotel = {
  id: "hotel-palace",
  name: "Hotel Palace",
  image: "https://via.placeholder.com/800x300/8B4513/FFFFFF?text=Hotel+Palace",
  rating: 4.7,
  rua: "Av. Central, 123",
  cidade: "Florianópolis",
  descricao:
    "Um hotel de luxo no coração da cidade com vista panorâmica. Estrutura completa, atendimento premium e localização privilegiada.",
};

// Dados mockados para o gráfico
const rendaPorMes = [
  { mes: "Jan", renda: 12000, lucro: 8000, despesas: 4000 },
  { mes: "Fev", renda: 15000, lucro: 10000, despesas: 5000 },
  { mes: "Mar", renda: 18000, lucro: 12000, despesas: 6000 },
  { mes: "Abr", renda: 14000, lucro: 9000, despesas: 5000 },
  { mes: "Mai", renda: 20000, lucro: 14000, despesas: 6000 },
  { mes: "Jun", renda: 17000, lucro: 11000, despesas: 6000 },
  { mes: "Jul", renda: 22000, lucro: 16000, despesas: 6000 },
  { mes: "Ago", renda: 21000, lucro: 15000, despesas: 6000 },
  { mes: "Set", renda: 19000, lucro: 13000, despesas: 6000 },
  { mes: "Out", renda: 23000, lucro: 17000, despesas: 6000 },
  { mes: "Nov", renda: 25000, lucro: 18000, despesas: 7000 },
  { mes: "Dez", renda: 30000, lucro: 22000, despesas: 8000 },
];

// Mock de comentários/avaliações
const comentarios = [
  {
    id: 1,
    nome: "João Silva",
    nota: 5,
    comentario: "Ótimo hotel, atendimento excelente e localização perfeita!",
    data: "10/01/2024",
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    nota: 4,
    comentario: "Muito confortável, café da manhã delicioso. Voltarei!",
    data: "22/12/2023",
  },
  {
    id: 3,
    nome: "Carlos Souza",
    nota: 3,
    comentario: "Bom custo-benefício, mas o Wi-Fi poderia ser melhor.",
    data: "05/12/2023",
  },
];

export default function HotelProfilePage() {
  const navigate = useNavigate();
  const handleDelete = () => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir este hotel? Esta ação não poderá ser desfeita."
      )
    ) {
      // Aqui você faria a chamada para a API de exclusão
      toast.success("Hotel excluído com sucesso!");
      // Redirecionar ou atualizar a página, se necessário
    }
  };
  return (
    <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto">
      <Card className="overflow-hidden mb-8">
        <div className="relative h-56 w-full">
          <img
            src={hotel.image}
            alt={`Imagem do ${hotel.name}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute left-0 bottom-0 p-6 flex flex-col md:flex-row md:items-end w-full">
            <div className="flex-1">
              <CardTitle className="text-white drop-shadow-lg text-3xl">
                {hotel.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <IconStar className="h-6 w-6 text-yellow-400 fill-yellow-400 drop-shadow" />
                <span className="text-white font-bold text-lg drop-shadow">
                  {hotel.rating}
                </span>
              </div>
              <CardDescription className="text-white/90 mt-2">
                {hotel.rua} - {hotel.cidade}
              </CardDescription>
            </div>
            <div className="flex-shrink-0 md:ml-auto mt-4 md:mt-0">
              <Button
                variant="outline"
                className="flex items-center gap-2 justify-center"
                onClick={() => navigate(`/dashboard/hotels/edit/${hotel.id}`)}
              >
                <IconEdit className="h-5 w-5" /> Editar Informações
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="p-6 bg-background">
          <p className="text-lg mb-4 text-muted-foreground">
            {hotel.descricao}
          </p>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 min-w-[320px]">
              <h2 className="font-semibold text-xl mb-2">Renda Mensal</h2>
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={rendaPorMes}
                    margin={{ top: 16, right: 16, left: 0, bottom: 0 }}
                  >
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) =>
                        `R$ ${value.toLocaleString("pt-BR")}`
                      }
                    />
                    <Legend />
                    <Bar
                      dataKey="renda"
                      name="Renda"
                      fill="#2563eb"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="lucro"
                      name="Lucro"
                      fill="#22c55e"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="despesas"
                      name="Despesas"
                      fill="#ef4444"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="flex flex-col gap-4 justify-center min-w-[220px]">
              <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center">
                <span className="text-2xl font-bold text-primary">
                  R$ {rendaPorMes[11].renda.toLocaleString("pt-BR")}
                </span>
                <span className="text-muted-foreground text-sm">
                  Renda Dezembro
                </span>
              </div>
              <div className="bg-green-100 rounded-lg p-4 flex flex-col items-center">
                <span className="text-2xl font-bold text-green-600">
                  R$ {rendaPorMes[11].lucro.toLocaleString("pt-BR")}
                </span>
                <span className="text-green-800 text-sm">Lucro Dezembro</span>
              </div>
              <div className="bg-red-100 rounded-lg p-4 flex flex-col items-center">
                <span className="text-2xl font-bold text-red-600">
                  R$ {rendaPorMes[11].despesas.toLocaleString("pt-BR")}
                </span>
                <span className="text-red-800 text-sm">Despesas Dezembro</span>
              </div>
            </div>
          </div>
          {/* Listagem de comentários/avaliações */}
          <div className="mt-10">
            <h2 className="font-semibold text-xl mb-4">
              Avaliações dos Hóspedes
            </h2>
            <div className="flex flex-col gap-4">
              {comentarios.map((c) => (
                <div
                  key={c.id}
                  className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-2 bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <IconStar className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-lg">{c.nota}</span>
                  </div>
                  <div className="flex-1 ml-0 md:ml-4">
                    <p className="font-medium">
                      {c.nome}{" "}
                      <span className="text-xs text-muted-foreground font-normal">
                        ({c.data})
                      </span>
                    </p>
                    <p className="text-muted-foreground">{c.comentario}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Área de risco */}
          <div className="mt-12 border-t pt-8">
            <h2 className="font-semibold text-xl mb-4 text-destructive">
              Área de Risco
            </h2>
            <p className="mb-4 text-destructive">
              Excluir este hotel é uma ação permanente e não poderá ser
              desfeita.
            </p>
            <Button
              variant="destructive"
              className="w-full max-w-xs"
              onClick={handleDelete}
            >
              Excluir Hotel
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
