using API_HealthGo.Entity;

namespace API_HealthGo.Response
{
    public class PessoaGetAllResponse
    {
        public IEnumerable<PessoaEntity> Data { get; set; }
    }
}
