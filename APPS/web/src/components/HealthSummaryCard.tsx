import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pill, Stethoscope, List } from "lucide-react";

// Interface para os lembretes (deve corresponder à do DashboardContent)
interface Reminder {
  id: number;
  dateTime: string;
  text: string;
  type: 'consulta' | 'remédio' | 'outro';
}

// Interface para as props do componente
interface HealthSummaryCardProps {
  reminders: Reminder[];
}

// Função para formatar a data e hora de forma amigável
const formatDateTime = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dateString = date.toLocaleDateString('pt-BR');
    const todayString = today.toLocaleDateString('pt-BR');
    const tomorrowString = tomorrow.toLocaleDateString('pt-BR');

    let friendlyDate = '';
    if (dateString === todayString) {
        friendlyDate = 'Hoje';
    } else if (dateString === tomorrowString) {
        friendlyDate = 'Amanhã';
    } else {
        friendlyDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
    }

    return `${friendlyDate} às ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
}


export function HealthSummaryCard({ reminders }: HealthSummaryCardProps) {
  // Filtra e ordena os lembretes futuros
  const upcomingReminders = reminders
    .filter(r => new Date(r.dateTime) >= new Date())
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

  // Encontra o *primeiro* (mais próximo) lembrete de cada categoria
  const nextAppointment = upcomingReminders.find(r => r.type === 'consulta');
  const nextMedication = upcomingReminders.find(r => r.type === 'remédio');
  const nextOther = upcomingReminders.find(r => r.type === 'outro');


  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo da Saúde</CardTitle>
        <CardDescription>Suas próximas atividades de saúde.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 content-around">
        {/* Próxima Consulta */}
        <div className="flex items-center gap-4">
            <Stethoscope className="h-6 w-6 text-primary" />
            <div>
                <p className="font-semibold">Próxima Consulta</p>
                <p className="text-sm text-muted-foreground">
                    {nextAppointment
                        ? `${nextAppointment.text} - ${formatDateTime(new Date(nextAppointment.dateTime))}`
                        : "Nenhuma consulta agendada"}
                </p>
            </div>
        </div>
        {/* Próximo Remédio */}
        <div className="flex items-center gap-4">
            <Pill className="h-6 w-6 text-destructive" />
            <div>
                <p className="font-semibold">Próximo Remédio</p>
                <p className="text-sm text-muted-foreground">
                    {nextMedication
                        ? `${nextMedication.text} - ${formatDateTime(new Date(nextMedication.dateTime))}`
                        : "Nenhum remédio agendado"}
                </p>
            </div>
        </div>
        {/* Outro Lembrete */}
        <div className="flex items-center gap-4">
            <List className="w-7 h-7 text-yellow-500" />
            <div>
                <p className="font-semibold">Outro Lembrete</p>
                <p className="text-sm text-muted-foreground">
                    {nextOther
                        ? `${nextOther.text} - ${formatDateTime(new Date(nextOther.dateTime))}`
                        : "Nenhum outro lembrete"}
                </p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}