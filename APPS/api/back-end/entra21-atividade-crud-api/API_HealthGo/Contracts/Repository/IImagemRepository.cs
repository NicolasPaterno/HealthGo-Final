using API_HealthGo.DTO;
using API_HealthGo.Entities;

namespace API_HealthGo.Contracts.Repositories
{
    public interface IImagemRepository
    {
        Task<IEnumerable<ImagemEntity>> GetAll();

        Task<ImagemEntity> GetById(int id);

        Task Insert(ImagemInsertDTO imagem);

        Task Delete(int id);

        Task Update(ImagemEntity imagem);
    }
}
