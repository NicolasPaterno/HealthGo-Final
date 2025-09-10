using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Contracts.Service
{
    public interface IPrestadorServicoEspecialidadeService
    {
        Task<PrestadorServicoEspecialidadeGetAllResponse> GetAll();

        Task<PrestadorServicoEspecialidadeEntity> GetById(int id);

        Task<MessageResponse> Post(PrestadorServicoEspecialidadeInsertDTO entity);

        Task<MessageResponse> Update(PrestadorServicoEspecialidadeEntity entity);

        Task<MessageResponse> Delete(int id);

        Task<IEnumerable<PrestadorServicoEspecialidadeEntity>> GetAllEspecialidadesById(int id);

        Task<int> ReturnIdByFunction(int id, string function);
    }
}
