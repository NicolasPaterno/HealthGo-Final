using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;

namespace MinhaPrimeiraApi.Contracts.Repository
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
