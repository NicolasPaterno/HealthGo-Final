using API_HealthGo.Contracts.Repository;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Repositories;
using API_HealthGo.Responses;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Services
{
    public class OrdemServico_PrestadorServicoService : IOrdemServico_PrestadorServicoService
    {
        private readonly IOrdemServico_PrestadorServicoRepository _repository;

        public OrdemServico_PrestadorServicoService(IOrdemServico_PrestadorServicoRepository repository)
        {
            _repository = repository;
        }

        public async Task<OrdemServico_PrestadorServicoGetAllResponse> GetAll()
        {
            return new OrdemServico_PrestadorServicoGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<OrdemServico_PrestadorServicoEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(OrdemServico_PrestadorServicoInsertDTO ordemServico_PrestadorServico)
        {
            await _repository.Insert(ordemServico_PrestadorServico);

            return new MessageResponse
            {
                Message = "Ordem de Serviço de Prestador de Serviço criada com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(OrdemServico_PrestadorServicoEntity ordemServico_PrestadorServico)
        {
            var existing = await _repository.GetById(ordemServico_PrestadorServico.Id);
            if (existing == null)
            {
                return new MessageResponse
                {
                    Message = "Ordem de Serviço de Prestador de Serviço não encontrada."
                };
            }
            await _repository.Update(ordemServico_PrestadorServico);
            return new MessageResponse
            {
                Message = "Ordem de Serviço de Prestador de Serviço atualizada com sucesso!"
            };
        }

        public async Task<MessageResponse> Delete(int id)
        {
            var existing = await _repository.GetById(id);
            if (existing == null)
            {
                return new MessageResponse
                {
                    Message = "Ordem de Serviço de Prestador de Serviço não encontrada."
                };
            }
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Ordem de Serviço de Prestador de Serviço excluída com sucesso!"
            };
        }
    }
}