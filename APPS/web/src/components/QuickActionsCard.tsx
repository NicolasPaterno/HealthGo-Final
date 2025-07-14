import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarPlus, Hotel, Plane, Stethoscope, Users, Heart, LifeBuoy, Wallet } from "lucide-react";

const actions = [
  { to: "calendar", label: "Agendar", icon: CalendarPlus },
  { to: "psychologist", label: "Psicólogos", icon: Heart },
  { to: "caregivers", label: "Cuidadores", icon: Users },
  { to: "tickets", label: "Passagens", icon: Plane },
  { to: "hotels", label: "Hotéis", icon: Hotel },
  { to: "/settings", label: "Compras", icon: Wallet}
];

export function QuickActionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acesso Rápido</CardTitle>
        <CardDescription>O que você gostaria de fazer hoje?</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {actions.map((action) => (
          <Button
            key={action.to}
            variant="outline"
            className="flex flex-col h-28 w-full"
            asChild
          >
            <Link to={action.to}>
              <action.icon className="h-16 w-16 mb-2" />
              <span>{action.label}</span>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}