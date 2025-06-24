using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;
using MinhaPrimeiraApi.Contracts.Services;
using MinhaPrimeiraApi.Response;
using MinhaPrimeiraApi.Response.Estado;
using MinhaPrimeiraApi.Contracts.Repository;

namespace MinhaPrimeiraApi.Services
{
    public class EstadoService : IEstadoService
    {
        
        private IEstadoRepository _repository;

        public EstadoService(IEstadoRepository repository)
        {
            _repository = repository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Estado excluido com sucesso!"
            };
        }

        public async Task<EstadoGetAllResponse> GetAll()
        {
            return new EstadoGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<EstadoEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(EstadoInsertDTO estado)
        {
            await _repository.Insert(estado);
            return new MessageResponse
            {
                Message = "Estado inserido com sucesso!"
            };

        }

        public async Task<MessageResponse> Update(EstadoEntity estado)
        {
            await _repository.Update(estado);
            return new MessageResponse
            {
                Message = "Estado alterado com sucesso"
            };
        }
    }
}