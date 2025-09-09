// APPS/api/back-end/entra21-atividade-crud-api/API_HealthGo/Services/HospitalService.cs

using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Responses;

namespace API_HealthGo.Services
{
    // DTO Interno para mapear os dados do arquivo CSV
    public class LocalHospitalData
    {
        public string COMP { get; set; } = "";
        public string REGIAO { get; set; } = "";
        public string UF { get; set; } = "";
        public string CO_IBGE { get; set; } = "";
        public string MUNICIPIO { get; set; } = "";
        public string MOTIVO_DESABILITACAO { get; set; } = "";
        public string CNES { get; set; } = "";
        public string NOME_ESTABELECIMENTO { get; set; } = "";
        public string RAZAO_SOCIAL { get; set; } = "";
        public string TP_GESTAO { get; set; } = "";
        public string CO_TIPO_UNIDADE { get; set; } = "";
        public string DS_TIPO_UNIDADE { get; set; } = "";
        public string NATUREZA_JURIDICA { get; set; } = "";
        public string DESC_NATUREZA_JURIDICA { get; set; } = "";
        public string NO_LOGRADOURO { get; set; } = "";
        public string NU_ENDERECO { get; set; } = "";
        public string NO_COMPLEMENTO { get; set; } = "";
        public string NO_BAIRRO { get; set; } = "";
        public string CO_CEP { get; set; } = "";
        public string NU_TELEFONE { get; set; } = "";
        public string NO_EMAIL { get; set; } = "";
        public string LEITOS_EXISTENTES { get; set; } = "";
        public string LEITOS_SUS { get; set; } = "";
        public string UTI_TOTAL_EXIST { get; set; } = "";
        public string UTI_TOTAL_SUS { get; set; } = "";
        public string UTI_ADULTO_EXIST { get; set; } = "";
        public string UTI_ADULTO_SUS { get; set; } = "";
        public string UTI_PEDIATRICO_EXIST { get; set; } = "";
        public string UTI_PEDIATRICO_SUS { get; set; } = "";
        public string UTI_NEONATAL_EXIST { get; set; } = "";
        public string UTI_NEONATAL_SUS { get; set; } = "";
        public string UTI_QUEIMADO_EXIST { get; set; } = "";
        public string UTI_QUEIMADO_SUS { get; set; } = "";
        public string UTI_CORONARIANA_EXIST { get; set; } = "";
        public string UTI_CORONARIANA_SUS { get; set; } = "";
    }

    public class HospitalService : IHospitalService
    {
        private readonly IWebHostEnvironment _environment;
        private List<LocalHospitalData> _hospitaisCache;
        private readonly object _lockObject = new object();
        private bool _isInitialized = false;

        public HospitalService(IWebHostEnvironment environment)
        {
            _environment = environment;
            _hospitaisCache = new List<LocalHospitalData>();
        }

