import { useState, useEffect } from 'react';
import api from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Hospital, MapPin, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
  const [hospitals, setHospitals] = useState<HospitalData[]>([]);
  const [uf, setUf] = useState('SC');
  const [loading, setLoading] = useState(false);

  const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

  useEffect(() => {
    const fetchHospitals = async () => {
      if (!uf) return;
      setLoading(true);
      setHospitals([]);
      try {
        const response = await api.get(`/Hospitais?uf=${uf}&limit=21`);
        setHospitals(response.data);
      } catch (error) {
        console.error("Erro ao buscar hospitais:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [uf]);

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
      <div className="mb-6">
        <Select onValueChange={setUf} defaultValue={uf}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Selecione um estado" />
          </SelectTrigger>
          <SelectContent>
            {ufs.map(uf => (
              <SelectItem key={uf} value={uf}>{uf}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Carregando hospitais...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital) => (
            <Card key={hospital.cnes} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{hospital.nome || "Nome não informado"}</CardTitle>
                <CardDescription className="flex items-center gap-1.5 pt-1 text-xs">
                   <Building size={12}/> {hospital.razaoSocial || "Não informado"}
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
                        <MapPin size={14}/> 
                        {`${hospital.logradouro || "Rua não informada"}, ${hospital.numeroEndereco || 'S/N'}`}
                    </p>
                    <p className="pl-6">{`${hospital.bairro || "Bairro não informado"}, ${hospital.municipio || "Cidade não informada"} - ${hospital.uf}`}</p>
                    <p className="pl-6">{`CEP: ${hospital.cep || 'Não informado'}`}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}