using API_HealthGo.Entities;

namespace API_HealthGo.Responses
{
    public class NacaoGetAllResponse
    {
        public IEnumerable<NacaoEntity> Data { get; set; }
    }
}