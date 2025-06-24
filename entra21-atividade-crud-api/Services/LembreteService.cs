using APIHealthGo.Contracts.Service;
using APIHealthGo.Response;
using MyFirstCRUD.Contracts.Repository;
using MyFirstCRUD.DTO;
using MyFirstCRUD.Entity;
using MyFirstCRUD.Repository;

namespace APIHealthGo.Services
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
                message = "Gerente inserido com sucesso!!"
            };
        }

        public async Task<MessageResponse> Update(LembreteEntity lembrete)
        {
            await _repository.UpdateLembrete(lembrete);
            return new MessageResponse
            {
                message = "Gerente atualizado com sucesso!!"
            };
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.DeleteLembrete(id);
            return new MessageResponse
            {
                message = "Gerente Removido com sucesso!!"
            };
        }
    }
}

