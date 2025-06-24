using Dapper;
using MinhaPrimeiraApi.Contracts.Connection;
using MinhaPrimeiraApi.Contracts.Repository;
using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;
using MinhaPrimeiraApi.Infrastructure;
using MySql.Data.MySqlClient;

namespace MeuPrimeiroCrud.Repository
{
    public class NacaoRepository : INacaoRepository
    {
        
        private IConnection _connection;

        public NacaoRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<NacaoEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                     SELECT ID AS {nameof(NacaoEntity.Id)},
                            NOME AS {nameof(NacaoEntity.Nome)}
                       FROM Nacao
                ";
                IEnumerable<NacaoEntity> nationList = await con.QueryAsync<NacaoEntity>(sql);
                return nationList;
            }
        }

        public async Task Insert(NacaoInsertDTO nacao)
        {
            string sql = @$"
                 INSERT INTO Nacao (Nome)
                              VALUE(@Nome)                                                           
            ";
            await _connection.Execute(sql, nacao);
        }

        public async Task Delete(int id)
        {
            Connection _connection = new Connection();
            string sql = "DELETE FROM NACAO WHERE ID = @id";
            await _connection.Execute(sql, new { id });
        }

        public async Task<NacaoEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                            SELECT ID AS {nameof(NacaoEntity.Id)},
                            NOME AS {nameof(NacaoEntity.Nome)}
                            FROM Nacao
                            WHERE ID = @id
                            ";
                NacaoEntity nacao = await con.QueryFirstAsync<NacaoEntity>(sql, new { id });
                return nacao;
            }
        }

        public async Task Update(NacaoEntity nacao)
        {
            string sql = @$"
                     UPDATE NACAO
                        SET Nome = @Nome
                      WHERE ID= @Id
                          ";
            await _connection.Execute(sql, nacao);
        }
    }
}