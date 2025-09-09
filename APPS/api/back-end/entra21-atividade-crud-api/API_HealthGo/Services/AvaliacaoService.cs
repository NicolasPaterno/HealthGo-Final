using API_HealthGo.Responses;
using API_HealthGo.Contracts.Service;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Entities;
using API_HealthGo.DTO;
using API_HealthGo.Repository;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Services
{
    public class AvaliacaoService : IAvaliacaoService
    {
        private IAvaliacaoRepository _repository;

        public AvaliacaoService(IAvaliacaoRepository repository)
        {
            _repository = repository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Avaliação excluída com sucesso!"
            };
        }

        public async Task<AvaliacaoGetAllResponse> GetAll()
        {
            return new AvaliacaoGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<AvaliacaoEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(AvaliacaoInsertDTO avaliacao)
        {
            await _repository.Insert(avaliacao);
            return new MessageResponse
            {
                Message = "Avaliação inserida com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(AvaliacaoEntity avaliacao)
        {
            await _repository.Update(avaliacao);
            return new MessageResponse
            {
                Message = "Avaliação alterada com sucesso!"
            };
        }
    }
}