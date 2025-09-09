import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Clock, Users, ChevronLeft, ChevronRight, User } from "lucide-react";
import api from "@/services/api";
import { toast } from "sonner";
import { PrestadorDetailModal } from "@/components/prestador-detail-modal";

interface PrestadorServico {
  id?: number;
  nomePessoa: string;
  email: string;
  cidade: string;
  estado: string;
  telefone: string;
  role: string;
  rua: string;
  numeroEndereco: string;
  bairro: string;
  enderecoFoto: string;
  precoHora: number;
  observacao: string;
  especialidade: string;
}

export default function PrestadoresPage() {
  const [prestadores, setPrestadores] = useState<PrestadorServico[]>([]);
  const [filteredPrestadores, setFilteredPrestadores] = useState<PrestadorServico[]>([]);
  const [selectedEspecialidade, setSelectedEspecialidade] = useState<string>("todas");
  const [selectedEstado, setSelectedEstado] = useState<string>("todos");
  const [selectedCidade, setSelectedCidade] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [estados, setEstados] = useState<string[]>([]);

  const [selectedPrestador, setSelectedPrestador] = useState<PrestadorServico | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPrestadores();
  }, []);

  useEffect(() => {
    if (prestadores.length > 0) {
      filterPrestadores();
    }
  }, [selectedEspecialidade, selectedEstado, selectedCidade, prestadores]);

  const fetchPrestadores = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/PrestadorServico/com-especialidades");
      
      if (response.data && Array.isArray(response.data)) {
        setPrestadores(response.data);
        setFilteredPrestadores(response.data);
        
        const especialidadesUnicas = [...new Set(response.data.map((p: PrestadorServico) => p.especialidade))];
        setEspecialidades(especialidadesUnicas.sort());
        
        const estadosUnicos = [...new Set(response.data.map((p: PrestadorServico) => p.estado))];
        setEstados(estadosUnicos.sort());
        

      }
    } catch (error) {
      console.error("Erro ao buscar prestadores:", error);
      toast.error("Erro ao carregar prestadores de serviço");
    } finally {
      setIsLoading(false);
    }
  };

  const filterPrestadores = () => {
    let filtered = [...prestadores];

    if (selectedEspecialidade !== "todas") {
      filtered = filtered.filter(prestador => prestador.especialidade === selectedEspecialidade);
    }

    if (selectedEstado !== "todos") {
      filtered = filtered.filter(prestador => prestador.estado === selectedEstado);
    }

    if (selectedCidade && selectedCidade.trim() !== "") {
      filtered = filtered.filter(prestador => 
        prestador.cidade.toLowerCase().includes(selectedCidade.toLowerCase())
      );
    }

    setFilteredPrestadores(filtered);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleContact = (prestador: PrestadorServico) => {
    setSelectedPrestador(prestador);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPrestador(null);
  };

  const scrollContainer = (direction: 'left' | 'right', containerId: string) => {
    const container = document.getElementById(containerId);
    if (container) {
      const scrollAmount = 400;
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  const groupPrestadoresByEspecialidade = () => {
    const grouped: { [key: string]: PrestadorServico[] } = {};
    
    filteredPrestadores.forEach(prestador => {
      if (!grouped[prestador.especialidade]) {
        grouped[prestador.especialidade] = [];
      }
      grouped[prestador.especialidade].push(prestador);
    });
    
    return grouped;
  };



  const handleCidadeChange = (value: string) => {
    setSelectedCidade(value);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const groupedPrestadores = groupPrestadoresByEspecialidade();

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prestadores de Serviço</h1>
          <p className="text-muted-foreground">
            Encontre profissionais qualificados para suas necessidades
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Especialidade:</span>
            <Select value={selectedEspecialidade} onValueChange={setSelectedEspecialidade}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecione uma especialidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as especialidades</SelectItem>
                {especialidades.map((especialidade) => (
                  <SelectItem key={especialidade} value={especialidade}>
                    {especialidade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Estado:</span>
                         <Select value={selectedEstado} onValueChange={(value) => {
               setSelectedEstado(value);
               setSelectedCidade("");
             }}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Selecione um estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os estados</SelectItem>
                {estados.map((estado) => (
                  <SelectItem key={estado} value={estado}>
                    {estado}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
                     <div className="flex items-center space-x-2">
             <span className="text-sm font-medium">Cidade:</span>
             <Input
               type="text"
               placeholder="Digite o nome da cidade"
               value={selectedCidade}
               onChange={(e) => handleCidadeChange(e.target.value)}
               className="w-[200px]"
             />
           </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge variant="secondary">
            {filteredPrestadores.length} prestador{filteredPrestadores.length !== 1 ? 'es' : ''} encontrado{filteredPrestadores.length !== 1 ? 's' : ''}
          </Badge>
          
                     {(selectedEspecialidade !== "todas" || selectedEstado !== "todos" || selectedCidade.trim() !== "") && (
            <Button
              variant="outline"
              size="sm"
                             onClick={() => {
                 setSelectedEspecialidade("todas");
                 setSelectedEstado("todos");
                 setSelectedCidade("");
               }}
            >
              Limpar Filtros
            </Button>
          )}
        </div>
      </div>

      {selectedEspecialidade === "todas" && filteredPrestadores.length > 0 ? (
        <div className="space-y-8">
          {Object.entries(groupedPrestadores).map(([especialidade, prestadoresCategoria]) => (
            <div key={especialidade} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{especialidade}</h2>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => scrollContainer('left', `carousel-${especialidade}`)}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => scrollContainer('right', `carousel-${especialidade}`)}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div 
                id={`carousel-${especialidade}`}
                className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {prestadoresCategoria.map((prestador, index) => (
                  <Card key={index} className="min-w-[280px] hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                            {prestador.enderecoFoto && prestador.enderecoFoto !== "default.jpg" ? (
                              <img
                                src={prestador.enderecoFoto}
                                alt={prestador.nomePessoa}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="h-6 w-6 text-primary" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{prestador.nomePessoa}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              {prestador.especialidade}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Localização */}
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{prestador.cidade}, {prestador.estado}</span>
                      </div>

                      {/* Preço */}
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold text-lg text-primary">
                          {formatCurrency(prestador.precoHora)}/hora
                        </span>
                      </div>

                      {/* Observação */}
                      {prestador.observacao && (
                        <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                          {prestador.observacao}
                        </p>
                      )}

                      {/* Contato */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{prestador.telefone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="overflow-hidden text-ellipsis whitespace-nowrap">{prestador.email}</span>
                        </div>
                      </div>

                      {/* Botão de Contato */}
                      <Button 
                        onClick={() => handleContact(prestador)}
                        className="w-full"
                        size="sm"
                      >
                        Contratar
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPrestadores.map((prestador, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                      {prestador.enderecoFoto && prestador.enderecoFoto !== "default.jpg" ? (
                        <img
                          src={prestador.enderecoFoto}
                          alt={prestador.nomePessoa}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{prestador.nomePessoa}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {prestador.especialidade}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Localização */}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{prestador.cidade}, {prestador.estado}</span>
                </div>

                {/* Preço */}
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-lg text-primary">
                    {formatCurrency(prestador.precoHora)}/hora
                  </span>
                </div>

                {/* Observação */}
                {prestador.observacao && (
                  <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                    {prestador.observacao}
                  </p>
                )}

                {/* Contato */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{prestador.telefone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">{prestador.email}</span>
                  </div>
                </div>

                {/* Botão de Contato */}
                <Button 
                  onClick={() => handleContact(prestador)}
                  className="w-full"
                  size="sm"
                >
                  Entrar em Contato
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredPrestadores.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            <Users className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Nenhum prestador encontrado</h3>
            <p>Tente ajustar os filtros ou verifique novamente mais tarde.</p>
          </div>
        </div>
      )}

      <PrestadorDetailModal
        prestador={selectedPrestador}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
