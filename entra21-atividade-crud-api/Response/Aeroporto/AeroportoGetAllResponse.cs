using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Response.Aeroporto
{
    public class AeroportoGetAllResponse
    {
        public IEnumerable<AeroportoEntity> Data { get; set; }
    }
}