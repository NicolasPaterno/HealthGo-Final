using API_HealthGo.Entities;

namespace API_HealthGo.Response
{
    public class AeroportoGetAllResponse
    {
        public IEnumerable<AeroportoEntity> Data { get; set; }
    }
}