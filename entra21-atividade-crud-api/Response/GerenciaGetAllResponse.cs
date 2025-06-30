using atividade_bd_csharp.Entity;
using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Response
{
    public class GerenciaGetAllResponse
    {
        public IEnumerable<GerenciaEntity> Data { get; set; }
    }
}
