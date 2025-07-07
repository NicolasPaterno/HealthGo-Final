﻿using Dapper;
using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repository;
using API_HealthGo.DTO;
using API_HealthGo.Entity;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Repository
{
    public class PessoaRepository : IPessoaRepository
    {
        private IConnection _connection;

        public PessoaRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<PessoaEntity>> GetAllPessoa()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"SELECT * FROM PESSOA";

                IEnumerable<PessoaEntity> pessoaList = await con.QueryAsync<PessoaEntity>(sql);
                return pessoaList;
            }
        }

        public async Task<PessoaEntity> GetPessoaById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                        SELECT * FROM PESSOA WHERE ID = @id
                ";

                PessoaEntity pessoa = await con.QueryFirstAsync<PessoaEntity>(sql, new { id });
                return pessoa;
            }
        }

        public async Task InsertPessoa(PessoaInsertDTO pessoa)
        {
            string sql = @$"
                        INSERT INTO PESSOA (NOME, DATANASCIMENTO, CPF, TELEFONE, EMAIL,
                        SENHA, ENDERECOFOTO, CAOGUIA, CEP, BAIRRO, RUA, NUMEROENDERECO, CIDADE_ID)
                        VALUES (@Nome, @DataNascimento, @CPF, @Telefone, @Email, @Senha,
                        @EnderecoFoto, @CaoGuia, @CEP, @Bairro, @Rua, @NumeroEndereco, @Cidade_Id)
            ";

            await _connection.Execute(sql, pessoa);
        }

        public async Task UpdatePessoa(PessoaEntity pessoa)
        {
            string sql = @$"
                UPDATE PESSOA SET 
                    NOME = @Nome,
                    DATANASCIMENTO = @DataNascimento,
                    CPF = @CPF,
                    TELEFONE = @Telefone,
                    EMAIL = @Email,
                    SENHA = @Senha,
                    ENDERECOFOTO = @EnderecoFoto,
                    CAOGUIA = @CaoGuia,
                    CEP = @CEP,
                    BAIRRO = @Bairro,
                    RUA = @Rua,
                    NUMEROENDERECO = @NumeroEndereco,
                    CIDADE_ID = @Cidade_Id
                WHERE ID = @Id
            ";

            await _connection.Execute(sql, pessoa);
        }

        public async Task DeletePessoa(int id)
        {
            string sql = "DELETE FROM PESSOA WHERE ID = @id";
            await _connection.Execute(sql, new { id });
        }

        public async Task<PessoaEntity> GetPessoaByEmail(string email)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = "SELECT * FROM PESSOA WHERE EMAIL = @Email";
                return await con.QueryFirstOrDefaultAsync<PessoaEntity>(sql, new { email });
            }
        }
    }
}
