using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response.VooResponse;

namespace entra21_atividade_crud_api.Contracts.Service
{
    public interface IAviaoService
    {
        Task<MessageResponse> Delete(int id);

        Task<MessageResponse> Post(AviaoInsertDTO aviao);

        Task<MessageResponse> Update(AviaoEntity aviao);

        Task<AviaoGetAllResponse> GetAll();

        Task<AviaoEntity> GetById(int id);
    }
}