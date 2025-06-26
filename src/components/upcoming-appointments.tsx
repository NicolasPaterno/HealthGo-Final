import { IconCalendarEvent } from "@tabler/icons-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react" // Import useEffect and useState hooks

interface Appointment {
  id: string; // Changed to string as event IDs are typically strings
  date: string;
  time: string;
  title: string;
}

export function UpcomingAppointments() {
  const [appointments, setAppointments] = useState<Appointmen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Assuming generic_calendar.search_calendar_events is available globally or imported
        // This is a placeholder for the actual API call
        const response = await generic_calendar.search_calendar_events({
          past_or_future_events: "FUTURE",
          filter_by_order: true,
          // You can add more filters here if needed, e.g., keywords
        });

        if (response.events && response.events.length > 0) {
          const fetchedAppointments: Appointment[] = response.events.map(event => ({
            id: event.event_id || Math.random().toString(), // Use event_id or a random ID
            date: event.start_time ? new Date(event.start_time).toISOString().split('T')[0] : 'N/A',
            time: event.start_time ? new Date(event.start_time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'N/A',
            title: event.event_title || 'Evento sem título',
            type: event.description?.includes("Consulta") ? "Consulta" : event.description?.includes("Exame") ? "Exame" : "Compromisso", // Example of deriving type
          }));
          setAppointments(fetchedAppointments);
        } else {
          setAppointments([]);
        }
      } catch (err) {
        console.error("Erro ao buscar agendamentos do calendário:", err);
        setError("Não foi possível carregar os agendamentos do calendário.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []); // Empty dependency array means this effect runs once on mount

  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.time.replace(':', '')}:00`)
    const dateTimeB = new Date(`${b.date}T${b.time.replace(':', '')}:00`)
    return dateTimeA.getTime() - dateTimeB.getTime()
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconCalendarEvent className="size-6 text-primary" />
          Próximos Agendamentos
        </CardTitle>
        <CardDescription>
          Seus próximos compromissos de saúde.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <ScrollArea className="h-64 pr-2">
          {loading ? (
            <p className="text-muted-foreground text-center pt-8">Carregando agendamentos...</p>
          ) : error ? (
            <p className="text-destructive text-center pt-8">{error}</p>
          ) : sortedAppointments.length > 0 ? (
            <div className="space-y-4">
              {sortedAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="font-medium">{appointment.title}</p>
                    <p className="text-muted-foreground text-sm">
                      {new Date(appointment.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} às {appointment.time}
                    </p>
                  </div>
                  <Badge variant="outline">{appointment.type}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center pt-8">
              Nenhum agendamento futuro encontrado no calendário.
            </p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}