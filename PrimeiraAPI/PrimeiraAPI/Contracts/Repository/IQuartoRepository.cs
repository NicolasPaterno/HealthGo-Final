using System;
using System.Collections.Generic;
using System.Linq;
using atividade_bd_csharp.DTO;
using atividade_bd_csharp.Entity;

namespace atividade_bd_csharp.Contracts.Repository
{
    public interface IQuartoRepository
    {
        Task<IEnumerable<QuartoEntity>> GetAll();
        Task<QuartoEntity> GetById(int id);  
        Task Insert(QuartoInsertDTO quarto);
        Task Update(int id,QuartoEntity quarto, QuartoInsertDTO dto);
        Task Delete(int id);
        Task DeleteOrdemServicoHotelByQuartoId(int quartoId);
    }
}
