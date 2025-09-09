using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repository;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using Dapper;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Repositories
{
    public class OrdemServico_PrestadorServicoRepository : IOrdemServico_PrestadorServicoRepository
    {
        private readonly IConnection _connection;

        public OrdemServico_PrestadorServicoRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<OrdemServico_PrestadorServicoEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT 
                        Id AS {nameof(OrdemServico_PrestadorServicoEntity.Id)},
                        DataInicio AS {nameof(OrdemServico_PrestadorServicoEntity.DataInicio)},
                        DataFim AS {nameof(OrdemServico_PrestadorServicoEntity.DataFim)},
                        OrdemServico_Id AS {nameof(OrdemServico_PrestadorServicoEntity.OrdemServico_Id)},
                        prestadorservico_especialidade_Id AS {nameof(OrdemServico_PrestadorServicoEntity.PrestadorServico_Especialidade_Id)}
                    FROM OrdemServico_PrestadorServico";

                IEnumerable<OrdemServico_PrestadorServicoEntity> list = await con.QueryAsync<OrdemServico_PrestadorServicoEntity>(sql);
                return list;
            }
        }

        public async Task<OrdemServico_PrestadorServicoEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT 
                        Id AS {nameof(OrdemServico_PrestadorServicoEntity.Id)},
                        DataInicio AS {nameof(OrdemServico_PrestadorServicoEntity.DataInicio)},
                        DataFim AS {nameof(OrdemServico_PrestadorServicoEntity.DataFim)},
                        OrdemServico_Id AS {nameof(OrdemServico_PrestadorServicoEntity.OrdemServico_Id)},
                        prestadorservico_especialidade_Id AS {nameof(OrdemServico_PrestadorServicoEntity.PrestadorServico_Especialidade_Id)}
                    FROM OrdemServico_PrestadorServico
                    WHERE Id = @id";

                OrdemServico_PrestadorServicoEntity entity = await con.QueryFirstOrDefaultAsync<OrdemServico_PrestadorServicoEntity>(sql, new { id });
                return entity;
            }
        }

        public async Task Insert(OrdemServico_PrestadorServicoInsertDTO ordemServico_PrestadorServico)
        {
            string sql = @$"
                INSERT INTO OrdemServico_PrestadorServico (DataInicio, DataFim, OrdemServico_Id, prestadorservico_especialidade_Id)
                VALUES (@DataInicio, @DataFim, @OrdemServico_Id, @prestadorservico_especialidade_Id)";

            using (MySqlConnection con = _connection.GetConnection())
            {
                await con.ExecuteAsync(sql, ordemServico_PrestadorServico);
            }
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM OrdemServico_PrestadorServico WHERE Id = @id";
            using (MySqlConnection con = _connection.GetConnection())
            {
                await con.ExecuteAsync(sql, new { id });
            }
        }

        public async Task Update(OrdemServico_PrestadorServicoEntity ordemServico_PrestadorServico)
        {
            string sql = @$"
                UPDATE OrdemServico_PrestadorServico
                SET 
                    DataInicio = @DataInicio,
                    DataFim = @DataFim,
                    OrdemServico_Id = @OrdemServico_Id,
                    prestadorservico_especialidade_Id = @prestadorservico_especialidade_Id
                WHERE Id = @Id";

            using (MySqlConnection con = _connection.GetConnection())
            {
                await con.ExecuteAsync(sql, ordemServico_PrestadorServico);
            }
        }
    }
}