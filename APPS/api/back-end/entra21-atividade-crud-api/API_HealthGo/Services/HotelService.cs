using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace API_HealthGo.Services
{
    public class HotelService : IHotelService
    {
        private readonly IHotelRepository _repository;
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

        public async Task<MessageResponse> Post(HotelInsertDTO hotelDto)
        {
            var userIdClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                throw new Exception("ID do usuário não encontrado no token.");
            }

            var hotel = new HotelInsertDTO
            {
                CNPJ = hotelDto.CNPJ,
                Nome = hotelDto.Nome,
                Tipo = hotelDto.Tipo,
                Email = hotelDto.Email,
                Telefone = hotelDto.Telefone,
                Site = hotelDto.Site,
                Acessibilidade = hotelDto.Acessibilidade,
                CEP = hotelDto.CEP,
                Bairro = hotelDto.Bairro,
                Rua = hotelDto.Rua,
                NumeroEndereco = hotelDto.NumeroEndereco,
                Descricao = hotelDto.Descricao,
                Ativo = hotelDto.Ativo,
                DataInicio = hotelDto.DataInicio,
                Cidade_Id = hotelDto.Cidade_Id,
                Pessoa_Id = userId
            };

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
    }
}