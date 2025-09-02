import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Clock, Mail, Phone, User, Calendar, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { toast } from "sonner";
import { getAuthUser } from "@/lib/jwt";

type HistoricoItem = {
  DataInicio: string;
  DataFim: string;
  Funcao: string;
  NomeCliente: string;
  EmailCliente: string;
  TelefoneCliente: string;
  PrecoTotal: number;
};

type FilterType = "todos" | "concluidos" | "agendados";

export default function HistoricoServicosPage() {
  const [items, setItems] = useState<HistoricoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>("todos");

  useEffect(() => {
    const loadHistorico = async () => {
      try {
        const decoded = getAuthUser();
        if (!decoded) {
          toast.error("Sessão expirada", { description: "Faça login novamente." });
          return;
        }
        const pessoaId = parseInt(decoded.nameid);
        const prestadorResp = await api.get(`/PrestadorServico/get_by_pessoa_id?id=${pessoaId}`);
        const prestadorId = prestadorResp.data.id;
        const resp = await api.get(`/PrestadorServico/agenda/${prestadorId}`);
        
        const raw = Array.isArray(resp.data)
          ? resp.data
          : Array.isArray(resp.data?.data)
          ? resp.data.data
          : Array.isArray(resp.data?.result)
          ? resp.data.result
          : [];

        const normalized: HistoricoItem[] = raw.map((it: any) => ({
          DataInicio: it.DataInicio ?? it.dataInicio ?? it.data_inicio ?? it.datainicio,
          DataFim: it.DataFim ?? it.dataFim ?? it.data_fim ?? it.datafim,
          Funcao: it.Funcao ?? it.funcao ?? it.funcaoNome ?? it.role,
          NomeCliente: it.NomeCliente ?? it.nomeCliente ?? it.clienteNome ?? it.nome,
          EmailCliente: it.EmailCliente ?? it.emailCliente ?? it.email,
          TelefoneCliente: it.TelefoneCliente ?? it.telefoneCliente ?? it.telefone,
          PrecoTotal: it.PrecoTotal ?? it.precoTotal ?? it.total ?? it.valor ?? 0,
        })).filter((it: HistoricoItem) => Boolean(it.DataInicio));

        // Ordenar por data mais recente primeiro
        const sortedItems = normalized.sort((a, b) => 
          new Date(b.DataInicio).getTime() - new Date(a.DataInicio).getTime()
        );

        setItems(sortedItems);
      } catch (e) {
        console.error(e);
        toast.error("Erro ao carregar histórico");
      } finally {
        setIsLoading(false);
      }
    };
    loadHistorico();
  }, []);

  const formatDateTime = (iso: string) => {
    const date = new Date(iso);
    return {
      date: date.toLocaleDateString("pt-BR", { 
        day: "2-digit", 
        month: "2-digit", 
        year: "numeric" 
      }),
      time: date.toLocaleTimeString("pt-BR", { 
        hour: "2-digit", 
        minute: "2-digit" 
      })
    };
  };

  const formatCurrency = (v: number) => 
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  const filteredItems = useMemo(() => {
    const now = new Date();
    
    switch (activeFilter) {
      case "concluidos":
        return items.filter(item => new Date(item.DataFim) < now);
      case "agendados":
        return items.filter(item => new Date(item.DataInicio) > now);
      default:
        return items;
    }
  }, [items, activeFilter]);

  const groupByDate = (items: HistoricoItem[]) => {
    const grouped: { [key: string]: HistoricoItem[] } = {};
    
    items.forEach(item => {
      const dateKey = new Date(item.DataInicio).toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      });
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(item);
    });
    
    return grouped;
  };

  const groupedItems = groupByDate(filteredItems);

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5" />
              <CardTitle>Histórico de Serviços</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-1">
                <Button
                  variant={activeFilter === "todos" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter("todos")}
                >
                  Todos
                </Button>
                <Button
                  variant={activeFilter === "concluidos" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter("concluidos")}
                >
                  Concluídos
                </Button>
                <Button
                  variant={activeFilter === "agendados" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter("agendados")}
                >
                  Agendados
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            {isLoading ? (
              <p className="text-sm text-muted-foreground text-center pt-8">Carregando...</p>
            ) : filteredItems.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center pt-8">
                {activeFilter === "todos" 
                  ? "Nenhum serviço encontrado no histórico."
                  : activeFilter === "concluidos"
                  ? "Nenhum serviço concluído encontrado."
                  : "Nenhum serviço agendado encontrado."
                }
              </p>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedItems).map(([dateKey, dayItems]) => (
                  <div key={dateKey}>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">
                      {dateKey}
                    </h3>
                    <div className="space-y-3">
                      {dayItems.map((item, idx) => {
                        const startDateTime = formatDateTime(item.DataInicio);
                        const endDateTime = formatDateTime(item.DataFim);
                        
                        return (
                          <div key={idx} className="p-4 rounded-lg border bg-card">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {startDateTime.date}
                                </Badge>
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {startDateTime.time} - {endDateTime.time}
                                </Badge>
                              </div>
                              <Badge variant="default" className="text-sm">
                                {formatCurrency(item.PrecoTotal)}
                              </Badge>
                            </div>
                            
                            <div className="mb-3">
                              <h4 className="font-medium text-foreground mb-1">
                                Função: {item.Funcao}
                              </h4>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-semibold text-foreground mb-2">
                                Dados do Cliente
                              </h5>
                              <div className="grid gap-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4" />
                                  {item.NomeCliente}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4" />
                                  {item.EmailCliente}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4" />
                                  {item.TelefoneCliente}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
