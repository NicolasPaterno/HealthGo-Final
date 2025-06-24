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
    public interface IPassagemRepository
    {
        Task<IEnumerable<PassagemEntity>> GetAll();

        Task<PassagemEntity> GetById(int id);

        Task Insert(PassagemInsertDTO passagem);

        Task Delete(int id);

        Task Update(PassagemEntity passagem);
    }
}