        private async Task InitializeCacheAsync()
        {
            if (_isInitialized) return;

            lock (_lockObject)
            {
                if (_isInitialized) return;
            }

            try
            {
                var csvPath = Path.Combine(_environment.ContentRootPath, "Data", "Leitos_2025.csv");
                
                if (!File.Exists(csvPath))
                {
                    throw new FileNotFoundException($"Arquivo de dados não encontrado: {csvPath}");
                }

                var hospitais = new List<LocalHospitalData>();
                var lines = await File.ReadAllLinesAsync(csvPath);
                
                // Pula o cabeçalho (primeira linha)
                for (int i = 1; i < lines.Length; i++)
                {
                    var line = lines[i];
                    if (string.IsNullOrWhiteSpace(line)) continue;

                    // Divide a linha por ponto e vírgula, respeitando aspas
                    var fields = ParseCsvLine(line);
                    
                    if (fields.Length >= 34) // Verifica se tem campos suficientes
                    {
                        var hospital = new LocalHospitalData
                        {
                            COMP = fields[0]?.Trim('"') ?? "",
                            REGIAO = fields[1]?.Trim('"') ?? "",
                            UF = fields[2]?.Trim('"') ?? "",
                            CO_IBGE = fields[3]?.Trim('"') ?? "",
                            MUNICIPIO = fields[4]?.Trim('"') ?? "",
                            MOTIVO_DESABILITACAO = fields[5]?.Trim('"') ?? "",
                            CNES = fields[6]?.Trim('"') ?? "",
                            NOME_ESTABELECIMENTO = fields[7]?.Trim('"') ?? "",
                            RAZAO_SOCIAL = fields[8]?.Trim('"') ?? "",
                            TP_GESTAO = fields[9]?.Trim('"') ?? "",
                            CO_TIPO_UNIDADE = fields[10]?.Trim('"') ?? "",
                            DS_TIPO_UNIDADE = fields[11]?.Trim('"') ?? "",
                            NATUREZA_JURIDICA = fields[12]?.Trim('"') ?? "",
                            DESC_NATUREZA_JURIDICA = fields[13]?.Trim('"') ?? "",
                            NO_LOGRADOURO = fields[14]?.Trim('"') ?? "",
                            NU_ENDERECO = fields[15]?.Trim('"') ?? "",
                            NO_COMPLEMENTO = fields[16]?.Trim('"') ?? "",
                            NO_BAIRRO = fields[17]?.Trim('"') ?? "",
                            CO_CEP = fields[18]?.Trim('"') ?? "",
                            NU_TELEFONE = fields[19]?.Trim('"') ?? "",
                            NO_EMAIL = fields[20]?.Trim('"') ?? "",
                            LEITOS_EXISTENTES = fields[21]?.Trim('"') ?? "",
                            LEITOS_SUS = fields[22]?.Trim('"') ?? "",
                            UTI_TOTAL_EXIST = fields[23]?.Trim('"') ?? "",
                            UTI_TOTAL_SUS = fields[24]?.Trim('"') ?? "",
                            UTI_ADULTO_EXIST = fields[25]?.Trim('"') ?? "",
                            UTI_ADULTO_SUS = fields[26]?.Trim('"') ?? "",
                            UTI_PEDIATRICO_EXIST = fields[27]?.Trim('"') ?? "",
                            UTI_PEDIATRICO_SUS = fields[28]?.Trim('"') ?? "",
                            UTI_NEONATAL_EXIST = fields[29]?.Trim('"') ?? "",
                            UTI_NEONATAL_SUS = fields[30]?.Trim('"') ?? "",
                            UTI_QUEIMADO_EXIST = fields[31]?.Trim('"') ?? "",
                            UTI_QUEIMADO_SUS = fields[32]?.Trim('"') ?? "",
                            UTI_CORONARIANA_EXIST = fields[33]?.Trim('"') ?? "",
                            UTI_CORONARIANA_SUS = fields[34]?.Trim('"') ?? ""
                        };

                        hospitais.Add(hospital);
                    }
                }

                lock (_lockObject)
                {
                    _hospitaisCache = hospitais;
                    _isInitialized = true;
                }
            }
            catch (Exception ex)
            {
                // Log do erro (você pode implementar um sistema de logging aqui)
                Console.WriteLine($"Erro ao carregar dados dos hospitais: {ex.Message}");
                throw;
            }
        }

        private string[] ParseCsvLine(string line)
        {
            var result = new List<string>();
            var currentField = "";
            var insideQuotes = false;
            
            for (int i = 0; i < line.Length; i++)
            {
                char c = line[i];
                
                if (c == '"')
                {
                    insideQuotes = !insideQuotes;
                }
                else if (c == ';' && !insideQuotes)
                {
                    result.Add(currentField);
                    currentField = "";
                }
                else
                {
                    currentField += c;
                }
            }
            
            // Adiciona o último campo
            result.Add(currentField);
            
            return result.ToArray();
        }

