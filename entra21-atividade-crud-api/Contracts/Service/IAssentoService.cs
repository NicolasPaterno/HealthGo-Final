using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;
using MinhaPrimeiraApi.Response.Especialidade;
using MinhaPrimeiraApi.Response;

namespace MinhaPrimeiraApi.Contracts.Service
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
