using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using Dapper;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Repository
{
    class PrestadorServicoRepository : IPrestadorServicoRepository
    {
        private IConnection _connection;

        public PrestadorServicoRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<PrestadorServicoEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(PrestadorServicoEntity.Id)},
                           OBSERVACAO AS {nameof(PrestadorServicoEntity.Observacao)},
                           CNPJ AS {nameof(PrestadorServicoEntity.CNPJ)},
                           PESSOA_ID AS {nameof(PrestadorServicoEntity.Pessoa_Id)}
                      FROM PRESTADORSERVICO
                ";
                IEnumerable<PrestadorServicoEntity> prestadorServicoList = await con.QueryAsync<PrestadorServicoEntity>(sql);
                return prestadorServicoList;
            }
        }

        public async Task Insert(PrestadorServicoInsertDTO prestadorServico)
        {
            string sql = @$"
                INSERT INTO PRESTADORSERVICO (OBSERVACAO, CNPJ, PESSOA_ID)
                             VALUES (@Observacao, @CNPJ, @Pessoa_Id)
            ";
            await _connection.Execute(sql, prestadorServico);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM PRESTADORSERVICO WHERE ID = @id";
            await _connection.Execute(sql, new { id });
        }

        public async Task<PrestadorServicoEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(PrestadorServicoEntity.Id)},
                           OBSERVACAO AS {nameof(PrestadorServicoEntity.Observacao)},
                           CNPJ AS {nameof(PrestadorServicoEntity.CNPJ)},
                           PESSOA_ID AS {nameof(PrestadorServicoEntity.Pessoa_Id)}
                      FROM PRESTADORSERVICO
                     WHERE ID = @id
                ";
                PrestadorServicoEntity prestadorServico = await con.QueryFirstAsync<PrestadorServicoEntity>(sql, new { id });
                return prestadorServico;
            }
        }

        public async Task Update(PrestadorServicoEntity prestadorServico)
        {
            string sql = @$"
                UPDATE PRESTADORSERVICO
                   SET OBSERVACAO = @Observacao,
                       CNPJ = @CNPJ,
                       PESSOA_ID = @Pessoa_Id
                 WHERE ID = @Id;
            ";
            await _connection.Execute(sql, prestadorServico);
        }
    }
}