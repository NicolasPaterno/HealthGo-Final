using API_HealthGo.Contracts.Service;
using API_HealthGo.Responses.VooResponse;
using API_HealthGo.Responses;
using API_HealthGo.Entities;
using API_HealthGo.DTO;
using API_HealthGo.Contracts.Repositories;

namespace API_HealthGo.Services
{
    public class PassagemService : IPassagemService
    {
        private IPassagemRepository _repository;

        public PassagemService(IPassagemRepository repository)
        {
            _repository = repository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Passagem excluida com sucesso!"
            };
        }

        public async Task<PassagemGetAllResponse> GetAll()
        {
            return new PassagemGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<PassagemEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(PassagemInsertDTO passagem)
        {
            await _repository.Insert(passagem);
            return new MessageResponse
            {
                Message = "Passagem inserido com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(PassagemEntity passagem)
        {
            await _repository.Update(passagem);
            return new MessageResponse
            {
                Message = "Passagem alterada com sucesso!"
            };
        }
    }
}
