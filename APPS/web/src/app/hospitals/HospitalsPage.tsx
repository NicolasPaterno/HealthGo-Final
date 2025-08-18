// APPS/web/src/app/hospitals/HospitalsPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Hospital, MapPin, Building, Hotel } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HospitalData {
  cnes: string;
  nome: string;
  razaoSocial: string;
  naturezaJuridica: string;
  tipoUnidade: string;
  uf: string;
  municipio: string;
  bairro: string;
  logradouro: string;
  numeroEndereco: string;
  cep: string;
}

export default function HospitalsPage() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState<HospitalData[]>([]);
  const [uf, setUf] = useState('SC');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 21;

  const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

  useEffect(() => {
    const fetchHospitals = async () => {
      if (!uf) return;
      setLoading(true);
      try {
        const response = await api.get(`/Hospitais`, {
          params: {
            uf,
            limit,
            page: currentPage,
            nome: searchTerm
          }
        });
        setHospitals(response.data.data);
        setTotalPages(Math.ceil(response.data.total / limit));
      } catch (error) {
        console.error("Erro ao buscar hospitais:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [uf, currentPage, searchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleFindHotels = (hospital: HospitalData) => {
    // Criar parâmetros de busca para hotéis próximos ao hospital
    const searchParams = new URLSearchParams();

    // Adicionar cidade como filtro principal
    if (hospital.municipio) {
      searchParams.set('city', hospital.municipio);
    }

    // Adicionar bairro como termo de busca
    if (hospital.bairro) {
      searchParams.set('search', hospital.bairro);
    }

    // Adicionar estado como contexto adicional
    if (hospital.uf) {
      searchParams.set('state', hospital.uf);
    }

    // Navegar para a página de hotéis com os filtros aplicados
    navigate(`/dashboard/hotels?${searchParams.toString()}`);
  };

  return (
    <main className="flex-1 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Hospital className="size-8" />
          Hospitais e Leitos
        </h1>
        <p className="text-muted-foreground mt-1">
          Consulte informações de hospitais por estado.
        </p>
      </header>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Select onValueChange={(value) => { setUf(value); setCurrentPage(0); }} defaultValue={uf}>
          <SelectTrigger className="w-full md:w-[280px]">
            <SelectValue placeholder="Selecione um estado" />
          </SelectTrigger>
          <SelectContent>
            {ufs.map(uf => (
              <SelectItem key={uf} value={uf}>{uf}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Pesquisar por nome do hospital ou cidade..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:flex-1"
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Carregando hospitais...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.map((hospital) => (
              <Card key={hospital.cnes} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{hospital.nome || "Nome não informado"}</CardTitle>
                  <CardDescription className="flex items-center gap-1.5 pt-1 text-xs">
                    <Building size={12} /> {hospital.razaoSocial || "Não informado"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <Badge variant="secondary">{hospital.tipoUnidade || "Não informado"}</Badge>
                    <Badge variant="outline" className="capitalize">
                      {hospital.naturezaJuridica?.replace(/_/g, ' ').toLowerCase() || 'Não informado'}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1 pt-2 border-t">
                    <p className="flex items-center gap-2">
                      <MapPin size={14} />
                      {`${hospital.logradouro || "Rua não informada"}, ${hospital.numeroEndereco || 'S/N'}`}
                    </p>
                    <p className="pl-6">{`${hospital.bairro || "Bairro não informado"}, ${hospital.municipio || "Cidade não informada"} - ${hospital.uf}`}</p>
                    <p className="pl-6">{`CEP: ${hospital.cep || 'Não informado'}`}</p>
                  </div>
                  <div className="pt-3">
                    <Button
                      onClick={() => handleFindHotels(hospital)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <Hotel className="h-4 w-4 mr-2" />
                      Encontrar Hotéis Próximos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center items-center mt-6 gap-2">
            <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
              Anterior
            </Button>
            <span>Página {currentPage + 1} de {totalPages || 1}</span>
            <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages - 1}>
              Próxima
            </Button>
          </div>
        </>
      )}
    </main>
  );
}