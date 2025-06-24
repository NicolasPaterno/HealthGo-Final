using APIHealthGo.Response;
using entra21_atividade_crud_api.DTO;
using MinhaPrimeiraApi.Entity;
using MinhaPrimeiraApi.Response.Aeroporto;

namespace MinhaPrimeiraApi.Contracts.Services
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