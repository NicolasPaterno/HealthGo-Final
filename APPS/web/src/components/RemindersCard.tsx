'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IconArrowRight, IconBell } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "@/services/api"; 
import { toast } from "sonner"; 

interface Reminder {
  id: number;
  dateTime: string;
  text: string;
  type: 'consulta' | 'remédio' | 'outros';
}

const typeBadgeVariant = {
  consulta: "default",
  remédio: "destructive",
  outros: "secondary",
} as const;


export function RemindersCard() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await api.get(`/Lembrete/Pessoa/23`); 
        if (response.data && Array.isArray(response.data.data)) {
            setReminders(response.data.data);
        } else {
            setReminders([]);
        }
      } catch (error) {
        console.error("Erro ao buscar lembretes:", error);
        toast.error("Erro ao carregar lembretes", {
            description: "Não foi possível buscar seus lembretes. Tente novamente mais tarde.",
        });
        setReminders([]); 
      } finally {
          setIsLoading(false);
      }
    };

    fetchReminders();
  }, []); 

  const upcomingReminders = reminders
    .filter(r => new Date(r.dateTime) >= new Date())
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
    .slice(0, 5); 

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconBell size={22} />
          <span>Próximos Lembretes</span>
        </CardTitle>
        <CardDescription>
          Seus próximos 5 lembretes agendados.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ScrollArea className="h-[250px] pr-4">
          {isLoading ? (
            <div className="text-center text-muted-foreground pt-16">
              <p>Carregando lembretes...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingReminders.length > 0 ? (
                upcomingReminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{reminder.text}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(reminder.dateTime).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                        })}{' '}
                        às{' '}
                        {new Date(reminder.dateTime).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <Badge variant={typeBadgeVariant[reminder.type] || "secondary"} className="capitalize">
                      {reminder.type}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground pt-16">
                  <p>Nenhum lembrete futuro.</p>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <div className="p-4 border-t">
          <Button asChild variant="outline" className="w-full">
            <Link to="calendar">
              Ver todos os lembretes
              <IconArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
      </div>
    </Card>
  );
}