using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Contracts.Repository
{
    public interface IGerenciaRepository
    {
        Task<IEnumerable<GerenciaEntity>> GetAllGerencia();

        Task<GerenciaEntity> GetGerenciaById(int id);

        Task InsertGerencia(GerenciaInsertDTO gerencia);

        Task UpdateGerencia(GerenciaEntity gerencia);

        Task DeleteGerencia(int id);
    }
}