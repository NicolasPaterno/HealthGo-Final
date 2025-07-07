using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;

namespace API_HealthGo.Contracts.Service
{
    public interface IEspecialidadeService
    {
        Task<EspecialidadeGetAllResponse> GetAll();

        Task<EspecialidadeEntity> GetById(int id);

        Task<MessageResponse> Post(EspecialidadeInsertDTO especialidade);

        Task<MessageResponse> Update(EspecialidadeEntity especialidade);

        Task<MessageResponse> Delete(int id);
    }
}