using API_HealthGo.Entities;

namespace API_HealthGo.Responses
{
    public class PessoaGetAllResponse
    {
        public IEnumerable<PessoaEntity> Data { get; set; }
    }
}
