using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Contracts.Service
{
    public interface IPrestadorServicoService
    {
        Task<PrestadorServicoGetAllResponse> GetAll();

        Task<PrestadorServico_All_Infos_DTOGetAllResponse> GetPrestadorAllInfos();

        Task<PrestadorServicoEntity> GetById(int id);

        Task<MessageResponse> Post(PrestadorServicoInsertDTO prestadorServico);

        Task<MessageResponse> Update(PrestadorServicoEntity prestadorServico);

        Task<MessageResponse> Delete(int id);

        Task<PrestadorServicoEntity> GetByPessoaId(int id);

        Task<IEnumerable<PrestadorServicoEspecialidadeDTO>> GetAllPrestadoresComEspecialidades();

        Task<IEnumerable<PrestadorServicoAgendaDTO>> GetAgendaByPrestadorId(int prestadorId);

        Task<int> GetByEmailAndTelefone(string email, string telefone);
    }
}
