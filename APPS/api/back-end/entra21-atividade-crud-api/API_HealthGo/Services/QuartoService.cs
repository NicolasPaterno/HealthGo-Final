using API_HealthGo.Responses;
using API_HealthGo.Contracts.Service;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Entities;
using API_HealthGo.DTO;
using API_HealthGo.Repository;

namespace API_HealthGo.Services
{
    public class QuartoService : IQuartoService
    {
        private IQuartoRepository _repository;

        public QuartoService(IQuartoRepository repository)
        {
            _repository = repository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Quarto excluído com sucesso!"
            };
        }

        public async Task<QuartoGetAllResponse> GetAll()
        {
            return new QuartoGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<QuartoEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(QuartoInsertDTO quarto)
        {
            await _repository.Insert(quarto);
            return new MessageResponse
            {
                Message = "Quarto inserido com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(QuartoEntity quarto)
        {
            await _repository.Update(quarto);
            return new MessageResponse
            {
                Message = "Quarto alterado com sucesso!"
            };
        }
    }
}