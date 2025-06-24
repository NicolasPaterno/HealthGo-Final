using MyFirstCRUD.DTO;
using MyFirstCRUD.Entity;

namespace MyFirstCRUD.Contracts.Repository
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