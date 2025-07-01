using API_HealthGo.DTO;
using API_HealthGo.Entity;

namespace API_HealthGo.Contracts.Repository
{
    public interface IVooRepository
    {
        Task<IEnumerable<VooEntity>> GetAll();

        Task<VooEntity> GetById(int id);

        Task Insert(VooInsertDTO voo);

        Task Delete(int id);

        Task Update(VooEntity voo);
    }
}