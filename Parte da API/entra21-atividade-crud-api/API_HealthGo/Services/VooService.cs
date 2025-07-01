using API_HealthGo.DTO;
using API_HealthGo.Response;
using API_HealthGo.Entity;
using API_HealthGo.Contracts.Service;
using API_HealthGo.Contracts.Repository;

namespace API_HealthGo.Services
{
    public class VooService : IVooService
    {
        private IVooRepository _repository;

        public VooService(IVooRepository repository)
        {
            _repository = repository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Voo excluida com sucesso!"
            };
        }

        public async Task<VooGetAllResponse> GetAll()
        {
            return new VooGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<VooEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(VooInsertDTO voo)
        {
            await _repository.Insert(voo);
            return new MessageResponse
            {
                Message = "Voo inserido com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(VooEntity voo)
        {
            await _repository.Update(voo);
            return new MessageResponse
            {
                Message = "Voo alterada com sucesso!"
            };
        }
    }
}
