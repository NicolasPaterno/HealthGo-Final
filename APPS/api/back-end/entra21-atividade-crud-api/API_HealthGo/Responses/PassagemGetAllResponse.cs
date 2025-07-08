using API_HealthGo.Entities;

namespace API_HealthGo.Responses
{
    public class PassagemGetAllResponse
    {
        public IEnumerable<PassagemEntity> Data { get; set; }
    }
}
