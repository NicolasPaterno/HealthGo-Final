using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Response.VooResponse
{
    public class AviaoGetAllResponse
    {
        public IEnumerable<AviaoEntity> Data { get; set; }
    }
}
