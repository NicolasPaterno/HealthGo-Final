using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;
using MinhaPrimeiraApi.Contracts.Services;
using MinhaPrimeiraApi.Response;
using MinhaPrimeiraApi.Response.Nacao;
using MinhaPrimeiraApi.Contracts.Repository;

namespace MinhaPrimeiraApi.Services
{
    public class NacaoService : INacaoService
    {
        
        private INacaoRepository _repository;

        public NacaoService(INacaoRepository repository)
        {
            _repository = repository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Nação excluida com sucesso!"
            };
        }

        public async Task<NacaoGetAllResponse> GetAll()
        {
            return new NacaoGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<NacaoEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(NacaoInsertDTO nacao)
        {
            await _repository.Insert(nacao);
            return new MessageResponse
            {
                Message = "Nação inserida com sucesso!"
            };

        }

        public async Task<MessageResponse> Update(NacaoEntity nacao)
        {
            await _repository.Update(nacao);
            return new MessageResponse
            {
                Message = "Nação alterada com sucesso"
            };
        }
    }
}