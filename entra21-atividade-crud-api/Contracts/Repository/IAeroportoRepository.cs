using MinhaPrimeiraApi.DTO.Aeroporto;
using MinhaPrimeiraApi.Entity;

namespace MinhaPrimeiraApi.Contracts.Repository
{
    public interface IAeroportoRepository
    {
        Task<IEnumerable<AeroportoEntity>> GetAll();

        Task<AeroportoEntity> GetById(int id);


        //Task<IEnumerable<AeroportoDTO>> GetByFilter(Aeroporto_Cidade_Id cidade_Id); //começa apenas com Aeroporto, dps transforma em generico em FiltroDTO


        Task Insert(AeroportoDTO aeroporto);

        Task Delete(int id);

        Task Update(AeroportoEntity aeroporto);

        
    }
}