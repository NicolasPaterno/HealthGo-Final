
using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Response.Nacao
{
    public class NacaoGetAllResponse
    {
        public IEnumerable<NacaoEntity> Data { get; set; }
    }
}