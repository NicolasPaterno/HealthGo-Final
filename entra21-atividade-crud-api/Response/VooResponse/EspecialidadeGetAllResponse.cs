using entra21_atividade_crud_api.Entity;
using MinhaPrimeiraApi.Entity;

namespace entra21_atividade_crud_api.Response.VooResponse
{
    public class EspecialidadeGetAllResponse
    {
        public IEnumerable<EspecialidadeEntity> Data { get; set; }
    }
}
