using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using Dapper;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Repository
{
    class OrdemServicoRepository : IOrdemServicoRepository
    {
        private IConnection _connection;

        public OrdemServicoRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<OrdemServicoEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(OrdemServicoEntity.Id)},
                           DATACRIACAO AS {nameof(OrdemServicoEntity.DataCriacao)},
                           STATUSOS AS {nameof(OrdemServicoEntity.StatusOS)},
                           PESSOA_ID AS {nameof(OrdemServicoEntity.Pessoa_Id)}
                      FROM ORDEMSERVICO
                ";
                IEnumerable<OrdemServicoEntity> ordemServicoList = await con.QueryAsync<OrdemServicoEntity>(sql);
                return ordemServicoList;
            }
        }

        public async Task Insert(OrdemServicoInsertDTO ordemServico)
        {
            string sql = @$"
                INSERT INTO ORDEMSERVICO (DATACRIACAO, STATUSOS, PESSOA_ID)
                             VALUES (@DataCriacao, @StatusOS, @Pessoa_Id)
            ";
            await _connection.Execute(sql, ordemServico);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM ORDEMSERVICO WHERE ID = @id";
            await _connection.Execute(sql, new { id });
        }

        public async Task<OrdemServicoEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(OrdemServicoEntity.Id)},
                           DATACRIACAO AS {nameof(OrdemServicoEntity.DataCriacao)},
                           STATUSOS AS {nameof(OrdemServicoEntity.StatusOS)},
                           PESSOA_ID AS {nameof(OrdemServicoEntity.Pessoa_Id)}
                      FROM ORDEMSERVICO
                     WHERE ID = @id
                ";
                OrdemServicoEntity ordemServico = await con.QueryFirstAsync<OrdemServicoEntity>(sql, new { id });
                return ordemServico;
            }
        }

        public async Task Update(OrdemServicoEntity ordemServico)
        {
            string sql = @$"
                UPDATE ORDEMSERVICO
                   SET DATACRIACAO = @DataCriacao,
                       STATUSOS = @StatusOS,
                       PESSOA_ID = @Pessoa_Id
                 WHERE ID = @Id;
            ";
            await _connection.Execute(sql, ordemServico);
        }
    }
}