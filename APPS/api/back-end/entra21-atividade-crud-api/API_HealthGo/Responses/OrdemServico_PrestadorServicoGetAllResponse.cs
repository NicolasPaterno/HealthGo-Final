using API_HealthGo.Entities;

namespace API_HealthGo.Responses
{
    public class OrdemServico_PrestadorServicoGetAllResponse
    {
        public IEnumerable<OrdemServico_PrestadorServicoEntity> Data { get; set; }
    }
}
