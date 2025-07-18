using atividade_bd_csharp.Contracts.Repository;
using atividade_bd_csharp.DTO;
using atividade_bd_csharp.Entity;
using MassTransit.Clients;
using PrimeiraAPI.Contracts.Service;
using PrimeiraAPI.Response.Hotel;
using PrimeiraAPI.Response;

namespace PrimeiraAPI.Services
{
    public class HotelService : IHotelService
    {
        private IHotelRepository _hotelrepository;


        public HotelService(IHotelRepository hotelrepository)
        {
            _hotelrepository = hotelrepository;
        }

        public async Task<HotelGetAllResponse> Delete(int id)
        {
            await _hotelrepository.Delete(id);
            return new HotelGetAllResponse
            {
                Data = await _hotelrepository.GetAll()
            };
        }

        public async Task<HotelGetAllResponse> GetAll()
        {
            return new HotelGetAllResponse
            {
                Data = await _hotelrepository.GetAll()
            };
        }

        public async Task<HotelEntity> GetById(int id)
        {
            return await _hotelrepository.GetById(id);
        }

        public async Task<MessageResponse> Post(HotelInsertDTO hotel)
        {
            await _hotelrepository.Insert(hotel);
            return new MessageResponse
            {
                Message = "Hotel inserido com sucesso!"
            };
        }

        public async Task<MessageResponse> Put(HotelEntity hotel)
        {
            await _hotelrepository.Update(hotel);
            return new MessageResponse
            {
                Message = "Hotel alterado com sucesso!"
            };
        }

        public async Task<HotelEntity> GetByCidadeId(int cidadeId)
        {
            var result = await _hotelrepository.GetByCidadeId(cidadeId);
            return result.FirstOrDefault();
        }
    }
}
