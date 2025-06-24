using MinhaPrimeiraApi.Contracts.Repository;
using Dapper;
using MinhaPrimeiraApi.Entity;
using MySql.Data.MySqlClient;
using MinhaPrimeiraApi.Contracts.Connection;
using System.Linq;
using MinhaPrimeiraApi.DTO.Aeroporto;

namespace MinhaPrimeiraApi.Repository
{
    class AeroportoRepository : IAeroportoRepository
    {

        private IConnection _connection; 

        public AeroportoRepository(IConnection connection)
        {
            _connection = connection;
        }
        
        public async Task<IEnumerable<AeroportoEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                     SELECT ID AS {nameof(AeroportoEntity.id)},
                            NOME AS {nameof(AeroportoEntity.Nome)},
                            CODIGOIATA AS {nameof(AeroportoEntity.CodigoIata)},
                           CIDADE_ID AS {nameof(AeroportoEntity.Cidade_id)}
                       FROM AEROPORTO
                ";
                IEnumerable<AeroportoEntity> aeroportoList = await con.QueryAsync<AeroportoEntity>(sql);
                return aeroportoList;
            }
        }


        public async Task Insert(AeroportoDTO aeroporto)
        {
            string sql = @$"
                INSERT INTO AEROPORTO (NOME,CODIGOIATA,CIDADE_ID)
                                VALUES (@Nome,@CodigoIata, @Cidade_ID)                                                         
            ";
            await _connection.Execute(sql, aeroporto);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM AEROPORTO WHERE ID = @id";
            await _connection.Execute(sql, new { id });
        }

        public async Task<AeroportoEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                            SELECT ID AS {nameof(AeroportoEntity.id)},
                            NOME AS {nameof(AeroportoEntity.Nome)},
                            CODIGOIATA AS {nameof(AeroportoEntity.CodigoIata)},
                           CIDADE_ID AS {nameof(AeroportoEntity.Cidade_id)}
                       FROM AEROPORTO
                         WHERE ID = @Id
                              
                            ";
                AeroportoEntity aeroporto = await con.QueryFirstAsync<AeroportoEntity>(sql, new { id });
                return aeroporto;
            }
        }

        public async Task Update(AeroportoEntity aeroporto)
        {
            string sql = @$"
                      UPDATE AEROPORTO
                               SET NOME = @Nome,
                               CODIGOIATA = @CodigoIata,
                               CIDADE_ID = @Cidade_id
                               WHERE ID = @Id;
                          ";
            await _connection.Execute(sql, aeroporto);
        }

        
    }
}