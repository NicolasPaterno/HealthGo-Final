using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using atividade_bd_csharp.Contracts.Repository;
using atividade_bd_csharp.DTO;
using atividade_bd_csharp.Entity;
using Dapper;
using MyFirstCRUD.infrastructure;
using Mysqlx.Crud;
using PrimeiraAPI.Contracts.Infraestruture;

namespace atividade_bd_csharp.Repository
{
    public class HotelRepository : IHotelRepository
    {
        private readonly IConnection _connection;

        public HotelRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task Insert(HotelInsertDTO hotel)
        {
            using (var con = _connection.GetConnection())
            {
                string sql = @"
                    INSERT INTO HOTEL 
                    (
                        ID, CNPJ, NOME, TIPO ,EMAIL,
                        TELEFONE, ENDERECOFOTO, SITE,
                        ACESSIBILIDADE, CEP, BAIRRO,
                        RUA, NUMEROENDERECO, CIDADE_ID
                    ) VALUES (
                        @Id, @Cnpj, @Nome, @Tipo, @Email,
                        @Telefone, @EnderecoFoto, @Site,
                        @Acessibilidade, @Cep, @Bairro,
                        @Rua, @NumeroEndereco, @Cidade_Id
                    )";

                var parametros = new
                {
                    hotel.Id,
                    hotel.Cnpj,
                    hotel.Nome,
                    Tipo = (int)hotel.Tipo, // Converter enum para int
                    hotel.Email,
                    hotel.Telefone,
                    hotel.EnderecoFoto,
                    hotel.Site,
                    hotel.Acessibilidade,
                    hotel.Cep,
                    hotel.Bairro,
                    hotel.Rua,
                    hotel.NumeroEndereco,
                    hotel.Cidade_Id
                };

                await con.ExecuteAsync(sql, parametros);
            }

        }
        public async Task<IEnumerable<HotelEntity>> GetAll()
        {
            using (var con = _connection.GetConnection())
            {
                string sql = @"
                        SELECT 
                        H.ID AS  Id
                        H.NUMERO AS Numero
                        H.CNPJ AS Cnpj
                        H.EMAIL AS Email
                        H.TELEFONE AS Telefone
                        H.ENDERECOFOTO AS EnderecoFoto
                        H.SITE AS Site
                        H.ACESSIBILIDADE AS Acessibilidade
                        H.CEP AS Cep
                        H.BAIRRO AS Bairro
                        H.RUA AS Rua
                        H.NUMEROENDERECO AS NumeroEndereco
                        H.CIDADE_ID AS Cidade_Id
                        FROM HOTEL H
                        LEFT JOIN CIDADE C ON H.CIDADE_ID = C.ID
                        ORDER BY H.NOME";

                IEnumerable<HotelEntity> hotellist = await con.QueryAsync<HotelEntity>(sql);
                return hotellist;
            }
        }
       
        public async Task Update(HotelEntity id )
        {
            using (var con = _connection.GetConnection())
            {
                string sql = @"
                    UPDATE HOTEL SET
                    ID = @Id,
                    CNPJ= @Cnpj,
                    NOME= @Nome,
                    TIPO= @Tipo,
                    EMAIL= @Email,
                    TELEFONE= @Telefone,
                    ENDERECOFOTO= @EnderecoFoto,
                    SITE= @Site,
                    ACESSIBILIDADE= @Acessibilidade,
                    CEP= @Cep,
                    BAIRRO= @Bairro,
                    RUA= @Rua,
                    NUMEROENDERECO= @NumeroEndereco,
                    CIDADE_ID = @Cidade_Id
                    WHERE ID = @Id
                    ";
                await con.ExecuteAsync(sql);
            }

        }

        public async Task Delete(int Id)
        {
            using (var con = _connection.GetConnection())
            {
                string sql = @"DELETE FROM HOTEL WHERE ID = @Id";
                await con.ExecuteAsync(sql, new { ID = Id });
            }
        }
        
        public async Task<IEnumerable<HotelEntity>> GetByCidadeId(int cidadeId)
        {
            using (var con = _connection.GetConnection())
            {
                string sql = @"
                    SELECT
                        HOTEL.Id,
                        HOTEL.Nome,
                        HOTEL.Email,
                        HOTEL.Telefone,
                        HOTEL.Site,
                        HOTEL.Cidade_Id,
                        HOTEL.Bairro,
                        HOTEL.Rua,
                        HOTEL.Cep
                    FROM HOTEL 
                    LEFT JOIN CIDADE c ON HOTEL.CIDADE_ID = c.ID
                    WHERE HOTEL.CIDADE_ID = @cidadeId
                    ORDER BY HOTEL.NOME";

                return await con.QueryAsync<HotelEntity>(sql, new { cidadeId });
            }
        }

        public async Task<HotelEntity> GetById(int id)
        {
            using (var con = _connection.GetConnection())
            {
                string sql = @"
            SELECT 
                ID AS Id,
                CNPJ AS Cnpj,
                NOME AS Nome,
                TIPO AS Tipo,
                EMAIL AS Email,
                TELEFONE AS Telefone,
                ENDERECOFOTO AS EnderecoFoto,
                SITE AS Site,
                ACESSIBILIDADE AS Acessibilidade,
                CEP AS Cep,
                BAIRRO AS Bairro,
                RUA AS Rua,
                NUMEROENDERECO AS NumeroEndereco,
                CIDADE_ID AS Cidade_Id
            FROM HOTEL 
            WHERE ID = @Id";

                return await con.QueryFirstOrDefaultAsync<HotelEntity>(sql, new { Id = id });
            }
        }
    }
}
