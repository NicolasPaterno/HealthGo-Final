using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;

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
    }
}