using Dapper;
using MySql.Data.MySqlClient;
using API_HealthGo.DTO;
using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Entity;
using API_HealthGo.Contracts.Repository;

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
                           QUANTIDADEVAGA AS {nameof(AviaoEntity.QuantidadeVaga)},
                           CODIGOREGISTRO AS {nameof(AviaoEntity.CodigoRegistro)},
                           COMPANHIA AS {nameof(AviaoEntity.Companhia)},
                           MODELO AS {nameof(AviaoEntity.Modelo)},
                           FABRICANTE AS {nameof(AviaoEntity.Fabricante)}
                      FROM AVIAO
                ";

                IEnumerable<AviaoEntity> aviaoList = await con.QueryAsync<AviaoEntity>(sql);

                return aviaoList;
            }
        }
        public async Task Insert(AviaoInsertDTO aviao)
        {
            string sql = @"
                INSERT INTO AVIAO (QUANTIDADEVAGA, CODIGOREGISTRO, COMPANHIA, MODELO, FABRICANTE)
                                VALUES (@QuantidadeVaga, @CodigoRegistro, @Companhia, @Modelo, @Fabricante)
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
                           QUANTIDADEVAGA AS {nameof(AviaoEntity.QuantidadeVaga)},
                           CODIGOREGISTRO AS {nameof(AviaoEntity.CodigoRegistro)},
                           COMPANHIA AS {nameof(AviaoEntity.Companhia)},
                           MODELO AS {nameof(AviaoEntity.Modelo)},
                           FABRICANTE AS {nameof(AviaoEntity.Fabricante)}
                      FROM AVIAO WHERE ID = @Id
                ";

                AviaoEntity aviao = await con.QueryFirstAsync<AviaoEntity>(sql, new { id });
                return aviao;
            }
        }

        public async Task Update(AviaoEntity aviao)
        {
            string sql = $@"UPDATE AVIAO
                                SET QUANTIDADEVAGA = @QuantidadeVaga,
                                CodigoRegistro = @CodigoRegistro,
                                COMPANHIA = @Companhia, 
                                MODELO = @Modelo,
                                FABRICANTE = @Fabricante
                                WHERE ID = @Id
            ";

            await _connection.Execute(sql, aviao);
        }
    }
}