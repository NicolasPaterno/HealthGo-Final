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
                           FORMAPAGAMENTO AS {nameof(OrdemServicoEntity.FormaPagamento)},
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
                INSERT INTO ORDEMSERVICO (DATACRIACAO, STATUSOS, FORMAPAGAMENTO, PESSOA_ID)
                             VALUES (@DataCriacao, @StatusOS, @FormaPagamento, @Pessoa_Id)
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
                           FORMAPAGAMENTO AS {nameof(OrdemServicoEntity.FormaPagamento)},
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
                       FORMAPAGAMENTO = @FormaPagamento,
                       PESSOA_ID = @Pessoa_Id
                 WHERE ID = @Id;
            ";
            await _connection.Execute(sql, ordemServico);
        }

        public async Task<int> GetLatestByPessoaId(int pessoaId)
        {
            using var conn = _connection.GetConnection();
            string sql = "SELECT Id FROM OrdemServico WHERE Pessoa_Id = @PessoaId ORDER BY DataCriacao DESC LIMIT 1";
            return await conn.QueryFirstOrDefaultAsync<int>(sql, new { PessoaId = pessoaId });
        }

        public async Task<IEnumerable<HistoricoComprasDTO>> GetHistoricoComprasByPessoaId(int pessoaId)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @"
                    SELECT
                        OS.Id AS OrdemServicoId,
                        OS.DataCriacao,
                        OS.StatusOS,
                        OS.FormaPagamento,
                        H.Nome AS NomeHotel,
                        Q.Preco AS PrecoQuarto,
                        PE.PrecoHora AS PrecoPrestador,
                        ESP.Nome AS EspecialidadePrestador,
                        V.Preco AS PrecoVoo,
                        V.Companhia AS CompanhiaAerea
                    FROM OrdemServico AS OS
                    LEFT JOIN OrdemServico_Hotel AS OH ON OS.Id = OH.OrdemServico_Id
                    LEFT JOIN Hotel AS H ON OH.Hotel_Id = H.Id
                    LEFT JOIN Quarto AS Q ON H.Id = Q.Hotel_Id
                    LEFT JOIN OrdemServico_PrestadorServico AS OSP ON OS.Id = OSP.OrdemServico_Id
                    LEFT JOIN PrestadorServico_Especialidade AS PE ON OSP.prestadorservico_especialidade_Id = PE.Id
                    LEFT JOIN Especialidade AS ESP ON PE.Especialidade_Id = ESP.Id
                    LEFT JOIN Passagem AS PAS ON OS.Id = PAS.OrdemServico_Id
                    LEFT JOIN Voo AS V ON PAS.Voo_Id = V.Id
                    WHERE OS.Pessoa_Id = @pessoaId;
                ";
                return await con.QueryAsync<HistoricoComprasDTO>(sql, new { pessoaId });
            }
        }
    }
}