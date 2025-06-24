using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;
using MinhaPrimeiraApi.Response;
using MinhaPrimeiraApi.Response.Estado;

namespace MinhaPrimeiraApi.Contracts.Services
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