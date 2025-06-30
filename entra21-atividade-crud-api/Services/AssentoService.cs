using MinhaPrimeiraApi.Repository;
using MinhaPrimeiraApi.Response;
using entra21_atividade_crud_api.Contracts.Repository;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Response.VooResponse;
using entra21_atividade_crud_api.Contracts.Service;
using entra21_atividade_crud_api.Entity;

namespace entra21_atividade_crud_api.Services
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
