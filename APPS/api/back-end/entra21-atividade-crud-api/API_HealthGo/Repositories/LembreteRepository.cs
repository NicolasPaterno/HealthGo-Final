using Dapper;
using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Repository
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
                    SELECT ID, TITULO, DATA,TIPO, PESSOA_ID 
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
                                SELECT 
                                    ID AS {nameof(LembreteEntity.Id)},
                                    TITULO AS {nameof(LembreteEntity.Titulo)},
                                    DATA AS {nameof(LembreteEntity.Data)},
                                    TIPO AS {nameof(LembreteEntity.Tipo)},
                                    PESSOA_ID AS {nameof(LembreteEntity.Pessoa_Id)}
                                FROM LEMBRETE
                                WHERE ID = @id
                            ";

                LembreteEntity lembrete = await con.QueryFirstAsync<LembreteEntity>(sql, new { id });
                return lembrete;
            }
        }
        public async Task<IEnumerable<LembreteEntity>> GetLembreteByPessoaId(int pessoaId)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                                SELECT 
                                    ID AS {nameof(LembreteEntity.Id)},
                                    TITULO AS {nameof(LembreteEntity.Titulo)},
                                    DATA AS {nameof(LembreteEntity.Data)},
                                    TIPO AS {nameof(LembreteEntity.Tipo)},
                                    PESSOA_ID AS {nameof(LembreteEntity.Pessoa_Id)}
                                FROM LEMBRETE
                                WHERE Pessoa_ID = @pessoaId
                            ";

                IEnumerable<LembreteEntity> lembreteList = await con.QueryAsync<LembreteEntity>(sql, new {pessoaId});
                return lembreteList;
            }
        }

        public async Task InsertLembrete(LembreteInsertDTO lembrete)
        {
            string sql = @"
                INSERT INTO LEMBRETE ( TITULO, DATA,TIPO, PESSOA_ID)
                VALUES ( @Titulo, @Data, @Tipo, @Pessoa_Id)
            ";

            await _connection.Execute(sql, lembrete);
        }

        public async Task UpdateLembrete(LembreteEntity lembrete)
        {
            string sql = @"
                UPDATE LEMBRETE SET 
                    TITULO = @Titulo,
                    DATA = @Data,
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

        public async Task<IEnumerable<LembreteEntity>> DeleteLembreteByPessoaId(int pessoaId)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    DELETE * FROM LEMBRETE WHERE Pessoa_ID = @pessoaId
                ";

                IEnumerable<LembreteEntity> lembreteList = await con.QueryAsync<LembreteEntity>(sql, new { pessoaId });
                return lembreteList;
            }
        }
    }
}
