using API_HealthGo.Responses;
using API_HealthGo.Contracts.Service;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Entities;
using API_HealthGo.DTO;
using API_HealthGo.Repository;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Services
{
    public class QuartoService : IQuartoService
    {
        private IQuartoRepository _repository;
        private IHotelRepository _hotelRepository;

        public QuartoService(IQuartoRepository repository, IHotelRepository hotelRepository)
        {
            _repository = repository;
            _hotelRepository = hotelRepository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Quarto excluído com sucesso!"
            };
        }

        public async Task<QuartoGetAllResponse> GetAll()
        {
            return new QuartoGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<QuartoEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<QuartoGetAllResponse> GetByHotelId(int hotelId)
        {
            return new QuartoGetAllResponse
            {
                Data = await _repository.GetByHotelId(hotelId)
            };
        }

        public async Task<MessageResponse> Post(QuartoInsertDTO quarto)
        {
            // Validação básica dos dados
            if (string.IsNullOrWhiteSpace(quarto.Numero))
            {
                return new MessageResponse
                {
                    Message = "Número do quarto é obrigatório!"
                };
            }

            if (quarto.Preco <= 0)
            {
                return new MessageResponse
                {
                    Message = "Preço deve ser maior que zero!"
                };
            }

            if (quarto.LimitePessoa <= 0)
            {
                return new MessageResponse
                {
                    Message = "Limite de pessoas deve ser maior que zero!"
                };
            }

            if (quarto.Hotel_Id <= 0)
            {
                return new MessageResponse
                {
                    Message = "ID do hotel é obrigatório!"
                };
            }

            // Verificar se o hotel existe
            try
            {
                var hotel = await _hotelRepository.GetHotelById(quarto.Hotel_Id);
                if (hotel == null)
                {
                    return new MessageResponse
                    {
                        Message = "Hotel não encontrado!"
                    };
                }
            }
            catch
            {
                return new MessageResponse
                {
                    Message = "Hotel não encontrado!"
                };
            }

            await _repository.Insert(quarto);
            return new MessageResponse
            {
                Message = "Quarto inserido com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(QuartoEntity quarto)
        {
            await _repository.Update(quarto);
            return new MessageResponse
            {
                Message = "Quarto alterado com sucesso!"
            };
        }
    }
}