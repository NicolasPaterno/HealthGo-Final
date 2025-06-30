using Dapper;
using API_HealthGo.Contracts.Repository;
using API_HealthGo.DTO;
using API_HealthGo.Entity;
using API_HealthGo.Infrastructure;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Repository
{
    class EspecialidadeRepository : IEspecialidadeRepository
    {
        public async Task<IEnumerable<EspecialidadeEntity>> GetAll()
        {
            Connection _connection = new Connection();
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                    SELECT ID AS {nameof(EspecialidadeEntity.Id)},
                           NOME AS {nameof(EspecialidadeEntity.Nome)}
                      FROM ESPECIALIDADE
                ";

                IEnumerable<EspecialidadeEntity> especialidadeList = await con.QueryAsync<EspecialidadeEntity>(sql);

                return especialidadeList;
            }
        }

        public async Task Insert(EspecialidadeInsertDTO especialidade)
        {
            Connection _connection = new Connection();
            string sql = @"
                INSERT INTO ESPECIALIDADE (NOME)
                                VALUE (@Nome)
                ";

            await _connection.Execute(sql, especialidade);
        }

        public async Task Delete(int id)
        {
            Connection _connection = new Connection();
            string sql = "DELETE FROM ESPECIALIDADE WHERE ID = @id";

            await _connection.Execute(sql, new { id });
        }

        public async Task<EspecialidadeEntity> GetById(int id)
        {
            Connection _connection = new Connection();
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                    SELECT ID AS {nameof(EspecialidadeEntity.Id)},
                           NOME AS {nameof(EspecialidadeEntity.Nome)}
                      FROM ESPECIALIDADE
                      Where ID = @id
                ";

                EspecialidadeEntity especialidade = await con.QueryFirstAsync<EspecialidadeEntity>(sql, new { id });
                return especialidade;
            }
        }

        public async Task Update(EspecialidadeEntity especialidade)
        {
            Connection _connection = new Connection();
            string sql = @"UPDATE ESPECIALIDADE
                              SET NOME = @Nome
                              WHERE ID = @Id
            ";

            await _connection.Execute(sql, especialidade);
        }
    }
}