        public async Task<HospitalGetAllResponse> GetHospitais(string uf, int limit, int page, string? nome)
        {
            // Garante que o cache está inicializado
            await InitializeCacheAsync();

            // Filtra por UF primeiro
            var hospitaisFiltrados = _hospitaisCache
                .Where(h => !string.IsNullOrEmpty(h.UF) && h.UF.Equals(uf, StringComparison.OrdinalIgnoreCase))
                .ToList();

            // Aplica filtro de pesquisa por nome ou município
            if (!string.IsNullOrEmpty(nome))
            {
                hospitaisFiltrados = hospitaisFiltrados.Where(h =>
                    (!string.IsNullOrEmpty(h.NOME_ESTABELECIMENTO) && 
                     h.NOME_ESTABELECIMENTO.ToLower().Contains(nome.ToLower())) ||
                    (!string.IsNullOrEmpty(h.MUNICIPIO) && 
                     h.MUNICIPIO.ToLower().Contains(nome.ToLower()))
                ).ToList();
            }

            // Remove duplicatas usando o CNES como chave única (identificador único do hospital) e ordena por nome
            var uniqueHospitals = hospitaisFiltrados
                .Where(h => !string.IsNullOrEmpty(h.CNES) && !string.IsNullOrWhiteSpace(h.CNES)) // Filtra CNES nulos ou vazios
                .GroupBy(h => h.CNES.Trim().ToUpper()) // Remove espaços em branco e converte para maiúsculo para evitar problemas de case
                .Select(g => g.First())
                .OrderBy(h => h.NOME_ESTABELECIMENTO) // Ordena por nome para melhor experiência
                .ToList();

            // Log detalhado para debug (remover em produção)
            Console.WriteLine($"=== DEBUG HOSPITAIS ===");
            Console.WriteLine($"Total de hospitais filtrados: {hospitaisFiltrados.Count}");
            Console.WriteLine($"Total de hospitais únicos após agrupamento: {uniqueHospitals.Count}");
            
            if (!string.IsNullOrEmpty(nome))
            {
                Console.WriteLine($"Pesquisando por: '{nome}'");
                Console.WriteLine($"Hospitais encontrados:");
                foreach (var hospital in uniqueHospitals)
                {
                    Console.WriteLine($"  - CNES: {hospital.CNES}, Nome: {hospital.NOME_ESTABELECIMENTO}, Município: {hospital.MUNICIPIO}");
                }
            }
            
            // Log dos dados antes do agrupamento para debug
            Console.WriteLine($"Dados antes do agrupamento:");
            foreach (var hospital in hospitaisFiltrados.Take(10)) // Mostra apenas os primeiros 10 para não poluir o log
            {
                Console.WriteLine($"  - CNES: {hospital.CNES}, Nome: {hospital.NOME_ESTABELECIMENTO}, Município: {hospital.MUNICIPIO}");
            }
            Console.WriteLine($"=== FIM DEBUG ===");



            var totalItems = uniqueHospitals.Count;

            // Aplica paginação
            var paginatedHospitals = uniqueHospitals
                .Skip(page * limit)
                .Take(limit)
                .Select(h => new HospitalDTO
                {
                    COMP = h.COMP ?? "",
                    Nome = h.NOME_ESTABELECIMENTO ?? "",
                    RazaoSocial = h.RAZAO_SOCIAL ?? "",
                    NaturezaJuridica = h.DESC_NATUREZA_JURIDICA ?? "",
                    TipoUnidade = h.DS_TIPO_UNIDADE ?? "",
                    Uf = h.UF ?? "",
                    Municipio = h.MUNICIPIO ?? "",
                    Bairro = h.NO_BAIRRO ?? "",
                    Logradouro = h.NO_LOGRADOURO ?? "",
                    NumeroEndereco = h.NU_ENDERECO ?? "",
                    Cep = h.CO_CEP ?? "",
                    Numero = h.NU_TELEFONE ?? ""
                })
                .ToList();

            return new HospitalGetAllResponse
            {
                Data = paginatedHospitals,
                Total = totalItems
            };
        }
    }
}