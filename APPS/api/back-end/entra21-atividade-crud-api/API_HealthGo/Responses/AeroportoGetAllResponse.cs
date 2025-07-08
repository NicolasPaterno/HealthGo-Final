using API_HealthGo.Entities;

namespace API_HealthGo.Responses
{
    public class AeroportoGetAllResponse
    {
        public IEnumerable<AeroportoEntity> Data { get; set; }
    }
}