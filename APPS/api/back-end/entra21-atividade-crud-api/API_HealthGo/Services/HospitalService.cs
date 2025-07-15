using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
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
    }

    public class HospitalService : IHospitalService
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public HospitalService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IEnumerable<HospitalDTO>> GetHospitais(string uf, int limit, int page)
        {
            var client = _httpClientFactory.CreateClient();
            var baseUrl = "https://apidadosabertos.saude.gov.br/assistencia-a-saude/hospitais-e-leitos";

            var queryParams = new Dictionary<string, string>
            {
                { "uf", uf },
                { "limit", limit.ToString() },
                { "page", page.ToString() }
            };
            var url = QueryHelpers.AddQueryString(baseUrl, queryParams);

            var response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var responseStream = await response.Content.ReadAsStreamAsync();
                var result = await JsonSerializer.DeserializeAsync<RootApiResponse>(responseStream);

                if (result != null && result.HospitaisLeitos != null)
                {
                    // Mapeia da estrutura externa para o DTO do seu front-end
                    return result.HospitaisLeitos.Select(h => new HospitalDTO
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
                    }).ToList();
                }
            }

            return Enumerable.Empty<HospitalDTO>();
        }
    }
}