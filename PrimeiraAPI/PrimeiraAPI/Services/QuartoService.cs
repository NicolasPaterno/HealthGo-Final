using atividade_bd_csharp.Contracts.Repository;
using atividade_bd_csharp.DTO;
using atividade_bd_csharp.Entity;
using atividade_bd_csharp.Repository;
using MassTransit.Clients;
using PrimeiraAPI.Contracts.Service;
using PrimeiraAPI.Response.Quarto;

namespace PrimeiraAPI.Services
{
    public class QuartoService : IQuartoService
    {
        private readonly IQuartoRepository _quartorepository;
        private readonly ICamaQuartoService _camaQuartoService;

        public QuartoService(IQuartoRepository repository, ICamaQuartoService camaQuartoService)
        {
            _quartorepository = repository;
            _camaQuartoService = camaQuartoService;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _camaQuartoService.DeleteByQuartoId(id);
            await _quartorepository.DeleteOrdemServicoHotelByQuartoId(id);
            await _quartorepository.Delete(id);
            return new MessageResponse
            {
                Message = "Quarto, camas e ordens de serviço associadas excluídos com sucesso!"
            };
        }

        public async Task<QuartoGetAllResponse> GetAll()
        {
            return new QuartoGetAllResponse
            {
                Data = await _quartorepository.GetAll()
            };
        }

        public async Task<QuartoEntity> GetById(int id)
        {
            return await _quartorepository.GetById(id);
        }

        public async Task<MessageResponse> Post(QuartoInsertDTO quarto)
        {
            await _quartorepository.Insert(quarto);
            return new MessageResponse
            {
                Message = "Quarto inserido com sucesso!"
            };
        }

        public async Task<MessageResponse> Put(int id, QuartoEntity quarto, QuartoInsertDTO dto)
        {
            await _quartorepository.Update(id, quarto, dto);
            return new MessageResponse
            {
                Message = "Quarto alterado com sucesso!"
            };
        }
    }

}
