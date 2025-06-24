using atividade_bd_csharp.Entity;
using Dapper;
using MinhaPrimeiraApi.Contracts.Infrastructure;
using MyFirstCRUD.Contracts.Repository;
using MyFirstCRUD.DTO;
using MyFirstCRUD.Entity;
using MyFirstCRUD.infrastructure;
using MySql.Data.MySqlClient;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyFirstCRUD.Repository
{
    public class LembreteRepository : ILembreteRepository
    {
        private IConnection _connection;

        public LembreteRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<LembreteEntity>> GetAllLembrete()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID, DESCRICAO, DATAINICIO, PESSOA_ID 
                    FROM LEMBRETE
                ";

                IEnumerable<LembreteEntity> lembreteList = await con.QueryAsync<LembreteEntity>(sql);
                return lembreteList;
            }
        }

        public async Task<LembreteEntity> GetLembreteById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT * FROM LEMBRETE WHERE ID = @id
                ";

                LembreteEntity lembrete = await con.QueryFirstAsync<LembreteEntity>(sql, new { id });
                return lembrete;
            }
        }

        public async Task InsertLembrete(LembreteInsertDTO lembrete)
        {
            string sql = @"
                INSERT INTO LEMBRETE ( DESCRICAO, DATAINICIO, PESSOA_ID)
                VALUES ( @Descricao, @DataInicio,@Pessoa_Id)
            ";

            await _connection.Execute(sql, lembrete);
        }

        public async Task UpdateLembrete(LembreteEntity lembrete)
        {
            string sql = @"
                UPDATE LEMBRETE SET 
                    DESCRICAO = @Descricao,
                    DATAINICIO = @DataInicio,
                    PESSOA_ID = @Pessoa_Id
                WHERE ID = @Id
            ";

            await _connection.Execute(sql, lembrete);
        }

        public async Task DeleteLembrete(int id)
        {
            string sql = "DELETE FROM LEMBRETE WHERE ID = @id";
            await _connection.Execute(sql, new { id });
        }
    }
}
