using API_HealthGo.Responses;
using API_HealthGo.Contracts.Service;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Entities;
using API_HealthGo.DTO;
using API_HealthGo.Repository;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Services
{
    public class CamaQuartoService : ICamaQuartoService
    {
        private ICamaQuartoRepository _repository;

        public CamaQuartoService(ICamaQuartoRepository repository)
        {
            _repository = repository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Cama excluída com sucesso!"
            };
        }

        public async Task<CamaQuartoGetAllResponse> GetAll()
        {
            return new CamaQuartoGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<CamaQuartoEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(CamaQuartoInsertDTO camaQuarto)
        {
            await _repository.Insert(camaQuarto);
            return new MessageResponse
            {
                Message = "Cama inserida com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(CamaQuartoEntity camaQuarto)
        {
            await _repository.Update(camaQuarto);
            return new MessageResponse
            {
                Message = "Cama alterada com sucesso!"
            };
        }
    }
}