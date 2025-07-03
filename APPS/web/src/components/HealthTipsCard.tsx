import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconBottle, IconBowl, IconHeartbeat, IconMoon } from "@tabler/icons-react";

const tips = [
  {
    icon: IconBottle,
    title: "Hidrate-se",
    description: "Beber água ao longo do dia é essencial para o corpo.",
    color: "text-blue-500",
  },
  {
    icon: IconBowl,
    title: "Coma bem",
    description: "Uma dieta balanceada fornece os nutrientes necessários.",
    color: "text-green-500",
  },
   {
    icon: IconHeartbeat,
    title: "Movimente-se",
    description: "Atividades físicas regulares melhoram a saúde geral.",
    color: "text-red-500",
  },
  {
    icon: IconMoon,
    title: "Descanse",
    description: "Uma boa noite de sono é crucial para a recuperação.",
    color: "text-purple-500",
  },
];

export function HealthTipsCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Dicas de Saúde</CardTitle>
        <CardDescription>Pequenos hábitos que fazem a diferença.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {tips.map((tip) => (
          <div key={tip.title} className="flex items-center gap-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted ${tip.color}`}>
              <tip.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold">{tip.title}</p>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}