using API_HealthGo.Entities;

namespace API_HealthGo.Responses
{
    public class PrestadorServicoGetAllResponse
    {
        public IEnumerable<PrestadorServicoEntity> Data { get; set; }
    }
}
