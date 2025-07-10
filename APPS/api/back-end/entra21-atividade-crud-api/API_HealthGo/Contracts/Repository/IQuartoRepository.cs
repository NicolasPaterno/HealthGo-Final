using API_HealthGo.DTO;
using API_HealthGo.Entities;

namespace API_HealthGo.Contracts.Repositories
{
    public interface IQuartoRepository
    {
        Task<IEnumerable<QuartoEntity>> GetAll();

        Task<QuartoEntity> GetById(int id);

        Task Insert(QuartoInsertDTO quarto);

        Task Delete(int id);

        Task Update(QuartoEntity quarto);
    }
}
