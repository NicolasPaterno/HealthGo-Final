using API_HealthGo.Responses;
using API_HealthGo.Contracts.Service;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Entities;
using API_HealthGo.DTO;

namespace API_HealthGo.Services
{
    public class HotelService : IHotelService
    {
        private IHotelRepository _repository;

        public HotelService(IHotelRepository repository)
        {
            _repository = repository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Hotel excluído com sucesso!"
            };
        }

        public async Task<HotelGetAllResponse> GetAll()
        {
            return new HotelGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<HotelEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(HotelInsertDTO hotel)
        {
            await _repository.Insert(hotel);
            return new MessageResponse
            {
                Message = "Hotel inserido com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(HotelEntity hotel)
        {
            await _repository.Update(hotel);
            return new MessageResponse
            {
                Message = "Hotel alterado com sucesso!"
            };
        }
    }
}