using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;

namespace API_HealthGo.Contracts.Service
{
    public interface IPessoaService
    {
        Task<PessoaGetAllResponse> GetAllPessoa();

        Task<PessoaEntity> GetPessoaById(int id);

        Task<MessageResponse> Post(PessoaInsertDTO pessoa);

        Task<MessageResponse> Delete(int id);

        Task<MessageResponse> Update(PessoaEntity pessoa);

        Task<MessageResponse> ChangePassword(ChangePasswordDTO changePasswordDto);

        Task<MessageResponse> ChangeEmail(ChangeEmailDTO changeEmailDto);
    }
}