using MinhaPrimeiraApi.DTO.Aeroporto;
using MinhaPrimeiraApi.Entity;
using MinhaPrimeiraApi.Response;
using MinhaPrimeiraApi.Response.Aeroporto;

namespace MinhaPrimeiraApi.Contracts.Services
{
    public interface IAeroportoService
    {
        Task<MessageResponse> Delete(int id);

        Task<AeroportoGetAllResponse> Get(int? cidade_Id); // lembre que a lista é um atributo dele //mudado o nome de GetAll pra Get pq vai ser usado pelo filter tbm, pra ficar mais generico, Get vai GetAll e GetByFilter

        //Task<AeroportoGetByFilterResponse> GetByFilter(Aeroporto_Cidade_Id cidade_Id); // mudado pra response pq é mais seguro que passar a entity, e pq eh apenas sáida, e n trasnição como dto

        Task<AeroportoEntity> GetById(int id);

        Task<MessageResponse> Post(AeroportoDTO aeroporto);

        Task<MessageResponse> Update(AeroportoEntity aeroporto);
    }
}