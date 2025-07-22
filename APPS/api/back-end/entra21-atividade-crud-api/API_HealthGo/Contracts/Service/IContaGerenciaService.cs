using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;

namespace API_HealthGo.Contracts.Service
{
    public interface IContaGerenciaService
    {
        Task<MessageResponse> Delete(int id);

        Task<ContaGerenciaGetAllResponse> GetAll();

        Task<ContaGerenciaEntity> GetById(int id);

        Task<MessageResponse> Post(ContaGerenciaInsertDTO contaGerencia);

        Task<MessageResponse> Update(ContaGerenciaEntity contaGerencia);
    }
}
