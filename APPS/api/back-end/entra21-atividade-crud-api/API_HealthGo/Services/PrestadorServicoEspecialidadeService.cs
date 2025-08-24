using API_HealthGo.Contracts.Repository;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Services
{
    public class PrestadorServicoEspecialidadeService : IPrestadorServicoEspecialidadeService
    {
        private readonly IPrestadorServicoEspecialidadeRepository _repository;

        public PrestadorServicoEspecialidadeService(IPrestadorServicoEspecialidadeRepository repository)
        {
            _repository = repository;
        }

        public async Task<PrestadorServicoEspecialidadeGetAllResponse> GetAll()
        {
            return new PrestadorServicoEspecialidadeGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<PrestadorServicoEspecialidadeEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(PrestadorServicoEspecialidadeInsertDTO entity)
        {
            await _repository.Insert(entity);
            return new MessageResponse
            {
                Message = "Relação Prestador/Especialidade inserida com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(PrestadorServicoEspecialidadeEntity entity)
        {
            await _repository.Update(entity);
            return new MessageResponse
            {
                Message = "Relação Prestador/Especialidade alterada com sucesso!"
            };
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Relação Prestador/Especialidade excluída com sucesso!"
            };
        }
    }
}
