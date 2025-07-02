using API_HealthGo.DTO;
using API_HealthGo.Entity;

namespace API_HealthGo.Contracts.Repository
{
    public interface IAeroportoRepository
    {
        Task<IEnumerable<AeroportoEntity>> GetAll();

        Task<AeroportoEntity> GetById(int id);

        Task Insert(AeroportoInsertDTO aeroporto);

        Task Delete(int id);

        Task Update(AeroportoEntity aeroporto);
    }
}