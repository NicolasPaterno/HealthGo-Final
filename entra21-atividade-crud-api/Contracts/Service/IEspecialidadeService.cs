using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;
using MinhaPrimeiraApi.Response;
using MinhaPrimeiraApi.Response.Especialidade;

namespace MinhaPrimeiraApi.Contracts.Service
{
    public interface IEspecialidadeService
    {
        Task<MessageResponse> Delete(int id);
        Task<MessageResponse> Post(EspecialidadeInsertDTO especialidade);
        Task<MessageResponse> Update(EspecialidadeEntity especialidade);
        Task <EspecialidadeGetAllResponse> GetAll();
        Task<EspecialidadeEntity> GetById(int id);
    }
}
