using Dapper;
using MySql.Data.MySqlClient;
using API_HealthGo.DTO;
using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Entities;
using API_HealthGo.Contracts.Repositories;

namespace API_HealthGo.Repository
{
    class AviaoRepository : IAviaoRepository
    {
        private IConnection _connection;

        public AviaoRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<AviaoEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                    SELECT ID AS {nameof(AviaoEntity.Id)},
                           MODELO AS {nameof(AviaoEntity.Modelo)},
                           CAPACIDADE AS {nameof(AviaoEntity.Capacidade)},
                           COMPANHIA AS {nameof(AviaoEntity.Companhia)}
                      FROM AVIAO
                ";

                IEnumerable<AviaoEntity> aviaoList = await con.QueryAsync<AviaoEntity>(sql);

                return aviaoList;
            }
        }
        public async Task Insert(AviaoInsertDTO aviao)
        {
            string sql = @"
                INSERT INTO AVIAO (MODELO, CAPACIDADE, COMPANHIA)
                                VALUES (@Modelo, @Capacidade, @Companhia)
                ";

            await _connection.Execute(sql, aviao);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM AVIAO WHERE ID = @id";

            await _connection.Execute(sql, new { id });
        }

        public async Task<AviaoEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                    SELECT ID AS {nameof(AviaoEntity.Id)},
                           MODELO AS {nameof(AviaoEntity.Modelo)},
                           CAPACIDADE AS {nameof(AviaoEntity.Capacidade)},
                           COMPANHIA AS {nameof(AviaoEntity.Companhia)}
                      FROM AVIAO
                      WHERE ID = @Id
                ";

                AviaoEntity aviao = await con.QueryFirstAsync<AviaoEntity>(sql, new { id });
                return aviao;
            }
        }

        public async Task Update(AviaoEntity aviao)
        {
            string sql = $@"UPDATE AVIAO
                                SET MODELO = @Modelo,
                                CAPACIDADE = @Capacidade,
                                COMPANHIA = @Companhia 
                            WHERE ID = @Id
            ";

            await _connection.Execute(sql, aviao);
        }
    }
}