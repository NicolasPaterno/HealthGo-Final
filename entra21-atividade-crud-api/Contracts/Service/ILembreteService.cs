using APIHealthGo.Response;
using MyFirstCRUD.DTO;
using MyFirstCRUD.Entity;

namespace APIHealthGo.Contracts.Service
{
    public interface ILembreteService
    {
        Task<LembreteGetAllResponse> GetAllLembrete();
        Task<LembreteEntity> GetLembreteById(int id);
        Task<MessageResponse> Post(LembreteInsertDTO lembrete);
        Task<MessageResponse> Delete(int id);
        Task<MessageResponse> Update(LembreteEntity lemberete);
    }
}
