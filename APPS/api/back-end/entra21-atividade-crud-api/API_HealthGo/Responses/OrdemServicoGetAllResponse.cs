using API_HealthGo.Entities;

namespace API_HealthGo.Responses
{
    public class OrdemServicoGetAllResponse
    {
        public IEnumerable<OrdemServicoEntity> Data { get; set; }
    }
}
