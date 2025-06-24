using atividade_bd_csharp.Entity;

namespace APIHealthGo.Response
{
    public class PessoaGetAllResponse
    {
        public IEnumerable<PessoaEntity> Data { get; set; }
    }
}
