using atividade_bd_csharp.Entity;
using API_HealthGo.Entity;

namespace API_HealthGo.Response
{
    public class GerenciaGetAllResponse
    {
        public IEnumerable<GerenciaEntity> Data { get; set; }
    }
}
