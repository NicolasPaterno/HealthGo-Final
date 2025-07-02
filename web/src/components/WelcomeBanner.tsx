import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function WelcomeBanner() {
  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo ao HealthGo!</CardTitle>
          <CardDescription>
            Sua plataforma completa para cuidados com a saúde.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Aqui você pode gerenciar seus agendamentos, encontrar profissionais, e cuidar do seu bem-estar.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}