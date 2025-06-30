using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.Response.VooResponse;

namespace entra21_atividade_crud_api.Contracts.Service
{
    public interface IPassagemService
    {
        Task<MessageResponse> Delete(int id);

        Task<MessageResponse> Post(PassagemInsertDTO passagem);

        Task<MessageResponse> Update(PassagemEntity passagem);

        Task<PassagemGetAllResponse> GetAll();

        Task<PassagemEntity> GetById(int id);
    }
}