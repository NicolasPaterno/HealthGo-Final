import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
  } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { Link } from "react-router-dom";
  import { Button } from "./ui/button";
  
  interface Reminder {
    id: number;
    dateTime: string;
    text: string;
    type: 'consulta' | 'remédio' | 'outros';
  }
  
  const reminderTypeColors = {
    consulta: 'bg-blue-500',
    remédio: 'bg-red-500',
    outros: 'bg-gray-500',
  };
  
  const reminders: Reminder[] = [
    { id: 1, dateTime: new Date(new Date().getFullYear(), 5, 27, 9, 0).toISOString(), text: "Consulta com Dr. João", type: 'consulta' },
    { id: 2, dateTime: new Date(new Date().getFullYear(), 5, 27, 14, 0).toISOString(), text: "Tomar Paracetamol", type: 'remédio' },
    { id: 3, dateTime: new Date(new Date().getFullYear(), 5, 28, 10, 0).toISOString(), text: "Fisioterapia", type: 'outros' },
  ];
  
  export function RemindersCard() {
    const upcomingReminders = reminders
      .filter(r => new Date(r.dateTime) > new Date())
      .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
      .slice(0, 5);
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Próximos Lembretes</CardTitle>
          <CardDescription>Seus agendamentos e lembretes pendentes.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            {upcomingReminders.length > 0 ? (
              <div className="space-y-4">
                {upcomingReminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-8 rounded-full ${reminderTypeColors[reminder.type]}`} />
                      <div>
                        <p className="font-semibold">{reminder.text}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(reminder.dateTime).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                          {' - '}
                          {new Date(reminder.dateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{reminder.type}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center pt-10">
                Nenhum lembrete pendente.
              </p>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
              <Link to="/dashboard/calendar">Ver todos os lembretes</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }