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
import { useCart } from "@/context/CartContext"
import { ShoppingCart } from "lucide-react"

// Dados de exemplo para os psicólogos (com IDs e preços numéricos)
const psychologists = [
  {
    id: "psico-ana-silva",
    name: "Dr. Ana Silva",
    specialty: "Terapia Cognitivo-Comportamental",
    crp: "CRP 06/12345",
    avatar: "https://via.placeholder.com/150/8A2BE2/FFFFFF?text=AS",
    price: 180.00,
  },
  {
    id: "psico-bruno-costa",
    name: "Dr. Bruno Costa",
    specialty: "Psicanálise e Terapia de Casal",
    crp: "CRP 05/54321",
    avatar: "https://via.placeholder.com/150/32CD32/FFFFFF?text=BC",
    price: 220.00,
  },
  {
    id: "psico-carla-mendes",
    name: "Dra. Carla Mendes",
    specialty: "Psicologia Infantil e Orientação Familiar",
    crp: "CRP 08/67890",
    avatar: "https://via.placeholder.com/150/FF6347/FFFFFF?text=CM",
    price: 150.00,
  },
]

export default function PsychologistPage() {
  const { addToCart } = useCart();

  const handleAddToCart = (psychologist: typeof psychologists[0]) => {
    addToCart({
      id: psychologist.id,
      name: `Sessão com ${psychologist.name}`,
      price: psychologist.price,
      image: psychologist.avatar,
    });
  };

  return (
    <main className="flex-1 p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Encontre um Psicólogo</h1>
        <p className="text-muted-foreground mt-1">
          Profissionais disponíveis para te ajudar a cuidar da sua saúde mental.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {psychologists.map((psychologist) => (
          <Card key={psychologist.id} className="flex flex-col">
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
              <p className="font-semibold text-lg mt-4">R$ {psychologist.price.toFixed(2)} / sessão</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleAddToCart(psychologist)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Adicionar ao Carrinho
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}