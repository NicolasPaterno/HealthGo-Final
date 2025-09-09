using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Services
{
    public class EspecialidadeService : IEspecialidadeService
    {
        private IEspecialidadeRepository _repository;

        public EspecialidadeService(IEspecialidadeRepository especialidade)
        {
            _repository = especialidade;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Especialidade excluida com sucesso!"
            };
        }

        public async Task<EspecialidadeGetAllResponse> GetAll()
        {
            return new EspecialidadeGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<EspecialidadeEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(EspecialidadeInsertDTO especialidade)
        {
            await _repository.Insert(especialidade);
            return new MessageResponse
            {
                Message = "Especialidade inserido com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(EspecialidadeEntity especialidade)
        {
            await _repository.Update(especialidade);
            return new MessageResponse
            {
                Message = "Especialidade alterada com sucesso!"
            };
        }
    }
}
