using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Contracts.Repository
{
    public interface INacaoRepository
    {
        Task<IEnumerable<NacaoEntity>> GetAll();

        Task<NacaoEntity> GetById(int id);

        Task Insert(NacaoInsertDTO nacao);

        Task Delete(int id);

        Task Update(NacaoEntity nacao);
    }
}