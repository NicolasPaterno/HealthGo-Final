using APIHealthGo.Response;
using MyFirstCRUD.DTO;
using MyFirstCRUD.Entity;

namespace APIHealthGo.Contracts.Service
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
