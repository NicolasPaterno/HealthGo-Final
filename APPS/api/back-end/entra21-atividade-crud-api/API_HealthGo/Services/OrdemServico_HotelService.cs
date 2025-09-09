using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Services
{
    public class OrdemServico_HotelService : IOrdemServico_HotelService
    {
        private readonly IOrdemServico_HotelRepository _repository;

        public OrdemServico_HotelService(IOrdemServico_HotelRepository repository)
        {
            _repository = repository;
        }

        public async Task<OrdemServico_HotelGetAllResponse> GetAll()
        {
            return new OrdemServico_HotelGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<OrdemServico_HotelEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(OrdemServico_HotelInsertDTO ordemServico_Hotel)
        {
            await _repository.Insert(ordemServico_Hotel);

            return new MessageResponse
            {
                Message = "Ordem de Serviço de Hotel criada com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(OrdemServico_HotelEntity ordemServico_Hotel)
        {
            var existing = await _repository.GetById(ordemServico_Hotel.Id);
            if (existing == null)
            {
                return new MessageResponse
                {
                    Message = "Ordem de Serviço de Hotel não encontrada."
                };
            }
            await _repository.Update(ordemServico_Hotel);
            return new MessageResponse
            {
                Message = "Ordem de Serviço de Hotel atualizada com sucesso!"
            };
        }

        public async Task<MessageResponse> Delete(int id)
        {
            var existing = await _repository.GetById(id);
            if (existing == null)
            {
                return new MessageResponse
                {
                    Message = "Ordem de Serviço de Hotel não encontrada."
                };
            }
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Ordem de Serviço de Hotel excluída com sucesso!"
            };
        }
    }
}
