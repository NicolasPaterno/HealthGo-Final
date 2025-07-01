using API_HealthGo.DTO;

namespace API_HealthGo.Response.Aeroporto
{
    public class AeroportoGetByFilterResponse
    {
        public IEnumerable<AeroportoInsertDTO> Data { get; set; }
    }
}