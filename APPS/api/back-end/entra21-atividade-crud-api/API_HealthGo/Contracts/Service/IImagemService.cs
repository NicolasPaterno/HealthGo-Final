using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Response.Estado;
using API_HealthGo.Response;
using API_HealthGo.Response.Lembrete;

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
