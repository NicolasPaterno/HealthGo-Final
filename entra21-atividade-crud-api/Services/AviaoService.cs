using MinhaPrimeiraApi.Contracts.Repository;
using MinhaPrimeiraApi.Contracts.Service;
using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;
using MinhaPrimeiraApi.Repository;
using MinhaPrimeiraApi.Response;
using MinhaPrimeiraApi.Response.Especialidade;

namespace MinhaPrimeiraApi.Services
{
    public class AviaoService : IAviaoService
    {
        private IAviaoRepository _repository;

        public AviaoService(IAviaoRepository repository)
        {
            _repository = repository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Aviao excluida com sucesso!"
            };
        }

        public async Task<AviaoGetAllResponse> GetAll()
        {
            return new AviaoGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<AviaoEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(AviaoInsertDTO aviao)
        {
            await _repository.Insert(aviao);
            return new MessageResponse
            {
                Message = "Aviao inserido com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(AviaoEntity aviao)
        {
            await _repository.Update(aviao);
            return new MessageResponse
            {
                Message = "Aviao alterada com sucesso!"
            };
        }
    }
}
