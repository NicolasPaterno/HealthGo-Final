using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using atividade_bd_csharp.DTO;
using atividade_bd_csharp.Entity;
using MyFirstCRUD.infrastructure;
using MySql.Data.MySqlClient;

namespace atividade_bd_csharp.Contracts.Repository
{
    public interface ICamaQuartoRepository
    {
            Task<IEnumerable<CamaQuartoEntity>> GetAll();
            Task<CamaQuartoEntity> GetById(int id);
            Task Insert(CamaQuartoEntity camaquarto);
            Task Update(CamaQuartoEntity camaquarto);
            Task Delete(int id);
            Task<IEnumerable<CamaQuartoEntity>> GetByTipoCama(params string[] TipoCama);
            Task DeleteByQuartoId(int quartoId);
        }
}
