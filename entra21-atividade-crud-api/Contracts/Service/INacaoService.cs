using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.Response.Nacao;

namespace entra21_atividade_crud_api.Contracts.Service
{
    public interface INacaoService
    {
        Task<MessageResponse> Delete(int id);

        Task<NacaoGetAllResponse> GetAll();

        Task<NacaoEntity> GetById(int id);

        Task<MessageResponse> Post(NacaoInsertDTO nacao);

        Task<MessageResponse> Update(NacaoEntity nacao);
    }
}