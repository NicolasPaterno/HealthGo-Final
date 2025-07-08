using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;

namespace API_HealthGo.Services
{
    public class LembreteService : ILembreteService
    {

        private ILembreteRepository _repository;

        public LembreteService(ILembreteRepository lembrete)
        {
            _repository = lembrete;
        }

        public async Task<LembreteGetAllResponse> GetAllLembrete()
        {
            return new LembreteGetAllResponse
            {
                Data = await _repository.GetAllLembrete()
            };
        }

        public async Task<LembreteEntity> GetLembreteById(int id)
        {
            return await _repository.GetLembreteById(id);
        }

        public async Task<MessageResponse> Post(LembreteInsertDTO lembrete)
        {
            await _repository.InsertLembrete(lembrete);
            return new MessageResponse
            {
                Message = "Gerente inserido com sucesso!!"
            };
        }

        public async Task<MessageResponse> Update(LembreteEntity lembrete)
        {
            await _repository.UpdateLembrete(lembrete);
            return new MessageResponse
            {
                Message = "Gerente atualizado com sucesso!!"
            };
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.DeleteLembrete(id);
            return new MessageResponse
            {
                Message = "Gerente Removido com sucesso!!"
            };
        }
    }
}

