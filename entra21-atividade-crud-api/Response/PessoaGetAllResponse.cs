using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Response
{
    public class PessoaGetAllResponse
    {
        public IEnumerable<PessoaEntity> Data { get; set; }
    }
}
