using API_HealthGo.Responses;
using API_HealthGo.Contracts.Service;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Entities;
using API_HealthGo.DTO;

namespace API_HealthGo.Services
{
    public class AssentoService : IAssentoService
    {
        private IAssentoRepository _repository;

        public AssentoService(IAssentoRepository repository)
        {
            _repository = repository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Assento excluida com sucesso!"
            };
        }

        public async Task<AssentoGetAllResponse> GetAll()
        {
            return new AssentoGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<AssentoEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(AssentoInsertDTO assento)
        {
            await _repository.Insert(assento);
            return new MessageResponse
            {
                Message = "Assento inserido com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(AssentoEntity assento)
        {
            await _repository.Update(assento);
            return new MessageResponse
            {
                Message = "Assento alterada com sucesso!"
            };
        }
    }
}
