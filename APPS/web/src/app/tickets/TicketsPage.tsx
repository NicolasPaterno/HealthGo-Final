import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api"; // Importar o módulo api
import { useCart } from "@/context/CartContext" // Importe o useCart
import { toast } from "sonner";
import {
  MapPin,
  Plane,
  ShoppingCart,
} from "lucide-react"

interface Ticket {
  origem: string;
  destino: string;
  nomeAeroportoOrigem: string;
  nomeAeroportoDestino: string;
  cidadeOrigem: string;
  cidadeDestino: string;
  numeroVoo: string;
  tipoAssento: "Primeira Classe" | "Executiva" | "Econômica";
  preco: number;
  companhia: string;
}

// Os dados mockados 'tickets' serão removidos, pois utilizaremos o endpoint.

export default function TicketsPage() {
  const { addToCart } = useCart(); 
  const [allTickets, setAllTickets] = useState<Ticket[]>([]); // Todos os tickets do endpoint
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [selectedOrigem, setSelectedOrigem] = useState("");
  const [selectedDestino, setSelectedDestino] = useState("");
  const [selectedTipoAssento, setSelectedTipoAssento] = useState("todos");
  const [maxValor, setMaxValor] = useState<number | "">(Infinity);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tiposAssento = ["Primeira Classe", "Executiva", "Econômica"];

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get("/Voo/detalhado");
        if (response.data && Array.isArray(response.data.data)) {
          setAllTickets(response.data.data.map((item: any) => ({
            origem: item.origem,
            destino: item.destino,
            nomeAeroportoOrigem: item.nomeAeroportoOrigem,
            nomeAeroportoDestino: item.nomeAeroportoDestino,
            cidadeOrigem: item.cidadeOrigem,
            cidadeDestino: item.cidadeDestino,
            numeroVoo: item.numeroVoo,
            tipoAssento: item.tipoAssento,
            preco: item.preco,
            companhia: item.companhia,
          })));
        } else {
          setAllTickets([]);
          toast.error("Erro", { description: "Formato de dados inesperado." });
        }
      } catch (err) {
        console.error("Erro ao buscar voos:", err);
        setError("Falha ao carregar passagens. Tente novamente mais tarde.");
        toast.error("Erro", { description: "Falha ao carregar passagens." });
      } finally {
        setIsLoading(false);
      }
    };
    fetchTickets();
  }, []); // Executa apenas uma vez ao montar o componente

  useEffect(() => {
    filterTickets();
  }, [selectedOrigem, selectedDestino, selectedTipoAssento, maxValor, allTickets]);

  const filterTickets = () => {
    let filtered = [...allTickets];

    if (selectedOrigem.trim() !== "") {
      filtered = filtered.filter(ticket =>
        ticket.nomeAeroportoOrigem.toLowerCase().includes(selectedOrigem.toLowerCase()) ||
        ticket.cidadeOrigem.toLowerCase().includes(selectedOrigem.toLowerCase())
      );
    }

    if (selectedDestino.trim() !== "") {
      filtered = filtered.filter(ticket =>
        ticket.nomeAeroportoDestino.toLowerCase().includes(selectedDestino.toLowerCase()) ||
        ticket.cidadeDestino.toLowerCase().includes(selectedDestino.toLowerCase())
      );
    }

    if (selectedTipoAssento !== "todos") {
      filtered = filtered.filter(ticket => ticket.tipoAssento === selectedTipoAssento);
    }

    if (maxValor !== "" && maxValor !== Infinity) {
      filtered = filtered.filter(ticket => ticket.preco <= maxValor);
    }

    setFilteredTickets(filtered);
  };

  const handleAddToCart = (ticket: Ticket) => {
    const originDisplay = ticket.cidadeOrigem + (ticket.origem ? ` (${ticket.origem})` : '');
    const destinationDisplay = ticket.cidadeDestino + (ticket.destino ? ` (${ticket.destino})` : '');

    addToCart({
      id: ticket.numeroVoo + ticket.tipoAssento, // Usar uma combinação para ID único no carrinho
      name: `Passagem: ${originDisplay} para ${destinationDisplay} - ${ticket.tipoAssento}`,
      price: ticket.preco,
      quantity: 1,
      type: "flight",
      class: ticket.tipoAssento,
      flightNumber: ticket.numeroVoo, // Adicionar o número do voo original
    });
  };

  const handleMaxValorChange = (value: string) => {
    const numValue = parseFloat(value);
    setMaxValor(isNaN(numValue) ? "" : numValue);
  };

  const handleClearFilters = () => {
    setSelectedOrigem("");
    setSelectedDestino("");
    setSelectedTipoAssento("todos");
    setMaxValor(Infinity);
  };

  return (
    <main className="flex-1 p-4 md:p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Plane className="size-8 text-primary" />
            <CardTitle className="text-2xl">Passagens Aéreas Médicas</CardTitle>
          </div>
          
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="space-y-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Origem:</span>
                <Input
                  type="text"
                  placeholder="Origem"
                  value={selectedOrigem}
                  onChange={(e) => setSelectedOrigem(e.target.value)}
                  className="w-[120px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Destino:</span>
                <Input
                  type="text"
                  placeholder="Destino"
                  value={selectedDestino}
                  onChange={(e) => setSelectedDestino(e.target.value)}
                  className="w-[120px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Assento:</span>
                <Select value={selectedTipoAssento} onValueChange={setSelectedTipoAssento}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    {tiposAssento.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Valor Máximo:</span>
                <Input
                  type="number"
                  placeholder="Max. Valor"
                  value={maxValor === Infinity || maxValor === 0 ? "" : maxValor}
                  onChange={(e) => handleMaxValorChange(e.target.value)}
                  className="w-[120px]"
                />
              </div>
            </div>

            {(selectedOrigem.trim() !== "" || selectedDestino.trim() !== "" || selectedTipoAssento !== "todos" || (maxValor !== Infinity && maxValor !== "")) && (
              <div className="flex justify-between items-center">
                <Badge variant="secondary">
                  {filteredTickets.length} passagem{filteredTickets.length !== 1 ? 'ns' : ''} encontrada{filteredTickets.length !== 1 ? 's' : ''}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearFilters}
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>

          <div className="border rounded-lg">
            {isLoading && (
              <div className="p-4 text-center">
                <p>Carregando passagens...</p>
              </div>
            )}
            {error && (
              <div className="p-4 text-center text-red-500">
                <p>{error}</p>
              </div>
            )}
            {!isLoading && !error && filteredTickets.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">
                <p>Nenhuma passagem encontrada com os filtros aplicados.</p>
              </div>
            )}
            {!isLoading && !error && filteredTickets.map((ticket, index) => (
              <div
                key={`${ticket.numeroVoo}-${ticket.tipoAssento}`}
                className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 ${index < filteredTickets.length - 1 ? "border-b" : ""}`}
              >
                {/* Informações do Voo */}
                <div className="flex-grow">
                  <h3 className="font-bold text-lg">
                    {ticket.cidadeOrigem} {ticket.origem ? `(${ticket.origem})` : ''} → {ticket.cidadeDestino} {ticket.destino ? `(${ticket.destino})` : ''}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {ticket.companhia} - Voo {ticket.numeroVoo} - {ticket.tipoAssento}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span>{ticket.cidadeOrigem}, {ticket.nomeAeroportoOrigem}</span>
                    {/* Removido Star e Rating pois não estão no endpoint */}
                  </div>
                </div>

                {/* Preço e Botão */}
                <div className="flex flex-col items-start md:items-end gap-2 shrink-0 w-full md:w-auto mt-4 md:mt-0">
                  <div className="text-right">
                    <p className="text-2xl font-bold">R$ {ticket.preco.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">por viagem</p>
                  </div>
                  {/* Botão modificado para adicionar ao carrinho */}
                  <Button className="w-full md:w-auto" onClick={() => handleAddToCart(ticket)}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
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