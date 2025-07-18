using atividade_bd_csharp.Contracts.Repository;
using MassTransit.Clients;
using PrimeiraAPI.Contracts.Service;
using atividade_bd_csharp.DTO;
using atividade_bd_csharp.Entity;
using PrimeiraAPI.Response.CamaQuarto;
using PrimeiraAPI.Response;

namespace PrimeiraAPI.Services
{
    public class CamaQuartoService : ICamaQuartoService
    {
        private ICamaQuartoRepository _repository;

        public CamaQuartoService(ICamaQuartoRepository repository)
        {
            _repository = repository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = ("Cama excluida com sucesso!")
            };
        }

        public async Task<CamaQuartoGetAllResponse> GetAll()
        {
            return new CamaQuartoGetAllResponse
            {
                Data = (IEnumerable<CamaQuartoEntity>)await _repository.GetAll()
            };
        }

        public async Task<CamaQuartoEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(CamaQuartoInsertDTO camaquarto)
        {
            // Converter DTO para Entity
            var entity = new CamaQuartoEntity
            {
                Quantidade = camaquarto.Quantidade,
                TipoCama = (StatusCamaEntity)(int)camaquarto.TipoCama,
                QuartoId = camaquarto.QuartoId
            };
            await _repository.Insert(entity);
            return new MessageResponse
            {
                Message = "Cama inserida com sucesso!"
            };
        }

        public async Task<CamaQuartoGetAllResponse> Put(CamaQuartoEntity camaquarto)
        {
            await _repository.Update(camaquarto);
            return new CamaQuartoGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<CamaQuartoEntity> GetByTipoCama(params string[] tiposCama)
        {
            var result = await _repository.GetByTipoCama(tiposCama);
            return result.FirstOrDefault();
        }

        public async Task<MessageResponse> DeleteByQuartoId(int quartoId)
        {
            await _repository.DeleteByQuartoId(quartoId);
            return new MessageResponse
            {
                Message = "Todas as camas do quarto foram excluídas com sucesso!"
            };
        }

    }
}
