using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response;

namespace entra21_atividade_crud_api.Contracts.Service
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