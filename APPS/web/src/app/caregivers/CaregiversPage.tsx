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

// Dados de exemplo para os cuidadores (com IDs e preços numéricos)
const caregivers = [
  {
    id: "cuidador-marcos-rocha",
    name: "Marcos Rocha",
    specialty: "Cuidados com idosos e mobilidade reduzida",
    availability: "Diurno e Noturno",
    avatar: "https://via.placeholder.com/150/1E90FF/FFFFFF?text=MR",
    price: 25.00,
  },
  {
    id: "cuidador-lucia-pereira",
    name: "Lúcia Pereira",
    specialty: "Acompanhamento pós-operatório",
    availability: "Flexível (a combinar)",
    avatar: "https://via.placeholder.com/150/FFD700/000000?text=LP",
    price: 30.00,
  },
  {
    id: "cuidador-fernando-alves",
    name: "Fernando Alves",
    specialty: "Cuidados paliativos e acompanhamento hospitalar",
    availability: "24 horas",
    avatar: "https://via.placeholder.com/150/DC143C/FFFFFF?text=FA",
    price: 35.00,
  },
]

export default function CaregiversPage() {
  const { addToCart } = useCart();

  const handleAddToCart = (caregiver: typeof caregivers[0]) => {
    addToCart({
      id: caregiver.id,
      name: `Serviço de ${caregiver.name}`,
      price: caregiver.price,
      image: caregiver.avatar,
    });
  };

  return (
    <main className="flex-1 p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Contrate um Cuidador</h1>
        <p className="text-muted-foreground mt-1">
          Cuidadores qualificados para oferecer o melhor suporte.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caregivers.map((caregiver) => (
          <Card key={caregiver.id} className="flex flex-col">
            <CardHeader className="flex-row gap-4 items-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={caregiver.avatar} alt={caregiver.name} />
                <AvatarFallback>{caregiver.name.match(/\b(\w)/g)?.join("")}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{caregiver.name}</CardTitle>
                <CardDescription>
                  Disponibilidade: {caregiver.availability}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <Badge variant="outline">{caregiver.specialty}</Badge>
              <p className="font-semibold text-lg mt-4">R$ {caregiver.price.toFixed(2)} / hora</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleAddToCart(caregiver)}>
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