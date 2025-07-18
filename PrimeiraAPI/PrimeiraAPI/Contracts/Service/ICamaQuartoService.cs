using atividade_bd_csharp.DTO;
using atividade_bd_csharp.Entity;
using MassTransit.Clients;
using PrimeiraAPI.Response;
using PrimeiraAPI.Response.CamaQuarto;


namespace PrimeiraAPI.Contracts.Service
{
    public interface ICamaQuartoService
    {
        Task<CamaQuartoGetAllResponse> GetAll();
        Task<CamaQuartoEntity> GetById(int id);
       
        Task<CamaQuartoGetAllResponse> Put(CamaQuartoEntity camaquarto);
        Task<MessageResponse> Delete(int id);
        Task<CamaQuartoEntity> GetByTipoCama(params string[] tiposCama);
        Task<MessageResponse> Post(CamaQuartoInsertDTO camaquarto);
        Task<MessageResponse> DeleteByQuartoId(int quartoId);
    }
}
