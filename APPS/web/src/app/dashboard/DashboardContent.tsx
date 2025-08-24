// APPS/web/src/app/dashboard/DashboardContent.tsx
import { WelcomeBanner } from "@/components/WelcomeBanner";
import { RemindersCard } from "@/components/RemindersCard";
import { QuickActionsCard } from "@/components/QuickActionsCard";
import { HealthSummaryCard } from "@/components/HealthSummaryCard";
import { HealthTipsCard } from "@/components/HealthTipsCard";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { toast } from "sonner";
import { getAuthUser } from "@/lib/jwt"; // Make sure this import is correct

// Interfaces that already defined
interface Reminder {
  id: number;
  dateTime: string;
  text: string;
  type: "consulta" | "remédio" | "outro"; // Changed 'outros' to 'outro'
}

interface ApiReminder {
  id: number;
  titulo: string;
  data: string;
  tipo: "Consulta" | "Remédio" | "Outro"; // Ensure this matches backend enum exactly
  pessoa_Id: number;
}

interface User {
  id: number;
  nome: string;
  email: string;
  // Include other fields if your /Pessoa/me returns them and you need them here
  // e.g., dataNascimento: string;
}

export default function DashboardContent() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchCurrentUserAndReminders = async () => {
      setIsLoading(true);
      try {
        const decodedUser = getAuthUser();
        if (!decodedUser) {
          toast.error("Sessão expirada", {
            description: "Por favor, faça login novamente.",
          });
          // Redirect to login if no valid token
          window.location.href = "/login";
          return;
        }

        // Fetch full user data from /Pessoa/me for up-to-date info
        // (Assuming you have implemented the /Pessoa/me endpoint as discussed previously)
        const userResponse = await api.get(
          `/Pessoa/${parseInt(decodedUser.nameid)}`
        ); // Fetching user by ID directly from token claim
        setCurrentUser(userResponse.data);

        // Fetch reminders for the fetched user ID
        const response = await api.get(
          `/Lembrete/Pessoa/${userResponse.data.id}`
        );
        if (response.data && Array.isArray(response.data.data)) {
          const formattedReminders = response.data.data.map(
            (r: ApiReminder) => ({
              id: r.id,
              text: r.titulo,
              dateTime: r.data,
              // Convert to lowercase and ensure 'Outro' for consistency
              type:
                r.tipo.toLowerCase() === "outros"
                  ? "outro"
                  : (r.tipo.toLowerCase() as "consulta" | "remédio" | "outro"),
            })
          );
          setReminders(formattedReminders);
        } else {
          setReminders([]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário ou lembretes:", error);
        toast.error("Erro ao carregar dados do dashboard.");
        setReminders([]);
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUserAndReminders();
  }, []); // Empty dependency array to run only once on mount

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
