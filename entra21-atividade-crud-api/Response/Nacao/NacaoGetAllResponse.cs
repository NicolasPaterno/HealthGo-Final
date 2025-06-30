using API_HealthGo.Entity;

namespace API_HealthGo.Response.Nacao
{
    public class NacaoGetAllResponse
    {
        public IEnumerable<NacaoEntity> Data { get; set; }
    }
}