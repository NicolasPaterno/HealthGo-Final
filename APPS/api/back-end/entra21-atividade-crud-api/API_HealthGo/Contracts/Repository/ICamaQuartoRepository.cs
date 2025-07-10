using API_HealthGo.DTO;
using API_HealthGo.Entities;

namespace API_HealthGo.Contracts.Repositories
{
    public interface ICamaQuartoRepository
    {
        Task<IEnumerable<CamaQuartoEntity>> GetAll();

        Task<CamaQuartoEntity> GetById(int id);

        Task Insert(CamaQuartoInsertDTO camaQuarto);

        Task Delete(int id);

        Task Update(CamaQuartoEntity camaQuarto);
    }
}
