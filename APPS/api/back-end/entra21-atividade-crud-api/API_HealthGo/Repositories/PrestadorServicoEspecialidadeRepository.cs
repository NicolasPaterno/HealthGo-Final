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
                        PRESTADORSERVICO_ID AS {nameof(PrestadorServicoEspecialidadeEntity.PrestadorServicoId)},
                        ESPECIALIDADE_ID AS {nameof(PrestadorServicoEspecialidadeEntity.EspecialidadeId)},
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
                        PRESTADORSERVICO_ID AS {nameof(PrestadorServicoEspecialidadeEntity.PrestadorServicoId)},
                        ESPECIALIDADE_ID AS {nameof(PrestadorServicoEspecialidadeEntity.EspecialidadeId)},
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
                    (@PrestadorServicoId, @EspecialidadeId, @PrecoHora);
            ";

            await _connection.Execute(sql, entity);
        }

        public async Task Update(PrestadorServicoEspecialidadeEntity entity)
        {
            string sql = @"
                UPDATE PrestadorServico_Especialidade
                SET
                    PrestadorServico_Id = @PrestadorServicoId,
                    Especialidade_Id = @EspecialidadeId,
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
    }
}
