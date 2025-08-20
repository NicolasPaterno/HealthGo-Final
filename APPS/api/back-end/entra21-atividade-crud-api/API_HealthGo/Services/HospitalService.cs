// APPS/api/back-end/entra21-atividade-crud-api/API_HealthGo/Services/HospitalService.cs

using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Responses;
using System.Globalization;

namespace API_HealthGo.Services
{
    // DTO Interno para mapear os dados do arquivo CSV
    public class LocalHospitalData
    {
        public string CNES { get; set; }
        public string NOME_ESTABELECIMENTO { get; set; }
        public string RAZAO_SOCIAL { get; set; }
        public string DESC_NATUREZA_JURIDICA { get; set; }
        public string DS_TIPO_UNIDADE { get; set; }
        public string UF { get; set; }
        public string MUNICIPIO { get; set; }
        public string NO_BAIRRO { get; set; }
        public string NO_LOGRADOURO { get; set; }
        public string NU_ENDERECO { get; set; }
        public string CO_CEP { get; set; }
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
                    
                    if (fields.Length >= 23) // Verifica se tem campos suficientes
                    {
                        var hospital = new LocalHospitalData
                        {
                            CNES = fields[6]?.Trim('"') ?? "",
                            NOME_ESTABELECIMENTO = fields[7]?.Trim('"') ?? "",
                            RAZAO_SOCIAL = fields[8]?.Trim('"') ?? "",
                            DESC_NATUREZA_JURIDICA = fields[13]?.Trim('"') ?? "",
                            DS_TIPO_UNIDADE = fields[11]?.Trim('"') ?? "",
                            UF = fields[2]?.Trim('"') ?? "",
                            MUNICIPIO = fields[4]?.Trim('"') ?? "",
                            NO_BAIRRO = fields[18]?.Trim('"') ?? "",
                            NO_LOGRADOURO = fields[14]?.Trim('"') ?? "",
                            NU_ENDERECO = fields[15]?.Trim('"') ?? "",
                            CO_CEP = fields[19]?.Trim('"') ?? ""
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

            // Remove duplicatas usando o CNES como chave única
            var uniqueHospitals = hospitaisFiltrados
                .GroupBy(h => h.CNES)
                .Select(g => g.First())
                .ToList();

            var totalItems = uniqueHospitals.Count;

            // Aplica paginação
            var paginatedHospitals = uniqueHospitals
                .Skip(page * limit)
                .Take(limit)
                .Select(h => new HospitalDTO
                {
                    Cnes = h.CNES ?? "",
                    Nome = h.NOME_ESTABELECIMENTO ?? "",
                    RazaoSocial = h.RAZAO_SOCIAL ?? "",
                    NaturezaJuridica = h.DESC_NATUREZA_JURIDICA ?? "",
                    TipoUnidade = h.DS_TIPO_UNIDADE ?? "",
                    Uf = h.UF ?? "",
                    Municipio = h.MUNICIPIO ?? "",
                    Bairro = h.NO_BAIRRO ?? "",
                    Logradouro = h.NO_LOGRADOURO ?? "",
                    NumeroEndereco = h.NU_ENDERECO ?? "",
                    Cep = h.CO_CEP ?? ""
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