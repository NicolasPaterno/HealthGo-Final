using MinhaPrimeiraApi.Response;
using entra21_atividade_crud_api.Contracts.Repository;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Contracts.Service;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.Response.Estado;

namespace entra21_atividade_crud_api.Services
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