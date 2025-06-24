using atividade_bd_csharp.Entity;
using MyFirstCRUD.Entity;

namespace APIHealthGo.Response
{
    public class GerenciaGetAllResponse
    {
        public IEnumerable<GerenciaEntity> Data { get; set; }
    }
}
