
using APIHealthGo.Response;
using MinhaPrimeiraApi.Contracts.Service;
using MinhaPrimeiraApi.Response.Especialidade;
using MyFirstCRUD.Contracts.Repository;
using MyFirstCRUD.DTO;
using MyFirstCRUD.entity;

namespace MinhaPrimeiraApi.Services
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

        public async Task <EspecialidadeGetAllResponse> GetAll()
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
