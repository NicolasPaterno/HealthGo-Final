using MinhaPrimeiraApi.Repository;
using MinhaPrimeiraApi.Response;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Contracts.Service;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.Response.VooResponse;
using entra21_atividade_crud_api.Contracts.Repository;

namespace entra21_atividade_crud_api.Services
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
