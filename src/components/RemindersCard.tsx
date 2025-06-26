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

// 1. Interface movida para um local que possa ser compartilhado ou duplicada aqui
interface Reminder {
  id: number;
  dateTime: string;
  text: string;
  type: 'consulta' | 'remédio' | 'outros';
}

const REMINDERS_STORAGE_KEY = 'healthgo-reminders';

const typeBadgeVariant = {
  consulta: "default",
  remédio: "destructive",
  outros: "secondary",
} as const;


export function RemindersCard() {
  // 2. O estado é carregado do localStorage
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    if (typeof window === 'undefined') return [];
    const savedReminders = localStorage.getItem(REMINDERS_STORAGE_KEY);
    return savedReminders ? JSON.parse(savedReminders) : [];
  });
  
  // 3. Efeito para manter os dados sincronizados entre abas
  useEffect(() => {
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