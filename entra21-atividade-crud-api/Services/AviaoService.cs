using entra21_atividade_crud_api.Contracts.Repository;
using entra21_atividade_crud_api.Contracts.Service;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.Response.VooResponse;
using MinhaPrimeiraApi.Repository;
using MinhaPrimeiraApi.Response;

namespace entra21_atividade_crud_api.Services
{
    public class AviaoService : IAviaoService
    {
        private IAviaoRepository _repository;

        public AviaoService(IAviaoRepository repository)
        {
            _repository = repository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Aviao excluida com sucesso!"
            };
        }

        public async Task<AviaoGetAllResponse> GetAll()
        {
            return new AviaoGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<AviaoEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(AviaoInsertDTO aviao)
        {
            await _repository.Insert(aviao);
            return new MessageResponse
            {
                Message = "Aviao inserido com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(AviaoEntity aviao)
        {
            await _repository.Update(aviao);
            return new MessageResponse
            {
                Message = "Aviao alterada com sucesso!"
            };
        }
    }
}
