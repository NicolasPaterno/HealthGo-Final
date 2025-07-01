using API_HealthGo.Entity;
using MinhaPrimeiraApi.Entity;

namespace API_HealthGo.Response.VooResponse
{
    public class EspecialidadeGetAllResponse
    {
        public IEnumerable<EspecialidadeEntity> Data { get; set; }
    }
}
