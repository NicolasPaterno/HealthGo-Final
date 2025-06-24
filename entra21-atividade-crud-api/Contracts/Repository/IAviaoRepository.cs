using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;
using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;

namespace MinhaPrimeiraApi.Contracts.Repository
{
    public interface IAviaoRepository
    {
        Task<IEnumerable<AviaoEntity>> GetAll();

        Task<AviaoEntity> GetById(int id);

        Task Insert(AviaoInsertDTO aviao);

        Task Delete(int id);

        Task Update(AviaoEntity aviao);
    }
}
