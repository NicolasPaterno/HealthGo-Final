using entra21_atividade_crud_api.Contracts.Repository;
using entra21_atividade_crud_api.Contracts.Service;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response;
using MyFirstCRUD.Repository;

namespace entra21_atividade_crud_api.Services
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

