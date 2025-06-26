import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/context/CartContext" // Importe o useCart
import {
  IconMapPin,
  IconPlane,
  IconShoppingCart,
  IconStar,
} from "@tabler/icons-react"

const tickets = [
  {
    id: "ticket-sp-rio", 
    from: "São Paulo",
    to: "Rio de Janeiro",
    description: "Voo direto com assistência médica especializada",
    company: "TAM",
    rating: 4.8,
    price: 380.00, 
  },
  {
    id: "ticket-bsb-ssa",
    from: "Brasília",
    to: "Salvador",
    description: "Voo com escala - Adaptado para cadeirantes",
    company: "GOL",
    rating: 4.6,
    price: 420.00,
  },
  {
    id: "ticket-for-mao",
    from: "Fortaleza",
    to: "Manaus",
    description: "Voo direto com oxigênio medicinal disponível",
    company: "AZUL",
    rating: 4.5,
    price: 520.00,
  },
]

export default function TicketsPage() {
  const { addToCart } = useCart(); 

  const handleAddToCart = (ticket: typeof tickets[0]) => {
    addToCart({
      id: ticket.id,
      name: `Passagem: ${ticket.from} para ${ticket.to}`,
      price: ticket.price,
    });
  };

  return (
    <main className="flex-1 p-4 md:p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <IconPlane className="size-8 text-primary" />
            <CardTitle className="text-2xl">Passagens Aéreas Médicas</CardTitle>
          </div>
          <Button variant="outline">Ver mais</Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            {tickets.map((ticket, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 ${index < tickets.length - 1 ? "border-b" : ""}`}
              >
                {/* Informações do Voo */}
                <div className="flex-grow">
                  <h3 className="font-bold text-lg">
                    {ticket.from} → {ticket.to}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {ticket.description} • {ticket.company}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <IconMapPin className="mr-1 h-4 w-4" />
                    <span>{ticket.from}</span>
                    <IconStar className="ml-3 mr-1 h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>{ticket.rating}</span>
                  </div>
                </div>

                {/* Preço e Botão */}
                <div className="flex flex-col items-start md:items-end gap-2 shrink-0 w-full md:w-auto mt-4 md:mt-0">
                  <div className="text-right">
                    <p className="text-2xl font-bold">R$ {ticket.price.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">por viagem</p>
                  </div>
                  {/* Botão modificado para adicionar ao carrinho */}
                  <Button className="w-full md:w-auto" onClick={() => handleAddToCart(ticket)}>
                    <IconShoppingCart className="mr-2 h-4 w-4" />
                    Comprar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}