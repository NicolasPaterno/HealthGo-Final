using API_HealthGo.DTO;
using API_HealthGo.Entity;

namespace API_HealthGo.Contracts.Repository
{
    public interface IPassagemRepository
    {
        Task<IEnumerable<PassagemEntity>> GetAll();

        Task<PassagemEntity> GetById(int id);

        Task Insert(PassagemInsertDTO passagem);

        Task Delete(int id);

        Task Update(PassagemEntity passagem);
    }
}
