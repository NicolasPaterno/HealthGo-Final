using API_HealthGo.Entities;

namespace API_HealthGo.Response
{
    public class NacaoGetAllResponse
    {
        public IEnumerable<NacaoEntity> Data { get; set; }
    }
}