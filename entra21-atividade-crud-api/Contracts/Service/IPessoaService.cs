using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response;

namespace entra21_atividade_crud_api.Contracts.Service
{
    public interface IPessoaService
    {
        Task<PessoaGetAllResponse> GetAllPessoa();

        Task<PessoaEntity> GetPessoaById(int id);

        Task<MessageResponse> Post(PessoaInsertDTO pessoa);

        Task<MessageResponse> Delete(int id);

        Task<MessageResponse> Update(PessoaEntity pessoa);
    }
}