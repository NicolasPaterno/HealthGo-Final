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
import { ArrowRight, Bell } from "lucide-react";
import { Link } from "react-router-dom";

interface Reminder {
  id: number;
  dateTime: string;
  text: string;
  type: 'consulta' | 'remédio' | 'outro';
}

interface RemindersCardProps {
  reminders: Reminder[];
  isLoading: boolean;
}

const typeBadgeVariant = {
  consulta: "default",
  remédio: "destructive",
  outro: "secondary",
} as const;


export function RemindersCard({ reminders, isLoading }: RemindersCardProps) {
  const upcomingReminders = reminders
    .filter(r => new Date(r.dateTime) >= new Date())
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
    .slice(0, 5);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell size={22} />
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
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
      </div>
    </Card>
  );
}