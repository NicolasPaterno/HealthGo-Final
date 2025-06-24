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
    public interface IVooRepository
    {
        Task<IEnumerable<VooEntity>> GetAll();

        Task<VooEntity> GetById(int id);

        Task Insert(VooInsertDTO voo);

        Task Delete(int id);

        Task Update(VooEntity voo);
    }
}
