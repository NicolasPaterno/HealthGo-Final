using API_HealthGo.Responses;
using API_HealthGo.Contracts.Service;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Entities;
using API_HealthGo.DTO;
using API_HealthGo.Repository;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Services
{
    public class OrdemServicoService : IOrdemServicoService
    {
        private IOrdemServicoRepository _repository;

        public OrdemServicoService(IOrdemServicoRepository repository)
        {
            _repository = repository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Ordem de Serviço excluída com sucesso!"
            };
        }

        public async Task<OrdemServicoGetAllResponse> GetAll()
        {
            return new OrdemServicoGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<OrdemServicoEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(OrdemServicoInsertDTO ordemServico)
        {
            await _repository.Insert(ordemServico);
            return new MessageResponse
            {
                Message = "Ordem de Serviço inserida com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(OrdemServicoEntity ordemServico)
        {
            await _repository.Update(ordemServico);
            return new MessageResponse
            {
                Message = "Ordem de Serviço alterada com sucesso!"
            };
        }

        public async Task<OrdemServicoGetLatestResponseDTO> GetLatestOrdemServicoByPessoaId(int pessoaId)
        {
            var entity = await _repository.GetLatestByPessoaId(pessoaId);
            if (entity == null)
            {
                return null;
            }

            return new OrdemServicoGetLatestResponseDTO
            {
                Id = entity.Id,
                DataCriacao = entity.DataCriacao,
                StatusOS = entity.StatusOS,
                FormaPagamento = entity.FormaPagamento,
                Pessoa_Id = entity.Pessoa_Id
            };
        }
    }
}