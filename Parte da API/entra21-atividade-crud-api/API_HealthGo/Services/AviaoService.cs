using API_HealthGo.Contracts.Repository;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;
using API_HealthGo.Response.VooResponse;

namespace API_HealthGo.Services
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
