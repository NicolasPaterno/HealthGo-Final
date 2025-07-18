using Dapper;
using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
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
                string sql = @$"
                                SELECT 
                                    ID AS {nameof(PessoaEntity.Id)},
                                    NOME AS {nameof(PessoaEntity.Nome)},
                                    DATANASCIMENTO AS {nameof(PessoaEntity.DataNascimento)},
                                    CPF AS {nameof(PessoaEntity.CPF)},
                                    TELEFONE AS {nameof(PessoaEntity.Telefone)},
                                    EMAIL AS {nameof(PessoaEntity.Email)},
                                    SENHA AS {nameof(PessoaEntity.Senha)},
                                    ENDERECOFOTO AS {nameof(PessoaEntity.EnderecoFoto)},
                                    CAOGUIA AS {nameof(PessoaEntity.CaoGuia)},
                                    CEP AS {nameof(PessoaEntity.CEP)},
                                    BAIRRO AS {nameof(PessoaEntity.Bairro)},
                                    RUA AS {nameof(PessoaEntity.Rua)},
                                    NUMEROENDERECO AS {nameof(PessoaEntity.NumeroEndereco)},
                                    CIDADE_ID AS {nameof(PessoaEntity.Cidade_Id)}
                                FROM PESSOA
                            ";

                IEnumerable<PessoaEntity> pessoaList = await con.QueryAsync<PessoaEntity>(sql);
                return pessoaList;
            }
        }

        public async Task<PessoaEntity> GetPessoaById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                                SELECT 
                                    ID AS {nameof(PessoaEntity.Id)},
                                    NOME AS {nameof(PessoaEntity.Nome)},
                                    DATANASCIMENTO AS {nameof(PessoaEntity.DataNascimento)},
                                    CPF AS {nameof(PessoaEntity.CPF)},
                                    TELEFONE AS {nameof(PessoaEntity.Telefone)},
                                    EMAIL AS {nameof(PessoaEntity.Email)},
                                    SENHA AS {nameof(PessoaEntity.Senha)},
                                    ENDERECOFOTO AS {nameof(PessoaEntity.EnderecoFoto)},
                                    CAOGUIA AS {nameof(PessoaEntity.CaoGuia)},
                                    CEP AS {nameof(PessoaEntity.CEP)},
                                    BAIRRO AS {nameof(PessoaEntity.Bairro)},
                                    RUA AS {nameof(PessoaEntity.Rua)},
                                    NUMEROENDERECO AS {nameof(PessoaEntity.NumeroEndereco)},
                                    CIDADE_ID AS {nameof(PessoaEntity.Cidade_Id)}
                                FROM PESSOA
                                WHERE ID = @id
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
                string sql = @$"
                                SELECT 
                                    ID AS {nameof(PessoaEntity.Id)},
                                    NOME AS {nameof(PessoaEntity.Nome)},
                                    DATANASCIMENTO AS {nameof(PessoaEntity.DataNascimento)},
                                    CPF AS {nameof(PessoaEntity.CPF)},
                                    TELEFONE AS {nameof(PessoaEntity.Telefone)},
                                    EMAIL AS {nameof(PessoaEntity.Email)},
                                    SENHA AS {nameof(PessoaEntity.Senha)},
                                    ENDERECOFOTO AS {nameof(PessoaEntity.EnderecoFoto)},
                                    CAOGUIA AS {nameof(PessoaEntity.CaoGuia)},
                                    CEP AS {nameof(PessoaEntity.CEP)},
                                    BAIRRO AS {nameof(PessoaEntity.Bairro)},
                                    RUA AS {nameof(PessoaEntity.Rua)},
                                    NUMEROENDERECO AS {nameof(PessoaEntity.NumeroEndereco)},
                                    CIDADE_ID AS {nameof(PessoaEntity.Cidade_Id)}
                                FROM PESSOA
                                WHERE EMAIL = @Email
                            ";
                return await con.QueryFirstOrDefaultAsync<PessoaEntity>(sql, new { email });
            }
        }

        public async Task AtualizarSenhaAsync(int pessoa_Id, string novaSenhaDoUsuario)
        {
            using var conn = _connection.GetConnection();
            var sql = "UPDATE Pessoa SET Senha = @NovaSenha WHERE Id = @Pessoa_Id";

            await conn.ExecuteAsync(sql, new { NovaSenha = novaSenhaDoUsuario, Pessoa_Id = pessoa_Id });
        }
    }
}
