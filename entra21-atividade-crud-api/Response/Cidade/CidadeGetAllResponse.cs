using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Response.Cidade
{
    public class CidadeGetAllResponse
    {
        public IEnumerable<CidadeEntity> Data { get; set; }
    }
}