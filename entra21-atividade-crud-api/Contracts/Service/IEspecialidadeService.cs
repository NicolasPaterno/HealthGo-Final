using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.Response.VooResponse;

namespace entra21_atividade_crud_api.Contracts.Service
{
    public interface IEspecialidadeService
    {
        Task<MessageResponse> Delete(int id);

        Task<MessageResponse> Post(EspecialidadeInsertDTO especialidade);

        Task<MessageResponse> Update(EspecialidadeEntity especialidade);

        Task<EspecialidadeGetAllResponse> GetAll();

        Task<EspecialidadeEntity> GetById(int id);
    }
}