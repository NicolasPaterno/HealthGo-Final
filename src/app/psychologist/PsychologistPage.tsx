import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Dados de exemplo para os psicólogos
const psychologists = [
  {
    name: "Dr. Ana Silva",
    specialty: "Terapia Cognitivo-Comportamental",
    crp: "CRP 06/12345",
    avatar: "https://via.placeholder.com/150/8A2BE2/FFFFFF?text=AS",
    price: "R$ 180,00 / sessão",
  },
  {
    name: "Dr. Bruno Costa",
    specialty: "Psicanálise e Terapia de Casal",
    crp: "CRP 05/54321",
    avatar: "https://via.placeholder.com/150/32CD32/FFFFFF?text=BC",
    price: "R$ 220,00 / sessão",
  },
  {
    name: "Dra. Carla Mendes",
    specialty: "Psicologia Infantil e Orientação Familiar",
    crp: "CRP 08/67890",
    avatar: "https://via.placeholder.com/150/FF6347/FFFFFF?text=CM",
    price: "R$ 150,00 / sessão",
  },
]

export default function PsychologistPage() {
  return (
    <main className="flex-1 p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Encontre um Psicólogo</h1>
        <p className="text-muted-foreground mt-1">
          Profissionais disponíveis para te ajudar a cuidar da sua saúde mental.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {psychologists.map((psychologist, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="flex-row gap-4 items-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={psychologist.avatar} alt={psychologist.name} />
                <AvatarFallback>{psychologist.name.match(/\b(\w)/g)?.join("")}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{psychologist.name}</CardTitle>
                <CardDescription>{psychologist.crp}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <Badge variant="secondary">{psychologist.specialty}</Badge>
              <p className="font-semibold text-lg mt-4">{psychologist.price}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Agendar Consulta</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}