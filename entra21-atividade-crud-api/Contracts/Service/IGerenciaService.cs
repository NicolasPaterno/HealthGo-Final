using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;

namespace API_HealthGo.Contracts.Service
{
    public interface IGerenciaService
    {
        Task<GerenciaGetAllResponse> GetAllGerencia();

        Task<GerenciaEntity> GetGerenciaById(int id);

        Task<MessageResponse> Post(GerenciaInsertDTO gerencia);

        Task<MessageResponse> Delete(int id);

        Task<MessageResponse> Update(GerenciaEntity gerencia);
    }
}