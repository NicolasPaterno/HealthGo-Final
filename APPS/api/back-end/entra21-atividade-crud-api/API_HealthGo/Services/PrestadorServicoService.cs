using API_HealthGo.Responses;
using API_HealthGo.Contracts.Service;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Entities;
using API_HealthGo.DTO;
using API_HealthGo.Repository;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Services
{
    public class PrestadorServicoService : IPrestadorServicoService
    {
        private IPrestadorServicoRepository _repository;

        public PrestadorServicoService(IPrestadorServicoRepository repository)
        {
            _repository = repository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Prestador de Serviço excluído com sucesso!"
            };
        }

        public async Task<PrestadorServicoGetAllResponse> GetAll()
        {
            return new PrestadorServicoGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<PrestadorServico_All_Infos_DTOGetAllResponse> GetPrestadorAllInfos()
        {
            return new PrestadorServico_All_Infos_DTOGetAllResponse
            {
                Data = await _repository.GetPrestadorAllInfos()
            };
        }

        public async Task<PrestadorServicoEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(PrestadorServicoInsertDTO prestadorServico)
        {
            await _repository.Insert(prestadorServico);
            return new MessageResponse
            {
                Message = "Prestador de Serviço inserido com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(PrestadorServicoEntity prestadorServico)
        {
            await _repository.Update(prestadorServico);
            return new MessageResponse
            {
                Message = "Prestador de Serviço alterado com sucesso!"
            };
        }
    }
}