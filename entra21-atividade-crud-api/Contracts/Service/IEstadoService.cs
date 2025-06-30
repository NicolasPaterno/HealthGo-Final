using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.Response.Estado;

namespace entra21_atividade_crud_api.Contracts.Service
{
    public interface IEstadoService
    {
        Task<MessageResponse> Delete(int id);

        Task<EstadoGetAllResponse> GetAll();

        Task<EstadoEntity> GetById(int id);

        Task<MessageResponse> Post(EstadoInsertDTO estado);

        Task<MessageResponse> Update(EstadoEntity estado);
    }
}