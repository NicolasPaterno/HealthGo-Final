using API_HealthGo.Entity;

namespace API_HealthGo.Response.Aeroporto
{
    public class AeroportoGetAllResponse
    {
        public IEnumerable<AeroportoEntity> Data { get; set; }
    }
}