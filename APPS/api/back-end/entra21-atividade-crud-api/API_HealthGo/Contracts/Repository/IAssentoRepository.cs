using API_HealthGo.DTO;
using API_HealthGo.Entities;

namespace API_HealthGo.Contracts.Repository
{
    public interface IAssentoRepository
    {
        Task<IEnumerable<AssentoEntity>> GetAll();

        Task<AssentoEntity> GetById(int id);

        Task Insert(AssentoInsertDTO assento);

        Task Delete(int id);

        Task Update(AssentoEntity assento);
    }
}