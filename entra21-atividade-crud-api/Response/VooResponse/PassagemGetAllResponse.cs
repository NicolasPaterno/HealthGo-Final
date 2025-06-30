using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Response.VooResponse
{
    public class PassagemGetAllResponse
    {
        public IEnumerable<PassagemEntity> Data { get; set; }
    }
}
