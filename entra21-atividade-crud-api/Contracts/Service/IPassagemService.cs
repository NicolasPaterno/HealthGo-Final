using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;
using MinhaPrimeiraApi.Response.Especialidade;
using MinhaPrimeiraApi.Response;

namespace MinhaPrimeiraApi.Contracts.Service
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
