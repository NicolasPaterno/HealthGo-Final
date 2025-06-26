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
import { IconShoppingCart } from "@tabler/icons-react"

// Dados de exemplo para os hotéis (com IDs e preços numéricos)
const hotels = [
  {
    id: "hotel-palace",
    name: "Hotel Palace",
    description: "Um hotel de luxo no coração da cidade com vista panorâmica.",
    price: 550.00,
    image: "https://via.placeholder.com/300x200/8B4513/FFFFFF?text=Hotel+Palace",
  },
  {
    id: "pousada-beira-mar",
    name: "Pousada Beira Mar",
    description: "Aconchegante e com acesso direto à praia. Ideal para famílias.",
    price: 320.00,
    image: "https://via.placeholder.com/300x200/1E90FF/FFFFFF?text=Beira+Mar",
  },
  {
    id: "resort-montanhas",
    name: "Resort das Montanhas",
    description: "Refúgio tranquilo com spa, piscinas e atividades ao ar livre.",
    price: 780.00,
    image: "https://via.placeholder.com/300x200/228B22/FFFFFF?text=Resort",
  },
]

export default function HotelsPage() {
  const { addToCart } = useCart();

  const handleAddToCart = (hotel: typeof hotels[0]) => {
    addToCart({
      id: hotel.id,
      name: hotel.name,
      price: hotel.price,
      image: hotel.image,
    });
  };

  return (
    <main className="flex-1 p-6">
      <header>
        <h1 className="text-3xl font-bold">Catálogo de Hotéis</h1>
        <p className="text-muted-foreground mt-1">
          Confira os hotéis disponíveis para sua próxima viagem.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {hotels.map((hotel) => (
          <Card key={hotel.id}>
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
              <p className="font-semibold">R$ {hotel.price.toFixed(2)}/noite</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleAddToCart(hotel)} className="w-full">
                 <IconShoppingCart className="mr-2 h-4 w-4" />
                Adicionar ao Carrinho
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}