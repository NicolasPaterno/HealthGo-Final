using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Response.Especialidade
{
    public class EspecialidadeGetAllResponse
    {
        public IEnumerable<EspecialidadeEntity> Data { get; set; }
    }
}