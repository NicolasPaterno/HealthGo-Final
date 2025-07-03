using API_HealthGo.DTO;
using API_HealthGo.Entity;

namespace API_HealthGo.Contracts.Repository
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
