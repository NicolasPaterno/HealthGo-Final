using API_HealthGo.Entities;

namespace API_HealthGo.Responses
{
    public class AvaliacaoGetAllResponse
    {
        public IEnumerable<AvaliacaoEntity> Data { get; set; }
    }
}
