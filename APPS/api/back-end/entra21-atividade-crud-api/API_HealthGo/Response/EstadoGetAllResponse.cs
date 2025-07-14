using API_HealthGo.Entities;

namespace API_HealthGo.Response
{
    public class EstadoGetAllResponse
    {
        public IEnumerable<EstadoEntity> Data { get; set; }
    }
}