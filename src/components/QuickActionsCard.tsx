import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IconCalendarPlus, IconHotelService, IconPlane, IconStethoscope, IconUsers, IconUserHeart } from "@tabler/icons-react";

const actions = [
  { to: "calendar", label: "Agendar", icon: IconCalendarPlus },
  { to: "psychologist", label: "Psicólogos", icon: IconUserHeart },
  { to: "caregivers", label: "Cuidadores", icon: IconUsers },
  { to: "tickets", label: "Passagens", icon: IconPlane },
  { to: "hotels", label: "Hotéis", icon: IconHotelService },
];

export function QuickActionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acesso Rápido</CardTitle>
        <CardDescription>O que você gostaria de fazer hoje?</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {actions.map((action) => (
          <Button
            key={action.to}
            variant="outline"
            className="flex flex-col h-24 w-full"
            asChild
          >
            <Link to={action.to}>
              <action.icon className="h-8 w-8 mb-2" />
              <span>{action.label}</span>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}