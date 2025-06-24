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
    class PassagemRepository : IPassagemRepository
    {
        private IConnection _connection;

        public PassagemRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<PassagemEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                       SELECT ID AS {nameof(PassagemEntity.Id)},
                        PRECO AS {nameof(PassagemEntity.Preco)},
                        ASSENTO_ID AS {nameof(PassagemEntity.Assento_Id)},
                        VOO_ID AS {nameof(PassagemEntity.Voo_ID)},
                        ORDEMSERVICO_ID AS {nameof(PassagemEntity.OrdemServico_Id)}
                        FROM PASSAGEM
                ";

                IEnumerable<PassagemEntity> passagemList = await con.QueryAsync<PassagemEntity>(sql);
                return passagemList;
            }
        }

        public async Task<PassagemEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = $@"
                    SELECT ID AS {nameof(VooEntity.Id)},
                        SELECT ID AS {nameof(PassagemEntity.Id)},
                        PRECO AS {nameof(PassagemEntity.Preco)},
                        ASSENTO_ID AS {nameof(PassagemEntity.Assento_Id)},
                        VOO_ID AS {nameof(PassagemEntity.Voo_ID)},
                        ORDEMSERVICO_ID AS {nameof(PassagemEntity.OrdemServico_Id)}
                        FROM PASSAGEM
                        WHERE ID = @id
                ";

                PassagemEntity passagem = await con.QueryFirstAsync<PassagemEntity>(sql, new { id });
                return passagem;
            }
        }

        public async Task Insert(PassagemInsertDTO passagem)
        {
            string sql = @"
                INSERT INTO PASSAGEM (PRECO, ASSENTO_ID, VOO_ID, ORDEMSERVICO_ID)
                    VALUES (@Preco, @Assento_Id, @Voo_Id, @OrdemServico_Id)
            ";

            await _connection.Execute(sql, passagem);
        }

        public async Task Update(PassagemEntity passagem)
        {
            string sql = @"
                UPDATE PASSAGEM
                    SET PRECO = @Preco,
                        ASSENTO_ID = @Assento_Id,
                        VOO_ID = @Voo_Id,
                        ORDEMSERVICO_ID = @OrdemServico_Id
                    WHERE ID = @Id
            ";

            await _connection.Execute(sql, passagem);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM PASSAGEM WHERE ID = @id";

            await _connection.Execute(sql, new { id });
        }

    }
}