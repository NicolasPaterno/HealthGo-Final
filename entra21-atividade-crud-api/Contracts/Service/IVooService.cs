using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.Response.VooResponse;

namespace entra21_atividade_crud_api.Contracts.Service
{
    public interface IVooService
    {
        Task<MessageResponse> Delete(int id);

        Task<MessageResponse> Post(VooInsertDTO voo);

        Task<MessageResponse> Update(VooEntity voo);

        Task<VooGetAllResponse> GetAll();

        Task<VooEntity> GetById(int id);
    }
}