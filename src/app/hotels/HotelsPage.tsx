import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Dados de exemplo para os hotéis
const hotels = [
  {
    name: "Hotel Palace",
    description: "Um hotel de luxo no coração da cidade com vista panorâmica.",
    price: "R$ 550,00/noite",
    image: "https://via.placeholder.com/300x200.png?text=Hotel+Palace",
  },
  {
    name: "Pousada Beira Mar",
    description: "Aconchegante e com acesso direto à praia. Ideal para famílias.",
    price: "R$ 320,00/noite",
    image: "https://via.placeholder.com/300x200.png?text=Pousada+Beira+Mar",
  },
  {
    name: "Resort das Montanhas",
    description: "Refúgio tranquilo com spa, piscinas e atividades ao ar livre.",
    price: "R$ 780,00/noite",
    image: "https://via.placeholder.com/300x200.png?text=Resort+das+Montanhas",
  },
]

export default function HotelsPage() {
  return (
    <main className="flex-1 p-6">
      <header>
        <h1 className="text-3xl font-bold">Catálogo de Hotéis</h1>
        <p className="text-muted-foreground mt-1">
          Confira os hotéis disponíveis para sua próxima viagem.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {hotels.map((hotel, index) => (
          <Card key={index}>
            <CardHeader>
              <img
                src={hotel.image}
                alt={`Imagem do ${hotel.name}`}
                className="rounded-t-lg w-full h-40 object-cover"
              />
              <CardTitle className="mt-4">{hotel.name}</CardTitle>
              <CardDescription>{hotel.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{hotel.price}</p>
            </CardContent>
            <CardFooter>
              <Button>Ver detalhes</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}