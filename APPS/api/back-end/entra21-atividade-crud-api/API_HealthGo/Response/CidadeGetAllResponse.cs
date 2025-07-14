using API_HealthGo.Entities;

namespace API_HealthGo.Response
{
    public class CidadeGetAllResponse
    {
        public IEnumerable<CidadeEntity> Data { get; set; }
    }
}