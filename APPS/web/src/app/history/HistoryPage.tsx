import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAuthUser } from "@/lib/jwt"; // Para descriptografar o token
import api from "@/services/api";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Hotel,
  Plane,
  User as UserIcon,
  CreditCard,
  CalendarDays,
} from "lucide-react";

interface OrderItem {
  ordemServicoId: number;
  dataCriacao: string;
  statusOS: string;
  formaPagamento: string;
  nomeHotel: string | null;
  precoQuarto: number | null;
  precoPrestador: number | null;
  especialidadePrestador: string | null;
  precoVoo: number | null;
  companhiaAerea: string | null;
}

export default function HistoryPage() {
  console.log("HistoryPage component rendering...");
  const [history, setHistory] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pessoaId, setPessoaId] = useState<number | null>(null);

  useEffect(() => {
    const user = getAuthUser();
    console.log("User do token:", user);
    if (user && user.nameid) {
      const parsedPessoaId = parseInt(user.nameid);
      console.log("Parsed Pessoa ID:", parsedPessoaId);
      if (!isNaN(parsedPessoaId)) {
        setPessoaId(parsedPessoaId);
      } else {
        setError("ID do usuário inválido no token.");
        setIsLoading(false);
      }
    } else {
      setError("Usuário não autenticado.");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      console.log("Iniciando fetchHistory para pessoaId:", pessoaId);
      if (pessoaId === null) {
        console.log("Pessoa ID é null, pulando fetchHistory.");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        console.log(`Chamando API: /OrdemServico/historico/${pessoaId}`);
        const response = await api.get(`/OrdemServico/historico/${pessoaId}`);
        console.log("Resposta da API para histórico:", response.data);
        if (response.data && Array.isArray(response.data)) {
          setHistory(response.data);
          console.log("Histórico de compras carregado:", response.data);
        } else {
          setHistory([]);
          toast.error("Erro", { description: "Formato de dados inesperado para histórico de compras." });
          console.warn("Formato de dados inesperado para histórico de compras:", response.data);
        }
      } catch (err: any) {
        console.error("Erro ao buscar histórico de compras:", err.response?.data || err.message);
        setError("Falha ao carregar histórico de compras. Tente novamente mais tarde.");
        toast.error("Erro", { description: err.response?.data?.message || "Falha ao carregar histórico de compras." });
      } finally {
        setIsLoading(false);
        console.log("fetchHistory finalizado. isLoading:", false);
      }
    };

    if (pessoaId !== null) {
      fetchHistory();
    }
  }, [pessoaId]);

  const groupOrders = (items: OrderItem[]) => {
    const grouped: { [key: number]: OrderItem[] } = {};
    items.forEach(item => {
      if (!grouped[item.ordemServicoId]) {
        grouped[item.ordemServicoId] = [];
      }
      grouped[item.ordemServicoId].push(item);
    });
    console.log("Pedidos agrupados:", grouped);
    return Object.values(grouped);
  };

  const formattedHistory = groupOrders(history);
  console.log("Histórico formatado (para renderização):", formattedHistory);
  console.log("Estados atuais: isLoading=", isLoading, ", error=", error);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (formattedHistory.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <p>Nenhum histórico de compras encontrado.</p>
      </div>
    );
  }

  return (
    <main className="flex-1 p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Histórico de Compras</h1>
      </div>

      <div className="space-y-6">
        {formattedHistory.map((orderItems, index) => (
          <Card key={orderItems[0].ordemServicoId}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Ordem #{orderItems[0].ordemServicoId}</span>
                <Badge variant="secondary">{orderItems[0].statusOS}</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {format(new Date(orderItems[0].dataCriacao), "dd/MM/yyyy HH:mm", { locale: ptBR })}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <CreditCard className="w-4 h-4" />
                {orderItems[0].formaPagamento}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderItems.map((item, itemIndex) => (
                <div key={itemIndex} className="border-t pt-4 first:border-t-0 first:pt-0">
                  {item.nomeHotel && (
                    <div className="flex items-center space-x-3">
                      <Hotel className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Hospedagem: {item.nomeHotel}</p>
                        <p className="text-sm text-muted-foreground">Preço: R$ {item.precoQuarto?.toFixed(2)}</p>
                      </div>
                    </div>
                  )}
                  {item.especialidadePrestador && (
                    <div className="flex items-center space-x-3 mt-2">
                      <UserIcon className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium">Serviço: {item.especialidadePrestador}</p>
                        <p className="text-sm text-muted-foreground">Preço: R$ {item.precoPrestador?.toFixed(2)}</p>
                      </div>
                    </div>
                  )}
                  {item.companhiaAerea && (
                    <div className="flex items-center space-x-3 mt-2">
                      <Plane className="w-5 h-5 text-purple-500" />
                      <div>
                        <p className="font-medium">Voo: {item.companhiaAerea}</p>
                        <p className="text-sm text-muted-foreground">Preço: R$ {item.precoVoo?.toFixed(2)}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
