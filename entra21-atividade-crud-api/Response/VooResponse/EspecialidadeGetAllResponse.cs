using MinhaPrimeiraApi.Entity;
using MyFirstCRUD.entity;

namespace MinhaPrimeiraApi.Response.Especialidade
{
    public class EspecialidadeGetAllResponse
    {
        public IEnumerable<EspecialidadeEntity> Data { get; set; }
    }
}
