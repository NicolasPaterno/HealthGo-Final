// APPS/web/src/app/calendar/CalendarPage.tsx
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
import { Trash2 } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/services/api";
import { getAuthUser } from "@/lib/jwt"; // Import the JWT utility

interface Reminder {
  id: number;
  dateTime: string;
  text: string;
  type: 'Consulta' | 'Remédio' | 'Outro';
}

interface ApiReminder {
    id: number;
    titulo: string;
    data: string;
    tipo: 'Consulta' | 'Remédio' | 'Outro';
    pessoa_Id: number;
}
const typeBadgeVariant = {
  Consulta: "default",
  Remédio: "destructive",
  Outro: "secondary",
} as const;

interface User {
  id: number;
  nome: string;
  email: string;
}

export default function CalendarPage() {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [newReminderText, setNewReminderText] = useState("");
  const [newReminderTime, setNewReminderTime] = useState("00:00");
  const [newReminderType, setNewReminderType] = useState<'Consulta' | 'Remédio' | 'Outro'>('Outro');

  useEffect(() => {
    // Instead of localStorage.getItem("user"), use getAuthUser()
    const authUser = getAuthUser();
    if (authUser) {
      setCurrentUser({
        id: parseInt(authUser.nameid), // Parse nameid to int for the User interface
        nome: authUser.name,
        email: authUser.email,
      });
    } else {
      setIsLoading(false);
      toast.error("Sessão expirada", { description: "Por favor, faça login novamente." });
      // Redirect to login if no valid token
      window.location.href = '/login';
    }
  }, []); // Run once on mount

  useEffect(() => {
    const fetchReminders = async () => {
      if (!currentUser?.id) { // Ensure currentUser and its ID exist
          setIsLoading(false);
          return;
      }
      setIsLoading(true);
      try {
        const response = await api.get(`/Lembrete/Pessoa/${currentUser.id}`);
        if (response.data && Array.isArray(response.data.data)) {
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

    if (currentUser) { // Only fetch reminders if currentUser is available
        fetchReminders();
    }
  }, [currentUser]); // Re-fetch when currentUser changes


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
    if (!currentUser) {
        toast.error("Você precisa estar logado para criar um lembrete.");
        return;
    }
    if (isPastTime) {
      toast.error("Não é possível agendar lembretes para uma data ou hora passada.");
      return;
    }
    if (!newReminderText.trim() || !newReminderTime) {
      toast.error("Preencha o lembrete e o horário.");
      return;
    }
    if (newReminderText.length > 100) {
      toast.error("O lembrete não pode ter mais de 100 caracteres.");
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
        Pessoa_Id: currentUser.id,
    };

    try {
      await api.post('/Lembrete', newReminderPayload);

      const updatedRemindersResponse = await api.get(`/Lembrete/Pessoa/${currentUser.id}`);
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
              Marque e gerencie seus compromissos e lembretes de saúde.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col lg:flex-row gap-8">
            {/* Calendário */}
            <div className="flex-grow flex justify-center w-full">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                numberOfMonths={isMobile ? 1 : 2}
                className="p-0"
                disabled={{ before: new Date(new Date().setDate(new Date().getDate() - 1)) }}
                footer={
                  <Button variant="outline" className="w-full mt-4" onClick={() => setDate(new Date())}>
                    Hoje
                  </Button>
                }
                modifiers={{ hasReminder: daysWithReminders }}
                modifiersClassNames={{ hasReminder: "day-with-reminder" }}
              />
            </div>
            
            {/* Lembretes do Dia */}
            <div className="lg:border-l lg:pl-6 lg:basis-1/3">
              <h3 className="text-lg font-semibold mb-2">Lembretes para</h3>
              <p className="text-sm text-muted-foreground mb-4 font-medium">
                {date?.toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                }) || "Selecione uma data"}
              </p>
              <Separator />
              <ScrollArea className="h-60 mt-4 pr-3">
                {isLoading ? (
                    <p className="text-sm text-muted-foreground text-center pt-8">Carregando...</p>
                ) : remindersForSelectedDay.length > 0 ? (
                  <div className="space-y-3">
                    {remindersForSelectedDay.map((reminder) => (
                      <div key={reminder.id} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-grow min-w-0">
                            <Badge className="h-fit">
                              {new Date(reminder.dateTime).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}
                            </Badge>
                            <p className="text-sm ">{reminder.text}</p>
                        </div>
                        <Badge variant={typeBadgeVariant[reminder.type] || "secondary"} className="capitalize">{reminder.type}</Badge>
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
            <CardTitle>Agendar e Visualizar Lembretes</CardTitle>
            <CardDescription>
              Adicione e veja todos os seus lembretes futuros.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Select value={newReminderType} onValueChange={(value) => setNewReminderType(value as 'Consulta' | 'Remédio' | 'Outro')}>
                <SelectTrigger className="w-full sm:w-auto">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Consulta">Consulta</SelectItem>
                  <SelectItem value="Remédio">Remédio</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="time"
                value={newReminderTime}
                onChange={(e) => setNewReminderTime(e.target.value)}
                className="w-full sm:w-auto"
              />
              <Input
                value={newReminderText}
                onChange={(e) => setNewReminderText(e.target.value)}
                placeholder="Descrição do lembrete..."
                className="flex-grow min-w-[150px]"
              />
              <Button onClick={handleAddReminder} disabled={isPastTime} className="w-full sm:w-auto">
                Agendar
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
                      <div className="space-y-2 pl-2 border-l-2">
                        {list.map((reminder) => (
                          <div
                            key={reminder.id}
                            className="flex items-center justify-between group p-2 rounded-md hover:bg-muted"
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              <Badge variant="secondary" className="shrink-0">
                                {new Date(reminder.dateTime).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}
                              </Badge>
                              <p className="text-sm ">{reminder.text}</p>
                              <Badge variant={typeBadgeVariant[reminder.type] || "secondary"} className="capitalize">{reminder.type}</Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteReminder(reminder.id)}
                              className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
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