using entra21_atividade_crud_api.DTO;

namespace MinhaPrimeiraApi.Response.Aeroporto
{
    public class AeroportoGetByFilterResponse
    {
        public IEnumerable<AeroportoDTO> Data { get; set; }
    }
}