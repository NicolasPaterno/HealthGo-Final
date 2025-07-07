import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { IconTrash } from "@tabler/icons-react";
import { useMemo, useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/services/api"; // 1. Importar o serviço da API

interface Reminder {
  id: number;
  // Mantive 'dateTime' e 'text' para consistência com o front-end existente.
  // A API retorna 'data' e 'titulo'. Faremos a conversão.
  dateTime: string;
  text: string;
  type: 'consulta' | 'remédio' | 'outros';
}

// Interface para o formato do lembrete retornado pela API
interface ApiReminder {
    id: number;
    titulo: string;
    data: string;
    tipo: 'consulta' | 'remédio' | 'outros';
    pessoa_Id: number;
}


export default function CalendarPage() {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  const [newReminderText, setNewReminderText] = useState("");
  const [newReminderTime, setNewReminderTime] = useState("00:00");
  const [newReminderType, setNewReminderType] = useState<'consulta' | 'remédio' | 'outros'>('outros');

  // 2. Buscar lembretes da API ao carregar a página
  useEffect(() => {
    const fetchReminders = async () => {
      setIsLoading(true);
      try {
        // Supondo que o ID do usuário (pessoa) esteja disponível. Usando '1' como exemplo.
        const response = await api.get('/Lembrete/Pessoa/23');
        if (response.data && Array.isArray(response.data.data)) {
          // Converte os dados da API para o formato do frontend
          const formattedReminders = response.data.data.map((r: ApiReminder) => ({
            id: r.id,
            text: r.titulo,
            dateTime: r.data,
            type: r.tipo,
          }));
          setReminders(formattedReminders);
        } else {
            setReminders([]);
        }
      } catch (error) {
        console.error("Erro ao buscar lembretes:", error);
        toast.error("Erro ao carregar lembretes.");
        setReminders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReminders();
  }, []);


  const reminderDateTime = useMemo(() => {
    if (!date || !newReminderTime) return null;
    const [hours, minutes] = newReminderTime.split(':').map(Number);
    const combined = new Date(date);
    combined.setHours(hours, minutes, 0, 0);
    return combined;
  }, [date, newReminderTime]);

  const isPastTime = useMemo(() => {
    if (!reminderDateTime) return false;
    const now = new Date();
    now.setSeconds(0, 0);
    return reminderDateTime < now;
  }, [reminderDateTime]);

  const handleAddReminder = async () => {
    if (isPastTime) {
      toast.error("Não é possível agendar lembretes para uma data ou hora passada.");
      return;
    }
    if (!newReminderText.trim() || !newReminderTime) {
      toast.error("Preencha o lembrete e o horário.");
      return;
    }
    if (!date || !reminderDateTime) {
      toast.error("Selecione uma data para o lembrete.");
      return;
    }

    const newReminderPayload = {
        Titulo: newReminderText,
        Data: reminderDateTime.toISOString(),
        Tipo: newReminderType,
        Pessoa_Id: 1, // Usando ID do usuário fixo como exemplo
    };

    try {
      // 3. Comentando a chamada para o n8n
      /*
      const response = await fetch('https://nicaozx.app.n8n.cloud/webhook-test/savecalendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReminder),
      });

      if (!response.ok) {
        throw new Error('A resposta da rede não foi OK');
      }
      */

      // 4. Adicionando a chamada para a nossa API
      const response = await api.post('/Lembrete', newReminderPayload);

      // Atualiza a lista de lembretes após adicionar
      // A maneira mais simples é buscar todos novamente
      const updatedRemindersResponse = await api.get('/Lembrete/Pessoa/1');
      if (updatedRemindersResponse.data && Array.isArray(updatedRemindersResponse.data.data)) {
        const formattedReminders = updatedRemindersResponse.data.data.map((r: ApiReminder) => ({
            id: r.id,
            text: r.titulo,
            dateTime: r.data,
            type: r.tipo,
          }));
        setReminders(formattedReminders);
      }

      setNewReminderText("");
      toast.success("Lembrete adicionado com sucesso!");

    } catch (error) {
      console.error('Erro:', error);
      toast.error("Erro ao adicionar o lembrete. Tente novamente.");
    }
  };

  const handleDeleteReminder = async (idToDelete: number) => {
    try {
        await api.delete(`/Lembrete/${idToDelete}`);
        setReminders(reminders.filter((r) => r.id !== idToDelete));
        toast.info("Lembrete removido.");
    } catch (error) {
        console.error("Erro ao deletar lembrete:", error);
        toast.error("Erro ao remover o lembrete. Tente novamente.");
    }
  };


  const remindersForSelectedDay = reminders
    .filter((r) => {
      if (!date) return false;
      const reminderDate = new Date(r.dateTime);
      return (
        reminderDate.getDate() === date.getDate() &&
        reminderDate.getMonth() === date.getMonth() &&
        reminderDate.getFullYear() === date.getFullYear()
      );
    })
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

  const groupedReminders = useMemo(() => {
    return reminders.reduce((acc, reminder) => {
      const reminderDate = new Date(reminder.dateTime);
      const dateString = reminderDate.toLocaleDateString("pt-BR", { dateStyle: "full" });
      if (!acc[dateString]) acc[dateString] = [];
      acc[dateString].push(reminder);
      acc[dateString].sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
      return acc;
    }, {} as Record<string, Reminder[]>);
  }, [reminders]);

  const daysWithReminders = useMemo(() => {
    return reminders.map((r) => new Date(r.dateTime));
  }, [reminders]);

  return (
    <>
      <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
            <CardDescription>
              Dias com lembretes são marcados com um sublinhado e negrito.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className=" md:col-span-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                numberOfMonths={isMobile ? 1 : 2}
                className="rounded-md p-0 w-max"
                disabled={{ before: new Date(new Date().setDate(new Date().getDate() - 1)) }}
                footer={
                  <Button variant="outline" className="w-full mt-2 rounded-3xl" onClick={() => setDate(new Date())}>
                    Hoje
                  </Button>
                }
                modifiers={{ hasReminder: daysWithReminders }}
                modifiersClassNames={{ hasReminder: "day-with-reminder" }}
              />
            </div>
            <div className="md:col-span-1 border-l md:pl-6">
              <h3 className="text-lg font-semibold mb-2">Lembretes do Dia</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {date?.toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                }) || "Selecione uma data"}
              </p>
              <Separator />
              <ScrollArea className="h-64 mt-4">
                {isLoading ? (
                    <p className="text-sm text-muted-foreground text-center pt-8">Carregando...</p>
                ) : remindersForSelectedDay.length > 0 ? (
                  <div className="space-y-3">
                    {remindersForSelectedDay.map((reminder) => (
                      <div key={reminder.id} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <Badge className="h-fit">
                              {new Date(reminder.dateTime).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}
                            </Badge>
                            <p className="text-sm flex-grow">{reminder.text}</p>
                        </div>
                        <Badge variant="outline">{reminder.type}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center pt-8">
                    Nenhum lembrete para este dia.
                  </p>
                )}
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agendar e Visualizar Todos os Lembretes</CardTitle>
            <CardDescription>
              Adicione um novo lembrete para a data selecionada acima.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-2">
              <Select value={newReminderType} onValueChange={(value) => setNewReminderType(value as 'consulta' | 'remédio' | 'outros')}>
                <SelectTrigger className="md:w-40">
                  <SelectValue placeholder="Tipo de lembrete" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consulta">Consulta</SelectItem>
                  <SelectItem value="remédio">Remédio</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="time"
                value={newReminderTime}
                onChange={(e) => setNewReminderTime(e.target.value)}
                className="md:w-32"
              />
              <Input
                value={newReminderText}
                onChange={(e) => setNewReminderText(e.target.value)}
                placeholder="Descrição do lembrete..."
                className="flex-grow"
              />
              <Button onClick={handleAddReminder} disabled={isPastTime}>
                Agendar Lembrete
              </Button>
            </div>
            {isPastTime && <p className="text-destructive text-xs mt-2">Você não pode agendar um lembrete no passado.</p>}
            <Separator className="my-6" />
            <h3 className="text-lg font-semibold mb-4">Próximos Lembretes</h3>
            <ScrollArea className="h-72">
             {isLoading ? (
                  <p className="text-sm text-muted-foreground text-center pt-10">Carregando...</p>
             ) : Object.keys(groupedReminders).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(groupedReminders).map(([day, list]) => (
                    <div key={day}>
                      <p className="font-bold text-sm mb-2">{day}</p>
                      <div className="space-y-2 pl-2 border-l-3 hover:bg-transparent">
                        {list.map((reminder) => (
                          <div
                            key={reminder.id}
                            className="flex items-center justify-between group h-12"
                          >
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">
                                {new Date(reminder.dateTime).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}
                              </Badge>
                              <p className="text-sm">{reminder.text}</p>
                              <Badge variant="outline">{reminder.type}</Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteReminder(reminder.id)}
                              className="h-8 w-8 text-muted-foreground opacity-0 mr-3.5 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                            >
                              <IconTrash className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center pt-10">
                  Você ainda não tem lembretes agendados.
                </p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
    </>
  );
}