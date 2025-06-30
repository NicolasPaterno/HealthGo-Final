
using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Response.Estado
{
    public class EstadoGetAllResponse
    {
        public IEnumerable<EstadoEntity> Data { get; set; }
    }
}