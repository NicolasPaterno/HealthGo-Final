using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response;

namespace API_HealthGo.Contracts.Service
{
    public interface IImagemService
    {
        Task<ImagemGetAllResponse> GetAll();

        Task<ImagemEntity> GetById(int id);

        Task<MessageResponse> Post(ImagemInsertDTO imagem);

        Task<MessageResponse> Update(ImagemEntity imagem);

        Task<MessageResponse> Delete(int id);
    }
}
