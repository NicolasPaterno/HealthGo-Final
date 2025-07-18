
using atividade_bd_csharp.DTO;
using atividade_bd_csharp.Entity;
using MassTransit.Clients;
using PrimeiraAPI.Response.Quarto;


namespace PrimeiraAPI.Contracts.Service
{
    public interface IQuartoService
    {
        Task<MessageResponse> Post(QuartoInsertDTO quarto);
        Task<QuartoGetAllResponse> GetAll();
        Task<QuartoEntity> GetById(int id);
        Task<MessageResponse> Put(int id, QuartoEntity quarto, QuartoInsertDTO dto);
        Task<MessageResponse> Delete(int id);
    }
}
