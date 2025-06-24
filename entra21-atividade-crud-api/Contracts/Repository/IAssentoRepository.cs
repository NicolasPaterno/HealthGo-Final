using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;

namespace MinhaPrimeiraApi.Contracts.Repository
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