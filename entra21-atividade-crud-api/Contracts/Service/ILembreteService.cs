using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response;

namespace entra21_atividade_crud_api.Contracts.Service
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