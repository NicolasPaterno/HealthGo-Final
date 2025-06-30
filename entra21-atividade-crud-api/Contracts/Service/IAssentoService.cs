using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Response.VooResponse;
using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Contracts.Service
{
    public interface IAssentoService
    {
        Task<MessageResponse> Delete(int id);

        Task<MessageResponse> Post(AssentoInsertDTO assento);

        Task<MessageResponse> Update(AssentoEntity assento);

        Task<AssentoGetAllResponse> GetAll();

        Task<AssentoEntity> GetById(int id);
    }
}