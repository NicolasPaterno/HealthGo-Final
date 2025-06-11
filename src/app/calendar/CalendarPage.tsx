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
import { useMemo, useState } from "react";
import { Toaster, toast } from "sonner";

interface Reminder {
  id: number;
  date: Date;
  time: string;
  text: string;
}

export default function CalendarPage() {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, date: new Date(new Date().getFullYear(), 5, 11), time: "09:00", text: "Consulta de rotina com Dr. Carlos" },
    { id: 2, date: new Date(new Date().getFullYear(), 5, 13), time: "10:00", text: "Sessão de fisioterapia" },
    { id: 3, date: new Date(new Date().getFullYear(), 5, 6), time: "12:00", text: "bom dia" },
  ]);

  const [newReminderText, setNewReminderText] = useState("");
  const [newReminderTime, setNewReminderTime] = useState("00:00");

  const isPastTime = useMemo(() => {
    if (!date || !newReminderTime) return false;
    const now = new Date();
    const reminderDateTime = new Date(date);
    const [hours, minutes] = newReminderTime.split(':').map(Number);
    reminderDateTime.setHours(hours, minutes, 0, 0);
    now.setSeconds(0, 0);
    return reminderDateTime < now;
  }, [date, newReminderTime]);

  const handleAddReminder = () => {
    if (isPastTime) {
      toast.error("Não é possível agendar lembretes para uma data ou hora passada.");
      return;
    }
    if (!newReminderText.trim() || !newReminderTime) {
      toast.error("Preencha o lembrete e o horário.");
      return;
    }
    if (!date) {
      toast.error("Selecione uma data para o lembrete.");
      return;
    }
    const newReminder: Reminder = { id: Date.now(), date, time: newReminderTime, text: newReminderText };
    setReminders(
      [...reminders, newReminder].sort((a, b) => a.date.getTime() - b.date.getTime())
    );
    setNewReminderText("");
    toast.success("Lembrete adicionado com sucesso!");
  };

  const handleDeleteReminder = (idToDelete: number) => {
    setReminders(reminders.filter((r) => r.id !== idToDelete));
    toast.info("Lembrete removido.");
  };

  const remindersForSelectedDay = reminders
    .filter((r) =>
        date &&
        r.date.getDate() === date.getDate() &&
        r.date.getMonth() === date.getMonth() &&
        r.date.getFullYear() === date.getFullYear()
    )
    .sort((a, b) => a.time.localeCompare(b.time));

  const groupedReminders = useMemo(() => {
    return reminders.reduce((acc, reminder) => {
        const dateString = reminder.date.toLocaleDateString("pt-BR", { dateStyle: "full" });
        if (!acc[dateString]) acc[dateString] = [];
        acc[dateString].push(reminder);
        acc[dateString].sort((a, b) => a.time.localeCompare(b.time));
        return acc;
      }, {} as Record<string, Reminder[]>);
  }, [reminders]);

  const daysWithReminders = useMemo(() => {
    return reminders.map((r) => r.date);
  }, [reminders]);

  return (
    <>
      <Toaster richColors position="top-right" />
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
                disabled={{ before: new Date(new Date().setDate(new Date().getDate() -1)) }}
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
                {remindersForSelectedDay.length > 0 ? (
                    <div className="space-y-3">
                      {remindersForSelectedDay.map((reminder) => (
                         <div key={reminder.id} className="flex items-center gap-2">
                            <Badge className="h-fit">{reminder.time}</Badge>
                            <p className="text-sm flex-grow">{reminder.text}</p>
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
              {Object.keys(groupedReminders).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(groupedReminders).map(([day, list]) => (
                    <div key={day}>
                      <p className="font-bold text-sm mb-2">{day}</p>
                      <div className="space-y-2 pl-2 border-l-2">
                        {list.map((reminder) => (
                          <div
                            key={reminder.id}
                            className="flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{reminder.time}</Badge>
                              <p className="text-sm">{reminder.text}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteReminder(reminder.id)}
                              className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
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