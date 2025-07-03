using API_HealthGo.Entity;
using API_HealthGo.Contracts.Repository;
using API_HealthGo.Contracts.Service;
using API_HealthGo.DTO;
using API_HealthGo.Response.Lembrete;
using API_HealthGo.Response;

namespace API_HealthGo.Services
{
    public class ImagemService : IImagemService
    {
        private IImagemRepository _repository;

        public ImagemService(IImagemRepository repository)
        {
            _repository = repository;
        }

        public async Task<MessageResponse> Delete(int id)
        {
            await _repository.Delete(id);
            return new MessageResponse
            {
                Message = "Imagem excluída com sucesso!"
            };
        }

        public async Task<ImagemGetAllResponse> GetAll()
        {
            return new ImagemGetAllResponse
            {
                Data = await _repository.GetAll()
            };
        }

        public async Task<ImagemEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<MessageResponse> Post(ImagemInsertDTO imagem)
        {
            await _repository.Insert(imagem);
            return new MessageResponse
            {
                Message = "Imagem inserida com sucesso!"
            };
        }

        public async Task<MessageResponse> Update(ImagemEntity imagem)
        {
            await _repository.Update(imagem);
            return new MessageResponse
            {
                Message = "Imagem alterada com sucesso!"
            };
        }
    }
}