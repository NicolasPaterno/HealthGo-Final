using API_HealthGo.DTO;
using API_HealthGo.Entity;

namespace API_HealthGo.Contracts.Repository
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
