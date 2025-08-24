using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using Dapper;
using MySql.Data.MySqlClient;

namespace API_HealthGo.Repository
{
    class PrestadorServicoRepository : IPrestadorServicoRepository
    {
        private IConnection _connection;

        public PrestadorServicoRepository(IConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<PrestadorServicoEntity>> GetAll()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(PrestadorServicoEntity.Id)},
                           OBSERVACAO AS {nameof(PrestadorServicoEntity.Observacao)},
                           CNPJ AS {nameof(PrestadorServicoEntity.CNPJ)},
                           PESSOA_ID AS {nameof(PrestadorServicoEntity.Pessoa_Id)}
                      FROM PRESTADORSERVICO
                ";
                IEnumerable<PrestadorServicoEntity> prestadorServicoList = await con.QueryAsync<PrestadorServicoEntity>(sql);
                return prestadorServicoList;
            }
        }

        public async Task<IEnumerable<PrestadorServico_All_Infos_DTO>> GetPrestadorAllInfos()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                                SELECT 
                                    ps.ID AS {nameof(PrestadorServicoEntity.Id)},
                                    ps.OBSERVACAO AS {nameof(PrestadorServicoEntity.Observacao)},
                                    ps.CNPJ AS {nameof(PrestadorServicoEntity.CNPJ)},
                                    ps.PESSOA_ID AS {nameof(PrestadorServicoEntity.Pessoa_Id)},

                                    p.ID AS {nameof(PessoaEntity.Id)},
                                    p.NOME AS {nameof(PessoaEntity.Nome)},
                                    p.DATANASCIMENTO AS {nameof(PessoaEntity.DataNascimento)},
                                    p.CPF AS {nameof(PessoaEntity.CPF)},
                                    p.TELEFONE AS {nameof(PessoaEntity.Telefone)},
                                    p.EMAIL AS {nameof(PessoaEntity.Email)},
                                    p.SENHA AS {nameof(PessoaEntity.Senha)},
                                    p.ENDERECOFOTO AS {nameof(PessoaEntity.EnderecoFoto)},
                                    p.CAOGUIA AS {nameof(PessoaEntity.CaoGuia)},
                                    p.CEP AS {nameof(PessoaEntity.CEP)},
                                    p.BAIRRO AS {nameof(PessoaEntity.Bairro)},
                                    p.RUA AS {nameof(PessoaEntity.Rua)},
                                    p.NUMEROENDERECO AS {nameof(PessoaEntity.NumeroEndereco)},
                                    p.CIDADE_ID AS {nameof(PessoaEntity.Cidade_Id)},

                                    e.ID AS {nameof(EspecialidadeComPrecoDTO.Id)},
                                    e.NOME AS {nameof(EspecialidadeComPrecoDTO.Nome)},
                                    pse.PRECOHORA AS {nameof(EspecialidadeComPrecoDTO.PrecoHora)}

                                FROM PRESTADORSERVICO ps
                                INNER JOIN PESSOA p ON ps.PESSOA_ID = p.ID
                                INNER JOIN PRESTADORSERVICO_ESPECIALIDADE pse ON ps.ID = pse.PRESTADORSERVICO_ID
                                INNER JOIN ESPECIALIDADE e ON pse.ESPECIALIDADE_ID = e.ID
                            ";
                
                // 1. Cria um dicionário para armazenar os resultados únicos dos prestadores,
                // usando o ID do prestador como chave para evitar repetição.
                var prestadorDict = new Dictionary<int, PrestadorServico_All_Infos_DTO>();

                // 2. Executa a query com Dapper usando multi-mapping:
                // Cada linha do resultado traz: prestador, pessoa e especialidade.
                // O método recebe uma função que recebe estes 3 objetos mapeados.
                var result = await con.QueryAsync<
                    PrestadorServicoEntity,         // Mapeia os dados do prestador
                    PessoaEntity,                  // Mapeia os dados da pessoa vinculada
                    EspecialidadeComPrecoDTO,      // Mapeia os dados da especialidade com preço
                    PrestadorServico_All_Infos_DTO // Monta o DTO final usando a função abaixo
                >(
                    sql,
                    (prestador, pessoa, especialidade) =>   // Função chamada para cada linha
                    {
                        // 3. Tenta encontrar o DTO já criado para o prestador atual no dicionário
                        if (!prestadorDict.TryGetValue(prestador.Id, out var dto))
                        {
                            // 4. Se não existir, cria um novo DTO e adiciona no dicionário
                            dto = new PrestadorServico_All_Infos_DTO
                            {
                                prestadorServicoEntity = prestador, // Dados do prestador
                                PessoaEntity = pessoa,               // Dados da pessoa
                                Especialidades = new List<EspecialidadeComPrecoDTO>() // Inicializa lista
                            };
                            prestadorDict.Add(prestador.Id, dto); // Adiciona no dicionário pelo ID
                        }

                        // 5. Adiciona a especialidade atual na lista de especialidades do DTO
                        dto.Especialidades.Add(especialidade);

                        // 6. Retorna o DTO (não importa aqui porque o resultado final é o dicionário)
                        return dto;
                    },
                    splitOn: "Id,Id" // 7. Diz ao Dapper onde separar os objetos na linha do resultado SQL (nos campos "Id")
                );

                // 8. Retorna apenas os valores únicos do dicionário, ou seja, uma lista de DTOs,
                // cada um com sua lista completa de especialidades.
                return prestadorDict.Values;
            }
        }

        public async Task Insert(PrestadorServicoInsertDTO prestadorServico)
        {
            string sql = @$"
                INSERT INTO PRESTADORSERVICO (OBSERVACAO, CNPJ, PESSOA_ID)
                             VALUES (@Observacao, @CNPJ, @Pessoa_Id)
            ";
            await _connection.Execute(sql, prestadorServico);
        }

        public async Task Delete(int id)
        {
            string sql = "DELETE FROM PRESTADORSERVICO WHERE ID = @id";
            await _connection.Execute(sql, new { id });
        }

        public async Task<PrestadorServicoEntity> GetById(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(PrestadorServicoEntity.Id)},
                           OBSERVACAO AS {nameof(PrestadorServicoEntity.Observacao)},
                           CNPJ AS {nameof(PrestadorServicoEntity.CNPJ)},
                           PESSOA_ID AS {nameof(PrestadorServicoEntity.Pessoa_Id)}
                      FROM PRESTADORSERVICO
                     WHERE ID = @id
                ";
                PrestadorServicoEntity prestadorServico = await con.QueryFirstAsync<PrestadorServicoEntity>(sql, new { id });
                return prestadorServico;
            }
        }

        public async Task Update(PrestadorServicoEntity prestadorServico)
        {
            string sql = @$"
                UPDATE PRESTADORSERVICO
                   SET OBSERVACAO = @Observacao,
                       CNPJ = @CNPJ,
                       PESSOA_ID = @Pessoa_Id
                 WHERE ID = @Id;
            ";
            await _connection.Execute(sql, prestadorServico);
        }
    }
}