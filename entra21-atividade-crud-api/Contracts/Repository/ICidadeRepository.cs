using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Contracts.Repository
{
    public interface ICidadeRepository
    {
        Task<IEnumerable<CidadeEntity>> GetAll();

        Task<CidadeEntity> GetById(int id);

        Task Insert(CidadeInsertDTO cidade);

        Task Delete(int id);

        Task Update(CidadeEntity cidade);
    }
}