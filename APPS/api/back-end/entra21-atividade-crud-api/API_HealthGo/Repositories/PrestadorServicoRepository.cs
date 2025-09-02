using API_HealthGo.Contracts.Infrastructure;
using API_HealthGo.Contracts.Repositories;
using API_HealthGo.DTO;
using API_HealthGo.Entities;
using API_HealthGo.Responses.MessageResponse;
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
            
                var prestadorDict = new Dictionary<int, PrestadorServico_All_Infos_DTO>();

                var result = await con.QueryAsync<
                    PrestadorServicoEntity,
                    PessoaEntity,
                    EspecialidadeComPrecoDTO,
                    PrestadorServico_All_Infos_DTO
                >(
                    sql,
                    (prestador, pessoa, especialidade) =>
                    {
                        if (!prestadorDict.TryGetValue(prestador.Id, out var dto))
                        {
                            dto = new PrestadorServico_All_Infos_DTO
                            {
                                prestadorServicoEntity = prestador,
                                PessoaEntity = pessoa,
                                Especialidades = new List<EspecialidadeComPrecoDTO>()
                            };
                            prestadorDict.Add(prestador.Id, dto);
                        }

                        dto.Especialidades.Add(especialidade);
                        return dto;
                    },
                    splitOn: "Id,Id"
                );

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

        public async Task<PrestadorServicoEntity> GetByPessoaId(int id)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @$"
                    SELECT ID AS {nameof(PrestadorServicoEntity.Id)},
                           OBSERVACAO AS {nameof(PrestadorServicoEntity.Observacao)},
                           CNPJ AS {nameof(PrestadorServicoEntity.CNPJ)},
                           PESSOA_ID AS {nameof(PrestadorServicoEntity.Pessoa_Id)}
                      FROM PRESTADORSERVICO
                     WHERE Pessoa_Id = @id
                ";
                PrestadorServicoEntity prestadorServico = await con.QueryFirstAsync<PrestadorServicoEntity>(sql, new { id });
                return prestadorServico;
            }
        }

        public async Task<IEnumerable<PrestadorServicoEspecialidadeDTO>> GetAllPrestadoresComEspecialidadesAsync()
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @"
                    SELECT
                        p.NOME AS NomePessoa,
                        p.EMAIL AS Email,
                        c.NOME AS Cidade,
                        e.NOME AS Estado,
                        p.TELEFONE AS Telefone,
                        p.ROLE AS ROLE,
                        p.RUA AS Rua,
                        p.NUMEROENDERECO AS NumeroEndereco,
                        p.BAIRRO AS Bairro,
                        p.ENDERECOFOTO AS EnderecoFoto,
                        pse.PRECOHORA AS PrecoHora,
                        ps.OBSERVACAO AS Observacao,
                        esp.NOME AS Especialidade
                    FROM
                        PrestadorServico ps
                    INNER JOIN
                        pessoa p ON ps.Pessoa_Id = p.Id
                    INNER JOIN
                        cidade c ON p.Cidade_Id = c.Id
                    INNER JOIN
                        estado e ON c.Estado_Id = e.Id
                    INNER JOIN
                        prestadorservico_especialidade pse ON ps.Id = pse.PrestadorServico_Id
                    INNER JOIN
                        especialidade esp ON pse.Especialidade_Id = esp.Id;
                ";
                var result = await con.QueryAsync<PrestadorServicoEspecialidadeDTO>(sql);
                return result;
            }
        }

        public async Task<IEnumerable<PrestadorServicoAgendaDTO>> GetAgendaByPrestadorId(int prestadorId)
        {
            using (MySqlConnection con = _connection.GetConnection())
            {
                string sql = @"
                    SELECT
                        os_ps.DataInicio AS DataInicio,
                        os_ps.DataFim AS DataFim,
                        espec.Nome AS Funcao,
                        cliente.Nome AS NomeCliente,
                        cliente.Email AS EmailCliente,
                        cliente.Telefone AS TelefoneCliente,
                        (TIMESTAMPDIFF(HOUR, os_ps.DataInicio, os_ps.DataFim) * pse.PrecoHora) AS PrecoTotal
                    FROM
                        OrdemServico_PrestadorServico os_ps
                    JOIN
                        PrestadorServico_Especialidade pse ON os_ps.prestadorservico_especialidade_Id = pse.Id
                    JOIN
                        PrestadorServico ps ON pse.PrestadorServico_Id = ps.Id
                    JOIN
                        Especialidade espec ON pse.Especialidade_Id = espec.Id
                    JOIN
                        OrdemServico os ON os_ps.OrdemServico_Id = os.Id
                    JOIN
                        Pessoa cliente ON os.Pessoa_Id = cliente.Id
                    WHERE
                        ps.Id = @prestadorId
                    ORDER BY
                        os_ps.DataInicio DESC;
                ";

                var agenda = await con.QueryAsync<PrestadorServicoAgendaDTO>(sql, new { prestadorId });
                return agenda;
            }
        }
    }
}