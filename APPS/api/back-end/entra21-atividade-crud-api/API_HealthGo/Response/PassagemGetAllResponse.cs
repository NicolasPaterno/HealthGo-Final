using API_HealthGo.Entities;

namespace API_HealthGo.Response
{
    public class PassagemGetAllResponse
    {
        public IEnumerable<PassagemEntity> Data { get; set; }
    }
}
