using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;
using API_HealthGo.Response.VooResponse;

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