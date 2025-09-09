using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Contracts.Service
{
    public interface IEspecialidadeService
    {
        Task<MessageResponse> Delete(int id);

        Task<MessageResponse> Post(EspecialidadeInsertDTO especialidade);

        Task<MessageResponse> Update(EspecialidadeEntity especialidade);

        Task<EspecialidadeGetAllResponse> GetAll();

        Task<EspecialidadeEntity> GetById(int id);
    }
}