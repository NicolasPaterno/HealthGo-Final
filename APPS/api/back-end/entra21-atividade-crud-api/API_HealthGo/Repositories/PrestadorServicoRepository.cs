using API_HealthGo.Contracts.Infrastructure;
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
                           PRECOHORA AS {nameof(PrestadorServicoEntity.PrecoHora)},
                           OBSERVACAO AS {nameof(PrestadorServicoEntity.Observacao)},
                           CNPJ AS {nameof(PrestadorServicoEntity.CNPJ)},
                           ATIVO AS {nameof(PrestadorServicoEntity.Ativo)},
                           ESPECIALIDADE_ID AS {nameof(PrestadorServicoEntity.Especialidade_Id)},
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
                INSERT INTO PRESTADORSERVICO (PRECOHORA, OBSERVACAO, CNPJ, ATIVO, ESPECIALIDADE_ID, PESSOA_ID)
                             VALUES (@PrecoHora, @Observacao, @CNPJ, @Ativo, @Especialidade_Id, @Pessoa_Id)
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
                           PRECOHORA AS {nameof(PrestadorServicoEntity.PrecoHora)},
                           OBSERVACAO AS {nameof(PrestadorServicoEntity.Observacao)},
                           CNPJ AS {nameof(PrestadorServicoEntity.CNPJ)},
                           ATIVO AS {nameof(PrestadorServicoEntity.Ativo)},
                           ESPECIALIDADE_ID AS {nameof(PrestadorServicoEntity.Especialidade_Id)},
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
                   SET PRECOHORA = @PrecoHora,
                       OBSERVACAO = @Observacao,
                       CNPJ = @CNPJ,
                       ATIVO = @Ativo,
                       ESPECIALIDADE_ID = @Especialidade_Id,
                       PESSOA_ID = @Pessoa_Id
                 WHERE ID = @Id;
            ";
            await _connection.Execute(sql, prestadorServico);
        }
    }
}