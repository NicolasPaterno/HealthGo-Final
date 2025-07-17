using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.Contracts.Repository;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using Dapper;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Repository
{
    class ContaGerenciaRepository : IContaGerenciaRepository
    {
        private IConnection _connection;

        public ContaGerenciaRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<ContaGerenciaEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(ContaGerenciaEntity.Id)},
                           NOME AS {nameof(ContaGerenciaEntity.Nome)},
                           EMAIL AS {nameof(ContaGerenciaEntity.Email)},
                           SENHA AS {nameof(ContaGerenciaEntity.Senha)},
                           CNPJ AS {nameof(ContaGerenciaEntity.CNPJ)}
                      FROM CONTA_GERENCIA
                ";
                return await con.QueryAsync<ContaGerenciaEntity>(sql);
            }
        }

        public async Task<ContaGerenciaEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(ContaGerenciaEntity.Id)},
                           NOME AS {nameof(ContaGerenciaEntity.Nome)},
                           EMAIL AS {nameof(ContaGerenciaEntity.Email)},
                           SENHA AS {nameof(ContaGerenciaEntity.Senha)},
                           CNPJ AS {nameof(ContaGerenciaEntity.CNPJ)}
                      FROM CONTA_GERENCIA
                     WHERE ID = @id
                ";
                return await con.QueryFirstAsync<ContaGerenciaEntity>(sql, new { id });
            }
        }

        public async Task Insert(ContaGerenciaInsertDTO contaGerencia)
        {
            string sql = @$"
                INSERT INTO CONTA_GERENCIA (NOME, CNPJ, EMAIL, SENHA)
                                 VALUES (@Nome, @CNPJ, @Email, @Senha)
            ";
            await _connection.Execute(sql, contaGerencia);
        }

        public async Task Update(ContaGerenciaEntity contaGerencia)
        {
            string sql = @$"
                UPDATE CONTA_GERENCIA
                   SET NOME = @Nome,
                       CNPJ = @CNPJ,
                       EMAIL = @Email,
                       SENHA = @Senha
                 WHERE ID = @Id;
            ";
            await _connection.Execute(sql, contaGerencia);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM CONTA_GERENCIA WHERE ID = @id";
            await _connection.Execute(sql, new { id });
        }
    }
}
