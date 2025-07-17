using API_HealthGo.DTO;
using API_HealthGo.Entities;

namespace API_HealthGo.Contracts.Repository
{
    public interface IContaGerenciaRepository
    {
        Task<IEnumerable<ContaGerenciaEntity>> GetAll();

        Task<ContaGerenciaEntity> GetById(int id);

        Task Insert(ContaGerenciaInsertDTO contaGerencia);

        Task Delete(int id);

        Task Update(ContaGerenciaEntity contaGerencia);

        Task<ContaGerenciaEntity> GetContaGerenciaByEmail(string email);
    }
}
