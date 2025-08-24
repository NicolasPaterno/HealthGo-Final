using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Contracts.Repositories
{
    public interface IPrestadorServicoRepository
    {
        Task<IEnumerable<PrestadorServicoEntity>> GetAll();

        Task<IEnumerable<PrestadorServico_All_Infos_DTO>> GetPrestadorAllInfos();

        Task<PrestadorServicoEntity> GetById(int id);

        Task Insert(PrestadorServicoInsertDTO prestadorServico);

        Task Delete(int id);

        Task Update(PrestadorServicoEntity prestadorServico);

        Task<PrestadorServicoEntity> GetByPessoaId(int id);
    }
}
