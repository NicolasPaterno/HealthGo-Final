using API_HealthGo.DTO;
using API_HealthGo.Entity;

namespace API_HealthGo.Contracts.Repository
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