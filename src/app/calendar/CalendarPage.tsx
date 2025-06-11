import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import { Toaster, toast } from "sonner"

// Estrutura do lembrete aprimorada com horário
interface Reminder {
  id: number
  date: Date
  time: string
  text: string
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: 1,
      date: new Date(),
      time: "09:00",
      text: "Consulta de rotina com Dr. Carlos",
    },
    {
      id: 2,
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      time: "14:30",
      text: "Comprar novos medicamentos na farmácia",
    },
  ])

  const [newReminderText, setNewReminderText] = useState("")
  const [newReminderTime, setNewReminderTime] = useState("")

  const handleAddReminder = () => {
    if (!newReminderText.trim() || !newReminderTime) {
      toast.error("Preencha o lembrete e o horário.")
      return
    }
    if (!date) {
      toast.error("Selecione uma data para o lembrete.")
      return
    }

    const newReminder: Reminder = {
      id: Date.now(),
      date: date,
      time: newReminderTime,
      text: newReminderText,
    }

    setReminders([...reminders, newReminder].sort((a,b) => a.date.getTime() - b.date.getTime()));
    setNewReminderText("")
    setNewReminderTime("")
    toast.success("Lembrete adicionado com sucesso!")
  }

  const handleDeleteReminder = (idToDelete: number) => {
    setReminders(reminders.filter((r) => r.id !== idToDelete))
    toast.info("Lembrete removido.")
  }

  // Agrupa todos os lembretes por data
  const groupedReminders = reminders.reduce(
    (acc, reminder) => {
      const dateString = reminder.date.toLocaleDateString("pt-BR", {
        dateStyle: "full",
      })
      if (!acc[dateString]) {
        acc[dateString] = []
      }
      acc[dateString].push(reminder)
      // Ordena lembretes dentro do dia pelo horário
      acc[dateString].sort((a, b) => a.time.localeCompare(b.time));
      return acc
    },
    {} as Record<string, Reminder[]>
  )

  return (
    <>
      <Toaster richColors position="top-right" />
      <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        {/* Card do Calendário */}
        <Card>
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
            <CardDescription>
              Selecione uma data para adicionar um novo lembrete.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center p-2 md:p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
              classNames={{
                day_selected:
                  "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary",
              }}
            />
          </CardContent>
        </Card>

        {/* Card de Lembretes */}
        <Card>
          <CardHeader>
            <CardTitle>Agendar e Visualizar Lembretes</CardTitle>
            <CardDescription>
              Adicione um novo lembrete para a data selecionada:{" "}
              <span className="font-semibold text-primary">
                {date?.toLocaleDateString("pt-BR")}
              </span>
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
              <Button onClick={handleAddReminder} className="mt-2 md:mt-0">
                Agendar Lembrete
              </Button>
            </div>

            <div className="mt-6">
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
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">{reminder.time}</Badge>
                                <p className="text-sm">{reminder.text}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteReminder(reminder.id)}
                                className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
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
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  )
}