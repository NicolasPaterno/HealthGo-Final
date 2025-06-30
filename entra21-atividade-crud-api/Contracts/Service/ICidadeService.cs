using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.Response.Cidade;

namespace entra21_atividade_crud_api.Contracts.Service
{
    public interface ICidadeService
    {
        Task<MessageResponse> Delete(int id);

        Task<CidadeGetAllResponse> GetAll();

        Task<CidadeEntity> GetById(int id);

        Task<MessageResponse> Post(CidadeInsertDTO cidade);

        Task<MessageResponse> Update(CidadeEntity cidade);
    }
}