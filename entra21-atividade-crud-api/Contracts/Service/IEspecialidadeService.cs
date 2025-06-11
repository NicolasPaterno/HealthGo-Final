using entra21_atividade_crud_api.Response;
using entra21_atividade_crud_api.DTO;
using entra21_atividade_crud_api.Entity;
using entra21_atividade_crud_api.Response.Especialidade;

namespace entra21_atividade_crud_api.Contracts.Service
{
    public interface IEspecialidadeService
    {
        Task<MessageResponse> Delete(int id);

        Task<EspecialidadeGetAllResponse> GetAll();

        Task<EspecialidadeEntity> GetById(int id); 
        
        Task<MessageResponse> Post(EspecialidadeInsertDTO specialty);
        
        Task<MessageResponse> Update(EspecialidadeEntity specialty);
    }
}