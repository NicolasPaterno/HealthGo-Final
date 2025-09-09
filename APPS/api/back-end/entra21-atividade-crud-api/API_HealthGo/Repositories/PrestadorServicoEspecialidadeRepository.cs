using System.Data;
using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repository;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using Dapper;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Repositories
{
    public class PrestadorServicoEspecialidadeRepository : IPrestadorServicoEspecialidadeRepository
    {
        private IConnection _connection;

        public PrestadorServicoEspecialidadeRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<PrestadorServicoEspecialidadeEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                    SELECT
                        ID AS {nameof(PrestadorServicoEspecialidadeEntity.Id)},
                        PRESTADORSERVICO_ID AS {nameof(PrestadorServicoEspecialidadeEntity.PrestadorServico_Id)},
                        ESPECIALIDADE_ID AS {nameof(PrestadorServicoEspecialidadeEntity.Especialidade_Id)},
                        PRECOHORA AS {nameof(PrestadorServicoEspecialidadeEntity.PrecoHora)}
                    FROM PrestadorServico_Especialidade;
                ";

                IEnumerable<PrestadorServicoEspecialidadeEntity> result = await con.QueryAsync<PrestadorServicoEspecialidadeEntity>(sql);
                return result;
            }
        }

        public async Task<PrestadorServicoEspecialidadeEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                    SELECT
                        ID AS {nameof(PrestadorServicoEspecialidadeEntity.Id)},
                        PRESTADORSERVICO_ID AS {nameof(PrestadorServicoEspecialidadeEntity.PrestadorServico_Id)},
                        ESPECIALIDADE_ID AS {nameof(PrestadorServicoEspecialidadeEntity.Especialidade_Id)},
                        PRECOHORA AS {nameof(PrestadorServicoEspecialidadeEntity.PrecoHora)}
                    FROM PrestadorServico_Especialidade
                    WHERE ID = @id;
                ";

                PrestadorServicoEspecialidadeEntity result = await con.QueryFirstOrDefaultAsync<PrestadorServicoEspecialidadeEntity>(sql, new { id });
                return result;
            }
        }

        public async Task Insert(PrestadorServicoEspecialidadeInsertDTO entity)
        {
            string sql = @"
                INSERT INTO PrestadorServico_Especialidade
                    (PrestadorServico_Id, Especialidade_Id, PrecoHora)
                VALUES
                    (@PrestadorServico_Id, @Especialidade_Id, @PrecoHora);
            ";

            await _connection.Execute(sql, entity);
        }

        public async Task Update(PrestadorServicoEspecialidadeEntity entity)
        {
            string sql = @"
                UPDATE PrestadorServico_Especialidade
                SET
                    PrestadorServico_Id = @PrestadorServico_Id,
                    Especialidade_Id = @Especialidade_Id,
                    PrecoHora = @PrecoHora
                WHERE ID = @Id;
            ";

            await _connection.Execute(sql, entity);
        }

        public async Task Delete(int id)
        {
            string sql = @"
                DELETE FROM PrestadorServico_Especialidade
                WHERE ID = @id;
            ";

            await _connection.Execute(sql, new { id });
        }

        public async Task<IEnumerable<PrestadorServicoEspecialidadeEntity>> GetAllEspecialidadesById(int id)
        {
            string sql = @"
            SELECT Id,PrestadorServico_Id,Especialidade_Id,PrecoHora FROM PrestadorServico_Especialidade WHERE PrestadorServico_Id = @id;
        ";

            using (var con = _connection.GetConnection())
            {
                return await con.QueryAsync<PrestadorServicoEspecialidadeEntity>(sql, new { id });
            }
        }

        public async Task<int> ReturnIdByFunction(int id, string function)
        {
            string sql = @"
        SELECT pse.Id
        FROM PrestadorServico_Especialidade AS pse
        JOIN PrestadorServico AS ps
          ON pse.PrestadorServico_Id = ps.Id
        JOIN Especialidade AS e
          ON pse.Especialidade_Id = e.Id
        WHERE
            ps.Id = @id AND e.Nome = @function;
    ";

            using (var con = _connection.GetConnection())
            {
                return await con.QuerySingleOrDefaultAsync<int>(sql, new { id, function });
            }
        }
    }
}
