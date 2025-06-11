using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Repository;
using entra21_atividade_crud_api.Contracts.Service;
using entra21_atividade_crud_api.Response.Especialidade;

namespace entra21_atividade_crud_api.Services
{

    public class EspecialidadeService : IEspecialidadeService
    {
        public async Task<MessageResponse> Delete(int id)
        {
            EspecialidadeRepository _repository = new EspecialidadeRepository();
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Especialidade excluído com sucesso"
            };
        }

        public async Task<EspecialidadeGetAllResponse> GetAll()
        {
            EspecialidadeRepository _repository = new EspecialidadeRepository();
            return new EspecialidadeGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<EspecialidadeEntity> GetById(int id)
        {
            EspecialidadeRepository _repository = new EspecialidadeRepository();
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(EspecialidadeInsertDTO specialty)
        {
            EspecialidadeRepository _repository = new EspecialidadeRepository();
            await _repository.Insert(specialty);
            return new MessageResponse
            {
                Message = "Especialidade inserido com sucesso"
            };
        }

        public async Task<MessageResponse> Update(EspecialidadeEntity specialty)
        {
            EspecialidadeRepository _repository = new EspecialidadeRepository();
            await _repository.Update(specialty);
            return new MessageResponse
            {
                Message = "Especialidade alterado com sucesso"
            };
        }

    }
}