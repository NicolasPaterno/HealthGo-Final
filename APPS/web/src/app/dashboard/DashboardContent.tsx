import { WelcomeBanner } from "@/components/WelcomeBanner";
import { RemindersCard } from "@/components/RemindersCard";
import { QuickActionsCard } from "@/components/QuickActionsCard";
import { HealthSummaryCard } from "@/components/HealthSummaryCard";
import { HealthTipsCard } from "@/components/HealthTipsCard";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { toast } from "sonner";

// Interfaces que já definimos antes
interface Reminder {
  id: number;
  dateTime: string;
  text: string;
  type: 'consulta' | 'remédio' | 'outros';
}

interface ApiReminder {
    id: number;
    titulo: string;
    data: string;
    tipo: 'consulta' | 'remédio' | 'outros';
    pessoa_Id: number;
}

interface User {
  id: number;
  nome: string;
  email: string;
}

export default function DashboardContent() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      setCurrentUser(JSON.parse(userDataString));
    } else {
      setIsLoading(false); 
    }
  }, []);

  useEffect(() => {
    const fetchReminders = async () => {
      if (!currentUser) return;
      setIsLoading(true);
      try {
        const response = await api.get(`/Lembrete/Pessoa/${currentUser.id}`);
        if (response.data && Array.isArray(response.data.data)) {
          const formattedReminders = response.data.data.map((r: ApiReminder) => ({
            id: r.id,
            text: r.titulo,
            dateTime: r.data,
            // Convertendo para minúsculas para corresponder aos tipos do front-end
            type: r.tipo.toLowerCase() as 'consulta' | 'remédio' | 'outros',
          }));
          setReminders(formattedReminders);
        } else {
          setReminders([]);
        }
      } catch (error) {
        console.error("Erro ao buscar lembretes:", error);
        toast.error("Erro ao carregar lembretes para o dashboard.");
        setReminders([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser) {
      fetchReminders();
    }
  }, [currentUser]);

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <WelcomeBanner />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 lg:px-6">
        <div className="lg:col-span-2">
          <QuickActionsCard />
        </div>
        <HealthSummaryCard reminders={reminders} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 lg:px-6">
        <div className="lg:col-span-2">
          <RemindersCard reminders={reminders} isLoading={isLoading} />
        </div>
        <div className="flex flex-col gap-4">
          <HealthTipsCard />
        </div>
      </div>
    </div>
  );
}