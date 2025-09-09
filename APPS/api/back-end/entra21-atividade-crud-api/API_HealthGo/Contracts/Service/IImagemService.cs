using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses;
using API_HealthGo.Responses.MessageResponse;

namespace API_HealthGo.Contracts.Service
{
    public interface IImagemService
    {
        Task<MessageResponse> Delete(int id);

        Task<ImagemGetAllResponse> GetAll();

        Task<ImagemEntity> GetById(int id);

        Task<MessageResponse> Post(ImagemInsertDTO imagem);

        Task<MessageResponse> Update(ImagemEntity imagem);
    }
}
