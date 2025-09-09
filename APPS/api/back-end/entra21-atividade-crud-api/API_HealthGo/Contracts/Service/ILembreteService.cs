using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Contracts.Service
{
    public interface ILembreteService
    {
        Task<LembreteGetAllResponse> GetAllLembrete();

        Task<LembreteEntity> GetLembreteById(int id);
        Task<LembreteGetAllResponse> GetLembreteByPessoaId(int pessoaId);
        Task<MessageResponse> Post(LembreteInsertDTO lembrete);

        Task<MessageResponse> Delete(int id);

        Task<MessageResponse> Update(LembreteEntity lemberete);
    }
}