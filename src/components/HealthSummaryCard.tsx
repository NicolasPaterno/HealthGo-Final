import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconPill, IconStethoscope, IconListDetails } from "@tabler/icons-react";
import { useState, useEffect } from "react";

// Interface para os lembretes
interface Reminder {
  id: number;
  dateTime: string;
  text: string;
  type: 'consulta' | 'remédio' | 'outros';
}

const REMINDERS_STORAGE_KEY = 'healthgo-reminders';

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


export function HealthSummaryCard() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    // Carrega os lembretes do localStorage ao montar o componente
    if (typeof window !== 'undefined') {
        const savedReminders = localStorage.getItem(REMINDERS_STORAGE_KEY);
        const parsedReminders = savedReminders ? JSON.parse(savedReminders) : [];
        setReminders(parsedReminders);
    }

    // Ouve por mudanças no storage para manter os dados sincronizados entre abas/janelas
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === REMINDERS_STORAGE_KEY && event.newValue) {
        setReminders(JSON.parse(event.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Filtra e ordena os lembretes para pegar apenas os futuros
  const upcomingReminders = reminders
    .filter(r => new Date(r.dateTime) >= new Date())
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

  // Encontra o próximo lembrete de cada categoria
  const nextAppointment = upcomingReminders.find(r => r.type === 'consulta');
  const nextMedication = upcomingReminders.find(r => r.type === 'remédio');
  const nextOther = upcomingReminders.find(r => r.type === 'outros');


  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo da Saúde</CardTitle>
        <CardDescription>Suas próximas atividades de saúde.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Próxima Consulta */}
        <div className="flex items-center gap-4">
            <IconStethoscope className="h-6 w-6 text-primary" />
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
            <IconPill className="h-6 w-6 text-destructive" />
            <div>
                <p className="font-semibold">Próximo Remédio</p>
                <p className="text-sm text-muted-foreground">
                    {nextMedication
                        ? `${nextMedication.text} - ${formatDateTime(new Date(nextMedication.dateTime))}`
                        : "Nenhum remédio agendado"}
                </p>
            </div>
        </div>
        {/* Próximo Outro Lembrete */}
        <div className="flex items-center gap-4">
            <IconListDetails className="h-6 w-6 text-yellow-500" />
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