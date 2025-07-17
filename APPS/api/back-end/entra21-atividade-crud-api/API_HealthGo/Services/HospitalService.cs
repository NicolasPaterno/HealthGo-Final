// APPS/api/back-end/entra21-atividade-crud-api/API_HealthGo/Services/HospitalService.cs

using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Responses;
using Microsoft.AspNetCore.WebUtilities;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace API_HealthGo.Services
{
    // DTO Interno para receber os dados da API externa (com snake_case)
    public class ExternalHospitalData
    {
        [JsonPropertyName("cnes")]
        public string Cnes { get; set; }

        [JsonPropertyName("nome_do_estabelecimento")]
        public string NomeDoEstabelecimento { get; set; }

        [JsonPropertyName("razao_social")]
        public string RazaoSocial { get; set; }

        [JsonPropertyName("descricao_da_natureza_juridica")]
        public string DescricaoDaNaturezaJuridica { get; set; }

        [JsonPropertyName("tipo_unidade")]
        public string TipoUnidade { get; set; }

        [JsonPropertyName("uf")]
        public string Uf { get; set; }

        [JsonPropertyName("municipio")]
        public string Municipio { get; set; }

        [JsonPropertyName("bairro")]
        public string Bairro { get; set; }

        [JsonPropertyName("no_logradouro")]
        public string Logradouro { get; set; }

        [JsonPropertyName("numero_endereco")]
        public string NumeroEndereco { get; set; }

        [JsonPropertyName("cep")]
        public string Cep { get; set; }
    }

    // Classe auxiliar para o objeto raiz da API externa
    public class RootApiResponse
    {
        [JsonPropertyName("hospitais_leitos")]
        public List<ExternalHospitalData> HospitaisLeitos { get; set; }

        [JsonPropertyName("total")]
        public int Total { get; set; }
    }

    public class HospitalService : IHospitalService
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public HospitalService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<HospitalGetAllResponse> GetHospitais(string uf, int limit, int page, string? nome)
        {
            var client = _httpClientFactory.CreateClient();
            var baseUrl = "https://apidadosabertos.saude.gov.br/assistencia-a-saude/hospitais-e-leitos";

            // Aumentamos o limite para garantir que todos os hospitais de uma cidade sejam retornados
            var queryParams = new Dictionary<string, string>
            {
                { "uf", uf },
                { "limit", "500" }
            };

            var url = QueryHelpers.AddQueryString(baseUrl, queryParams);

            var response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var responseStream = await response.Content.ReadAsStreamAsync();
                var result = await JsonSerializer.DeserializeAsync<RootApiResponse>(responseStream);

                if (result != null && result.HospitaisLeitos != null)
                {
                    var hospitais = result.HospitaisLeitos.Select(h => new HospitalDTO
                    {
                        Cnes = h.Cnes,
                        Nome = h.NomeDoEstabelecimento,
                        RazaoSocial = h.RazaoSocial,
                        NaturezaJuridica = h.DescricaoDaNaturezaJuridica,
                        TipoUnidade = h.TipoUnidade,
                        Uf = h.Uf,
                        Municipio = h.Municipio,
                        Bairro = h.Bairro,
                        Logradouro = h.Logradouro,
                        NumeroEndereco = h.NumeroEndereco,
                        Cep = h.Cep
                    });

                    // Aplica o filtro de pesquisa no lado do servidor
                    if (!string.IsNullOrEmpty(nome))
                    {
                        hospitais = hospitais.Where(h =>
                            (h.Nome != null && h.Nome.ToLower().Contains(nome.ToLower())) ||
                            (h.Municipio != null && h.Municipio.ToLower().Contains(nome.ToLower()))
                        );
                    }

                    // Remove duplicatas usando o CNES como chave única
                    var uniqueHospitals = hospitais
                        .GroupBy(h => h.Cnes)
                        .Select(g => g.First());

                    var totalItems = uniqueHospitals.Count();
                    var paginatedHospitals = uniqueHospitals.Skip(page * limit).Take(limit).ToList();

                    return new HospitalGetAllResponse
                    {
                        Data = paginatedHospitals,
                        Total = totalItems
                    };
                }
            }

            return new HospitalGetAllResponse { Data = Enumerable.Empty<HospitalDTO>(), Total = 0 };
        }
    }
}