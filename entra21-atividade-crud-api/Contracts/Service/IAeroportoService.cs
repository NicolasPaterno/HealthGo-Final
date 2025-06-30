using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.Response.Aeroporto;

namespace entra21_atividade_crud_api.Contracts.Service
{
    public interface IAeroportoService
    {
        Task<MessageResponse> Delete(int id);

        Task<AeroportoGetAllResponse> Get(int? cidade_Id);

        Task<AeroportoEntity> GetById(int id);

        Task<MessageResponse> Post(AeroportoDTO aeroporto);

        Task<MessageResponse> Update(AeroportoEntity aeroporto);
    }
}