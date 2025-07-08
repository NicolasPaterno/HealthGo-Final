using API_HealthGo.Entities;

namespace API_HealthGo.Responses
{
    public class EstadoGetAllResponse
    {
        public IEnumerable<EstadoEntity> Data { get; set; }
    }
}