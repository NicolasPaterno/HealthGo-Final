using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MinhaPrimeiraApi.Contracts.Repository;
using MinhaPrimeiraApi.DTO;
using MinhaPrimeiraApi.Entity;
using Dapper;
using MinhaPrimeiraApi.Infrastructure;
using MySql.Data.MySqlClient;
using MinhaPrimeiraApi.Contracts.Infrastructure;

namespace MinhaPrimeiraApi.Repository
{
    class VooRepository : IVooRepository
    {
        private IConnection _connection;

        public VooRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<VooEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                       SELECT ID AS {nameof(VooEntity.Id)},
                        CODIGOVOO AS {nameof(VooEntity.CodigoVoo)},
                        DATAHORAPARTIDA AS {nameof(VooEntity.DataHoraPartida)},
                        DATAHORACHEGADA AS {nameof(VooEntity.DataHoraChegada)},
                        ORIGEM_ID AS {nameof(VooEntity.Origem_Id)},
                        DESTINO_ID AS {nameof(VooEntity.Destino_Id)},
                        AVIAO_ID AS  {nameof(VooEntity.Aviao_Id)}
                        FROM VOO
                ";

                IEnumerable<VooEntity> vooList = await con.QueryAsync<VooEntity>(sql);
                return vooList;
            }
        }

        public async Task<VooEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                    SELECT ID AS {nameof(VooEntity.Id)},
                        CODIGOVOO AS {nameof(VooEntity.CodigoVoo)},
                        DATAHORAPARTIDA AS {nameof(VooEntity.DataHoraPartida)},
                        DATAHORACHEGADA AS {nameof(VooEntity.DataHoraChegada)},
                        ORIGEM_ID AS {nameof(VooEntity.Origem_Id)},
                        DESTINO_ID AS {nameof(VooEntity.Destino_Id)},
                        AVIAO_ID AS  {nameof(VooEntity.Aviao_Id)}
                        FROM VOO
                        WHERE ID = @id
                ";

                VooEntity voo = await con.QueryFirstAsync<VooEntity>(sql, new { id });
                return voo;
            }
        }

        public async Task Insert(VooInsertDTO assento)
        {
            string sql = @"
                INSERT INTO VOO (CODIGOVOO, DATAHORAPARTIDA, DATAHORACHEGADA, ORIGEM_ID, DESTINO_ID, AVIAO_ID)
                    VALUES (@CodigoVoo, @DataHoraPartida, @DataHoraChegada, @Origem_Id, @Destino_Id, @Aviao_Id)
            ";

            await _connection.Execute(sql, assento);
        }

        public async Task Update(VooEntity voo)
        {
            string sql = @"
                UPDATE VOO
                    SET CODIGOVOO = @CodigoVoo,
                        DATAHORAPARTIDA = @DataHoraPartida,
                        DATAHORACHEGADA = @DataHoraChegada,
                        ORIGEM_ID = @Origem_Id,
                        DESTINO_ID = @Destino_Id,
                        AVIAO_ID = @Aviao_Id
                    WHERE ID = @Id
            ";

            await _connection.Execute(sql, voo);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM VOO WHERE ID = @id";

            await _connection.Execute(sql, new { id });
        }

    }
}

