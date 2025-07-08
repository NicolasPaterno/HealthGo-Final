using API_HealthGo.DTO;
using API_HealthGo.Entities;

namespace API_HealthGo.Contracts.Repositories
{
    public interface IEspecialidadeRepository
    {
        Task<IEnumerable<EspecialidadeEntity>> GetAll();

        Task<EspecialidadeEntity> GetById(int id);

        Task Insert(EspecialidadeInsertDTO especialidade);

        Task Delete(int id);

        Task Update(EspecialidadeEntity especialidade);
    }
}