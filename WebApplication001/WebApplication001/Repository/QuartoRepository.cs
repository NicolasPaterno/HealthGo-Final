using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using atividade_bd_csharp.Contracts.Repository;
using atividade_bd_csharp.DTO;
using atividade_bd_csharp.Entity;
using Dapper;
using MyFirstCRUD.infrastructure;
using ZstdSharp.Unsafe;

namespace atividade_bd_csharp.Repository
{
    public class QuartoRepository : IQuartoRepository
    {
        private readonly Connection _connection;

        public QuartoRepository(Connection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<QuartoEntity>> GetAll()
        {
            using (var con = _connection.GetConnection())
            {
                string sql = @"
                        SELECT
                            QUARTO.ID AS Id,
                            QUARTO.NUMERO AS Numero,
                            QUARTO.ANDAR AS Andar,
                            QUARTO.ACEITAANIMAL AS AceitaAnimal,
                            QUARTO.OBSERVACAO AS Observacao,
                            QUARTO.PRECO AS Preco,
                            QUARTO.ENDERECOFOTO AS EnderecoFoto,
                            QUARTO.LIMITEPESSOA AS LimitePessoa,
                            QUARTO.HOTEL_ID AS Hotel_id
                        FROM QUARTO 
                        ORDER BY QUARTO.NUMERO";

                IEnumerable<QuartoEntity> quartolist = await con.QueryAsync< QuartoEntity > (sql);
                return quartolist;
            }
        }

        public async Task Insert(QuartoInsertDTO quarto)
        {
            using (var con = _connection.GetConnection())
            {
                string sql = @"
                    INSERT INTO QUARTO (
                        NUMERO, ANDAR, ACEITAANIMAL,
                        OBSERVACAO, PRECO, ENDERECOFOTO,
                        LIMITEPESSOA, HOTEL_ID
                    ) VALUES (
                        @Numero, @Andar, @AceitaAnimal,
                        @Observacao, @Preco, @EnderecoFoto,
                        @LimitePessoa, @Hotel_Id 
                    )";

                    await con.ExecuteAsync(sql, quarto);    
            }
        }

        public async Task Update(int id, QuartoEntity quarto)
        {
            using (var con = _connection.GetConnection())
            {
                string sql = @"
                    UPDATE QUARTO SET
                        NUMERO = @Numero,
                        ANDAR = @Andar,
                        ACEITAANIMAL = @AceitaAnimal,
                        OBSERVACAO = @Observacao,
                        PRECO = @Preco,
                        ENDERECOFOTO = @EnderecoFoto,
                        LIMITEPESSOA = @LimitePessoa,
                        HOTEL_ID = @Hotel_Id
                    WHERE ID = @Id
                    ";
                await con.ExecuteAsync (sql, quarto);

            }
        }

        public async Task Delete(int Id)
        {
            using (var con = _connection.GetConnection())
            {
                string sql = @"
                    DELETE FROM QUARTO WHERE ID = @Id";
                await con.ExecuteAsync(sql, new { Id });
            }
        }

        public async Task<QuartoEntity> GetById(int id)
        {
            using (var con = _connection.GetConnection())
            {
                string sql = @"
                    SELECT * FROM QUARTO WHERE ID = @Id
                    ";

                return await con.QueryFirstOrDefaultAsync<QuartoEntity>(sql, new { Id = id });
            }
        }
    }
}
