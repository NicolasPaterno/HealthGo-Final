using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Services
{
    public class HotelService : IHotelService
    {
        private IHotelRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public HotelService(IHotelRepository repository, IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<HotelGetAllResponse> GetAll()
        {
            return new HotelGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<HotelEntity> GetHotelById(int id)
        {
            return await _repository.GetHotelById(id);
        }

        public async Task<MessageResponse> Post(HotelInsertDTO hotel, int pessoaId)
        {
            // Validações básicas
            if (string.IsNullOrWhiteSpace(hotel.Nome))
            {
                return new MessageResponse
                {
                    Message = "Nome do hotel é obrigatório!"
                };
            }

            if (string.IsNullOrWhiteSpace(hotel.CNPJ))
            {
                return new MessageResponse
                {
                    Message = "CNPJ é obrigatório!"
                };
            }

            if (string.IsNullOrWhiteSpace(hotel.Tipo))
            {
                return new MessageResponse
                {
                    Message = "Tipo do hotel é obrigatório!"
                };
            }

            if (string.IsNullOrWhiteSpace(hotel.Email))
            {
                return new MessageResponse
                {
                    Message = "Email é obrigatório!"
                };
            }

            if (string.IsNullOrWhiteSpace(hotel.CEP))
            {
                return new MessageResponse
                {
                    Message = "CEP é obrigatório!"
                };
            }

            if (string.IsNullOrWhiteSpace(hotel.Bairro))
            {
                return new MessageResponse
                {
                    Message = "Bairro é obrigatório!"
                };
            }

            if (string.IsNullOrWhiteSpace(hotel.Rua))
            {
                return new MessageResponse
                {
                    Message = "Rua é obrigatória!"
                };
            }

            if (string.IsNullOrWhiteSpace(hotel.NumeroEndereco))
            {
                return new MessageResponse
                {
                    Message = "Número do endereço é obrigatório!"
                };
            }

            if (hotel.Cidade_Id <= 0)
            {
                return new MessageResponse
                {
                    Message = "ID da cidade é obrigatório!"
                };
            }

            hotel.Pessoa_Id = pessoaId;
            await _repository.Insert(hotel);
            return new MessageResponse
            {
                Message = "Hotel inserido com sucesso!!"
            };
        }

        public async Task<MessageResponse> Update(HotelEntity hotel)
        {
            await _repository.Update(hotel);
            return new MessageResponse
            {
                Message = "Hotel atualizado com sucesso!!"
            };
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Hotel deletado com sucesso!!"
            };
        }

        public async Task<HotelGetAllResponse> GetHotelsByPessoaId(int pessoaId)
        {
            var hotels = await _repository.GetHotelsByPessoaId(pessoaId);
            return new HotelGetAllResponse
            {
                Data = hotels
            };
        }
    }
    }
