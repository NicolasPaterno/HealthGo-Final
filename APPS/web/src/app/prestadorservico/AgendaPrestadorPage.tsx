import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, Mail, Phone, User } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api";
import { toast } from "sonner";
import { getAuthUser } from "@/lib/jwt";

type AgendaItem = {
  DataInicio: string;
  DataFim: string;
  Funcao: string;
  NomeCliente: string;
  EmailCliente: string;
  TelefoneCliente: string;
  PrecoTotal: number;
};

export default function AgendaPrestadorPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [items, setItems] = useState<AgendaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadAgenda = async () => {
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

        const normalized: AgendaItem[] = raw.map((it: any) => ({
          DataInicio: it.DataInicio ?? it.dataInicio ?? it.data_inicio ?? it.datainicio,
          DataFim: it.DataFim ?? it.dataFim ?? it.data_fim ?? it.datafim,
          Funcao: it.Funcao ?? it.funcao ?? it.funcaoNome ?? it.role,
          NomeCliente: it.NomeCliente ?? it.nomeCliente ?? it.clienteNome ?? it.nome,
          EmailCliente: it.EmailCliente ?? it.emailCliente ?? it.email,
          TelefoneCliente: it.TelefoneCliente ?? it.telefoneCliente ?? it.telefone,
          PrecoTotal: it.PrecoTotal ?? it.precoTotal ?? it.total ?? it.valor ?? 0,
        })).filter((it: AgendaItem) => Boolean(it.DataInicio));

        setItems(normalized);
      } catch (e) {
        console.error(e);
        toast.error("Erro ao carregar agenda");
      } finally {
        setIsLoading(false);
      }
    };
    loadAgenda();
  }, []);

  const serviceDays = useMemo(() => {
    return items.map((it) => new Date(it.DataInicio));
  }, [items]);

  const itemsForSelectedDay = useMemo(() => {
    if (!date) return [] as AgendaItem[];
    return items.filter((it) => {
      const d = new Date(it.DataInicio);
      return (
        d.getDate() === date.getDate() &&
        d.getMonth() === date.getMonth() &&
        d.getFullYear() === date.getFullYear()
      );
    }).sort((a, b) => new Date(a.DataInicio).getTime() - new Date(b.DataInicio).getTime());
  }, [date, items]);

  const formatTime = (iso: string) => new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const formatCurrency = (v: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            <CardTitle>Agenda</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col xl:flex-row gap-8">
          <div className="flex-grow flex justify-center w-full">
            <div className="w-full max-w-4xl mx-auto">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
                className="p-0 w-full"
                                 modifiers={{ hasService: serviceDays }}
                 modifiersClassNames={{ hasService: "bg-amber-100/50 dark:bg-amber-900/30" }}
                classNames={{
                  root: "w-full",
                  months: "flex gap-4 flex-col relative w-full",
                  month: "flex flex-col w-full gap-4",
                  table: "w-full border-collapse",
                  week: "flex w-full mt-2",
                  day: "relative w-full h-full p-0 text-center aspect-square select-none  rounded-lg",
                }}
              />
            </div>
          </div>

          <div className="xl:border-l xl:pl-6 xl:basis-1/3 min-w-0">
            <h3 className="text-lg font-semibold mb-2">Serviços para</h3>
            <p className="text-sm text-muted-foreground mb-4 font-medium">
              {date?.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" }) || "Selecione uma data"}
            </p>
            <Separator />
            <ScrollArea className="h-72 mt-4 pr-3">
              {isLoading ? (
                <p className="text-sm text-muted-foreground text-center pt-8">Carregando...</p>
              ) : items.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center pt-8">Nenhum agendamento encontrado.</p>
              ) : itemsForSelectedDay.length > 0 ? (
                <div className="space-y-3">
                                     {itemsForSelectedDay.map((it, idx) => (
                     <div key={idx} className="p-3 rounded-md border">
                       <div className="flex items-center gap-2">
                         <Badge variant="secondary">{formatTime(it.DataInicio)} - {formatTime(it.DataFim)}</Badge>
                         <span className="font-medium">Função: {it.Funcao}</span>
                       </div>
                       <div className="mt-3">
                         <h4 className="text-sm font-semibold text-foreground mb-2">Dados do Cliente</h4>
                         <div className="grid gap-1 text-sm text-muted-foreground">
                           <div className="flex items-center gap-2"><User className="h-4 w-4" />{it.NomeCliente}</div>
                           <div className="flex items-center gap-2"><Mail className="h-4 w-4" />{it.EmailCliente}</div>
                           <div className="flex items-center gap-2"><Phone className="h-4 w-4" />{it.TelefoneCliente}</div>
                           <div className="flex items-center gap-2"><Clock className="h-4 w-4" />Valor: {formatCurrency(it.PrecoTotal)}</div>
                         </div>
                       </div>
                     </div>
                   ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center pt-8">Nenhum serviço para este dia.</p>
              )}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


