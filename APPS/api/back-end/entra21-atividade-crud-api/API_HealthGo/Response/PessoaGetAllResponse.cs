using API_HealthGo.Entities;

namespace API_HealthGo.Response
{
    public class PessoaGetAllResponse
    {
        public IEnumerable<PessoaEntity> Data { get; set; }
    }
}
