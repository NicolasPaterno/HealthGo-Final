using API_HealthGo.Responses;
using API_HealthGo.Contracts.Service;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Entities;
using API_HealthGo.DTO;
using API_HealthGo.Contracts.Repository;

namespace API_HealthGo.Services
{
    public class ContaGerenciaService : IContaGerenciaService
    {
        private readonly IContaGerenciaRepository _repository;

        public ContaGerenciaService(IContaGerenciaRepository repository)
        {
            _repository = repository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Conta de gerência excluída com sucesso!"
            };
        }

        public async Task<ContaGerenciaGetAllResponse> GetAll()
        {
            return new ContaGerenciaGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<ContaGerenciaEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(ContaGerenciaInsertDTO contaGerencia)
        {
            await _repository.Insert(contaGerencia);
            return new MessageResponse
            {
                Message = "Conta de gerência inserida com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(ContaGerenciaEntity contaGerencia)
        {
            await _repository.Update(contaGerencia);
            return new MessageResponse
            {
                Message = "Conta de gerência atualizada com sucesso!"
            };
        }
    }
}
