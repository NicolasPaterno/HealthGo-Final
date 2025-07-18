using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;

namespace API_HealthGo.Contracts.Service
{
    public interface IEspecialidadeService
    {
        Task<MessageResponse> Delete(int id);

        Task<EspecialidadeGetAllResponse> GetAll();

        Task<EspecialidadeEntity> GetById(int id);

        Task<MessageResponse> Post(EspecialidadeInsertDTO especialidade);

        Task<MessageResponse> Update(EspecialidadeEntity especialidade);
    }
}