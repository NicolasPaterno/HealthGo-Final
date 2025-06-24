using MinhaPrimeiraApi.DTO.Aeroporto;

namespace MinhaPrimeiraApi.Response.Aeroporto
{
    public class AeroportoGetByFilterResponse
    {
        public IEnumerable<AeroportoDTO> Data { get; set; }
    }
}