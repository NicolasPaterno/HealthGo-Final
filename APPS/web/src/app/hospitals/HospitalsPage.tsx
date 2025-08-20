// APPS/web/src/app/hospitals/HospitalsPage.tsx
import { useState, useEffect, useCallback } from 'react';
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

interface HospitalResponse {
  data: HospitalData[];
  total: number;
}

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<HospitalData[]>([]);
  const [loading, setLoading] = useState(false);
  const [uf, setUf] = useState('SP');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalHospitals, setTotalHospitals] = useState(0);
  const navigate = useNavigate();

  // Timeout para debounce da pesquisa
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const fetchHospitals = useCallback(async (ufParam: string, page: number, search: string) => {
    setLoading(true);
    try {
      const response = await api.get<HospitalResponse>('/Hospital', {
        params: {
          uf: ufParam,
          limit: 21,
          page: page,
          nome: search || undefined
        }
      });

      setHospitals(response.data.data);
      setTotalHospitals(response.data.total);
      setTotalPages(Math.ceil(response.data.total / 21));
    } catch (error) {
      console.error('Erro ao buscar hospitais:', error);
      setHospitals([]);
      setTotalHospitals(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Função para lidar com mudanças na pesquisa com debounce
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(0); // Reset para primeira página

    // Cancela o timeout anterior se existir
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Cria um novo timeout de 500ms
    const newTimeout = setTimeout(() => {
      fetchHospitals(uf, 0, value);
    }, 500);

    setSearchTimeout(newTimeout);
  };

  // Função para lidar com mudanças na UF
  const handleUfChange = (value: string) => {
    setUf(value);
    setCurrentPage(0);
    setSearchTerm(''); // Limpa a pesquisa ao mudar UF

    // Cancela qualquer pesquisa pendente
    if (searchTimeout) {
      clearTimeout(searchTimeout);
      setSearchTimeout(null);
    }

    fetchHospitals(value, 0, '');
  };

  // Função para mudança de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchHospitals(uf, page, searchTerm);
  };

  // Carrega hospitais iniciais
  useEffect(() => {
    fetchHospitals(uf, 0, '');
  }, [fetchHospitals]);

  // Cleanup do timeout quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  const formatNaturezaJuridica = (natureza: string) => {
    if (!natureza) return 'Não informado';

    return natureza
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatTipoUnidade = (tipo: string) => {
    if (!tipo) return 'Não informado';

    return tipo
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleHotelClick = (hospital: HospitalData) => {
    navigate('/hotels', {
      state: {
        selectedHospital: hospital,
        searchLocation: `${hospital.municipio}, ${hospital.uf}`
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Hospitais
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Encontre hospitais próximos e reserve hotéis para sua estadia
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Select onValueChange={handleUfChange} defaultValue={uf}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Selecione a UF" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AC">Acre</SelectItem>
              <SelectItem value="AL">Alagoas</SelectItem>
              <SelectItem value="AP">Amapá</SelectItem>
              <SelectItem value="AM">Amazonas</SelectItem>
              <SelectItem value="BA">Bahia</SelectItem>
              <SelectItem value="CE">Ceará</SelectItem>
              <SelectItem value="DF">Distrito Federal</SelectItem>
              <SelectItem value="ES">Espírito Santo</SelectItem>
              <SelectItem value="GO">Goiás</SelectItem>
              <SelectItem value="MA">Maranhão</SelectItem>
              <SelectItem value="MT">Mato Grosso</SelectItem>
              <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
              <SelectItem value="MG">Minas Gerais</SelectItem>
              <SelectItem value="PA">Pará</SelectItem>
              <SelectItem value="PB">Paraíba</SelectItem>
              <SelectItem value="PR">Paraná</SelectItem>
              <SelectItem value="PE">Pernambuco</SelectItem>
              <SelectItem value="PI">Piauí</SelectItem>
              <SelectItem value="RJ">Rio de Janeiro</SelectItem>
              <SelectItem value="RN">Rio Grande do Norte</SelectItem>
              <SelectItem value="RS">Rio Grande do Sul</SelectItem>
              <SelectItem value="RO">Rondônia</SelectItem>
              <SelectItem value="RR">Roraima</SelectItem>
              <SelectItem value="SC">Santa Catarina</SelectItem>
              <SelectItem value="SP">São Paulo</SelectItem>
              <SelectItem value="SE">Sergipe</SelectItem>
              <SelectItem value="TO">Tocantins</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Pesquisar por nome do hospital ou cidade..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
            <Hospital className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Indicador de pesquisa ativa */}
        {searchTerm && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              🔍 Pesquisando por: <span className="font-semibold">"{searchTerm}"</span>
            </p>
          </div>
        )}
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm ? `Buscando hospitais para "${searchTerm}"...` : 'Carregando hospitais...'}
          </p>
        </div>
      ) : hospitals.length === 0 ? (
        <div className="text-center py-12">
          <Hospital className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum hospital encontrado</h3>
          <p className="text-muted-foreground">
            {searchTerm
              ? `Não foram encontrados hospitais para "${searchTerm}" em ${uf}`
              : `Não há hospitais cadastrados em ${uf}`
            }
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            {totalHospitals} hospital{totalHospitals !== 1 ? 'is' : ''} encontrado{totalHospitals !== 1 ? 's' : ''}
            {searchTerm && ` para "${searchTerm}"`}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {hospitals.map((hospital) => (
              <Card key={hospital.cnes} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-2">
                    {hospital.nome}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1.5 pt-1 text-xs">
                    <Building size={12} />
                    <span className="line-clamp-1">
                      {hospital.razaoSocial || "Não informado"}
                    </span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {formatTipoUnidade(hospital.tipoUnidade)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {formatNaturezaJuridica(hospital.naturezaJuridica)}
                    </Badge>
                  </div>

                  <div className="text-sm text-muted-foreground space-y-1 pt-2 border-t">
                    <p className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span className="line-clamp-1">
                        {hospital.logradouro
                          ? `${hospital.logradouro}, ${hospital.numeroEndereco || 'S/N'}`
                          : 'Endereço não informado'
                        }
                      </span>
                    </p>
                    <p className="text-xs">
                      {hospital.bairro && `${hospital.bairro}, `}
                      {hospital.municipio} - {hospital.uf}
                      {hospital.cep && ` • CEP: ${hospital.cep}`}
                    </p>
                  </div>

                  <div className="pt-3">
                    <Button
                      onClick={() => handleHotelClick(hospital)}
                      className="w-full"
                      size="sm"
                    >
                      <Hotel size={16} className="mr-2" />
                      Ver Hotéis Próximos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                variant="outline"
                size="sm"
              >
                Anterior
              </Button>

              <span className="text-sm text-gray-600 dark:text-gray-400 px-4">
                Página {currentPage + 1} de {totalPages}
              </span>

              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                variant="default"
                size="sm"
              >
                Próxima
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}