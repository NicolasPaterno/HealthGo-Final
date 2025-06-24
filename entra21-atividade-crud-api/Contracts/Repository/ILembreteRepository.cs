using MyFirstCRUD.DTO;
using MyFirstCRUD.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyFirstCRUD.Contracts.Repository
{
    public interface ILembreteRepository
    {
        Task<IEnumerable<LembreteEntity>> GetAllLembrete();
        Task<LembreteEntity> GetLembreteById(int id);
        Task InsertLembrete(LembreteInsertDTO lembrete);
        Task UpdateLembrete(LembreteEntity lembrete);
        Task DeleteLembrete(int id);
    }
}
