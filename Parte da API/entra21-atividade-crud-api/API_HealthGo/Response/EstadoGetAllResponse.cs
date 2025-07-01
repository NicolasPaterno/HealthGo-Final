using API_HealthGo.Entity;

namespace API_HealthGo.Response
{
    public class EstadoGetAllResponse
    {
        public IEnumerable<EstadoEntity> Data { get; set; }
    }
}