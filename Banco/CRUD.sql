-- INSERT
INSERT INTO Pessoa (
    Nome, DataNascimento, CPF, Email, Telefone, Senha,
    EnderecoRua, EnderecoCEP, Bairro, Rua, NumeroEndereco, Cidade_id
) VALUES (
    'João da Silva', '1985-06-15', '12345678900', 'joao@email.com', '11999998888', 'senha123',
    'Rua A', '01234567', 'Centro', 'Rua A', '123', 1
);

-- SELECT
SELECT id, Nome,DataNascimento,CPF,Email,Telefone,Senha,EnderecoRua,EnderecoCEP,Bairro,Rua,NumeroEndereco,Cidade_id FROM Pessoa WHERE id = 1;

-- UPDATE
UPDATE Pessoa SET
    Nome = 'João da Silva',
    DataNascimento = '1985-06-15',
    CPF = '12345678900',
    Email = 'joao@email.com',
    Telefone = '11999998888',
    Senha = 'senha123',
    EnderecoRua = 'Rua A',
    EnderecoCEP = '01234567',
    Bairro = 'Centro',
    Rua = 'Rua A',
    NumeroEndereco = '123',
    Cidade_id = 1
WHERE id = 1;

-- DELETE
DELETE FROM Pessoa WHERE id = 1;

-- ///////////////////////////////////////////////////////////////////////////////////////////////////////

-- INSERT
INSERT INTO Hotel (
    CNPJ, Nome, Tipo, Email, Telefone, EnderecoRua,Acessibilidade, Site, CEP, Bairro, Rua, NumeroEndereco, Cidade_id) VALUES (
    '12345678000199', 'Hotel Sol', 'HOTEL', 'contato@hotelsol.com', '1122334455', 'Av. Brasil, 100',
    'Sim', 'www.hotelsol.com', '01234567', 'Centro', 'Av. Brasil', '100', 1
);

-- SELECT
SELECT id, CNPJ, Nome, Tipo, Email, Telefone, EnderecoRua,Acessibilidade, Site, CEP, Bairro, Rua, NumeroEndereco, Cidade_id FROM Hotel WHERE id = 1;

-- UPDATE
UPDATE Hotel SET
    CNPJ = '12345678000199',
    Nome = 'Hotel Sol',
    Tipo = 'HOTEL',
    Email = 'contato@hotelsol.com',
    Telefone = '1122334455',
    EnderecoRua = 'Av. Brasil, 100',
    Acessibilidade = 'Sim',
    Site = 'www.hotelsol.com',
    CEP = '01234567',
    Bairro = 'Centro',
    Rua = 'Av. Brasil',
    NumeroEndereco = '100',
    Cidade_id = 1
WHERE id = 1;

-- DELETE
DELETE FROM Hotel WHERE id = 1;


-- ///////////////////////////////////////////////////////////////////////////////////////////////////////

-- INSERT
INSERT INTO Quarto (
    Numero, Andar, AndarMaximo, Observacao, Preco, EnderecoFoto, LimitePessoa, Hotel_id
) VALUES (
    '201', 2, 5, 'Vista para o mar', 350.00, 'img/quarto201.jpg', 3, 1
);

-- SELECT
SELECT id, Numero, Andar, AndarMaximo, Observacao, Preco, EnderecoFoto, LimitePessoa, Hotel_id FROM Quarto WHERE id = 1;

-- UPDATE
UPDATE Quarto SET
    Numero = '201',
    Andar = 2,
    AndarMaximo = 5,
    Observacao = 'Vista para o mar',
    Preco = 350.00,
    EnderecoFoto = 'img/quarto201.jpg',
    LimitePessoa = 3,
    Hotel_id = 1
WHERE id = 1;

-- DELETE
DELETE FROM Quarto WHERE id = 1;


-- ///////////////////////////////////////////////////////////////////////////////////////////////////////

-- INSERT
INSERT INTO PrestadorServico (
    PrecoHora, Observacao, CNPJ, Especialidade_id, Pessoa_id
) VALUES (
    80.00, 'Manutenção elétrica geral', '33445566000188', 1, 2
);

-- SELECT
SELECT id, PrecoHora, Observacao, CNPJ, Especialidade_id, Pessoa_id FROM PrestadorServico WHERE id = 1;

-- UPDATE
UPDATE PrestadorServico SET
    PrecoHora = 80.00,
    Observacao = 'Manutenção elétrica geral',
    CNPJ = '33445566000188',
    Especialidade_id = 1,
    Pessoa_id = 2
WHERE id = 1;

-- DELETE
DELETE FROM PrestadorServico WHERE id = 1;


-- ///////////////////////////////////////////////////////////////////////////////////////////////////////

-- INSERT
INSERT INTO OrdemServico (
    DataCriacao, StatusOS, Pessoa_id
) VALUES (
    '2024-04-01 08:00:00', 'PENDENTE', 1
);

-- SELECT
SELECT id, DataCriacao, StatusOS, Pessoa_id FROM OrdemServico WHERE id = 1;

-- UPDATE
UPDATE OrdemServico SET
    DataCriacao = '2024-04-01 08:00:00',
    StatusOS = 'PENDENTE',
    Pessoa_id = 1
WHERE id = 1;

-- DELETE
DELETE FROM OrdemServico WHERE id = 1;



-- ORDEM PRESTADOR
-- INSERT
INSERT INTO OrdemServico_PrestadorServico (
    Preco, HorasTrabalhadas, DataInicio, DataFim, StatusOS,
    PrestadorServico_id, OrdemServico_id
) VALUES (
    480.00, 6, '2024-04-01 10:00:00', '2024-04-01 16:00:00', 'CONCLUIDA',
    1, 1
);

-- SELECT
SELECT id, Preco, HorasTrabalhadas, DataInicio, DataFim, StatusOS, PrestadorServico_id, OrdemServico_id FROM OrdemServico_PrestadorServico WHERE id = 1;

-- UPDATE
UPDATE OrdemServico_PrestadorServico SET
    Preco = 480.00,
    HorasTrabalhadas = 6,
    DataInicio = '2024-04-01 10:00:00',
    DataFim = '2024-04-01 16:00:00',
    StatusOS = 'CONCLUIDA',
    PrestadorServico_id = 1,
    OrdemServico_id = 1
WHERE id = 1;

-- DELETE
DELETE FROM OrdemServico_PrestadorServico WHERE id = 1;


-- ORDEM HOTEL
-- INSERT 
INSERT INTO OrdemServico_Hotel (
    StatusOS, DataInicio, DataFim, Observacao, DataEncerramento,
    Hotel_id, OrdemServico_id
) VALUES (
    'EM_ANDAMENTO', '2024-04-01 10:00:00', '2024-04-02 18:00:00', 'Serviço de manutenção', NULL,
    1, 1
);

-- SELECT
SELECT id, StatusOS, DataInicio, DataFim, Observacao, DataEncerramento, Hotel_id, OrdemServico_id FROM OrdemServico_Hotel WHERE id = 1;

-- UPDATE
UPDATE OrdemServico_Hotel SET
    StatusOS = 'EM_ANDAMENTO',
    DataInicio = '2024-04-01 10:00:00',
    DataFim = '2024-04-02 18:00:00',
    Observacao = 'Serviço de manutenção',
    DataEncerramento = NULL,
    Hotel_id = 1,
    OrdemServico_id = 1
WHERE id = 1;

-- DELETE
DELETE FROM OrdemServico_Hotel WHERE id = 1;
-- ///////////////////////////////////////////////////////////////////////////////////////////////////////

-- INSERT
INSERT INTO Gerencia (
    Ativo, DataInicio, DataFim, Pessoa_id, Hotel_id
) VALUES (
    1, '2024-01-01 09:00:00', '2024-12-31 18:00:00', 1, 1
);

-- SELECT
SELECT id, Ativo, DataInicio, DataFim, Pessoa_id, Hotel_id FROM Gerencia WHERE id = 1;

-- UPDATE
UPDATE Gerencia SET
    Ativo = 1,
    DataInicio = '2024-01-01 09:00:00',
    DataFim = '2024-12-31 18:00:00',
    Pessoa_id = 1,
    Hotel_id = 1
WHERE id = 1;

-- DELETE
DELETE FROM Gerencia WHERE id = 1;


-- ///////////////////////////////////////////////////////////////////////////////////////////////////////

-- INSERT
INSERT INTO Cama_Quarto (
    Quantidade, TipoCama, Quarto_id
) VALUES (
    2, 'CASAL', 1
);

-- SELECT
SELECT id, Quantidade, TipoCama, Quarto_id FROM Cama_Quarto WHERE id = 1;

-- UPDATE
UPDATE Cama_Quarto SET
    Quantidade = 2,
    TipoCama = 'CASAL',
    Quarto_id = 1
WHERE id = 1;

-- DELETE
DELETE FROM Cama_Quarto WHERE id = 1;


-- ///////////////////////////////////////////////////////////////////////////////////////////////////////

-- INSERT 
INSERT INTO Lembrete (
    Titulo, DataInicio, DataTermino, Descricao, Frequencia, Pessoa_id) VALUES 
    ('Trocar filtro de água', '2024-04-01 08:00:00', '2024-04-01 09:00:00','Trocar filtro da cozinha', 'UNICA', 1);

-- SELECT
SELECT id, Titulo, DataInicio, DataTermino, Descricao, Frequencia, Pessoa_id FROM Lembrete WHERE id = 1;

-- UPDATE
UPDATE Lembrete SET
    Titulo = 'Trocar filtro de água',
    DataInicio = '2024-04-01 08:00:00',
    DataTermino = '2024-04-01 09:00:00',
    Descricao = 'Trocar filtro da cozinha',
    Frequencia = 'UNICA',
    Pessoa_id = 1
WHERE id = 1;

-- DELETE
DELETE FROM Lembrete WHERE id = 1;


-- ///////////////////////////////////////////////////////////////////////////////////////////////////////

-- INSERT
INSERT INTO Nacao (Nome) VALUES ('Brasil');

-- SELECT
SELECT id, Nome FROM Nacao WHERE id = 1;

-- UPDATE
UPDATE Nacao SET
    Nome = 'Brasil'
WHERE id = 1;

-- DELETE
DELETE FROM Nacao WHERE id = 1;


-- ///////////////////////////////////////////////////////////////////////////////////////////////////////

-- INSERT
INSERT INTO Estado (Nome, Sigla, Nacao_id)
VALUES ('São Paulo', 'SP', 1);

-- SELECT
SELECT id, Nome, Sigla, Nacao_id FROM Estado WHERE id = 1;

-- UPDATE
UPDATE Estado SET
    Nome = 'São Paulo',
    Sigla = 'SP',
    Nacao_id = 1
WHERE id = 1;

-- DELETE
DELETE FROM Estado WHERE id = 1;

-- ///////////////////////////////////////////////////////////////////////////////////////////////////////

-- ----> TABELA CIDADE <----

-- INSERT
INSERT INTO Cidade (Nome, Estado_id)
VALUES ('Campinas', 1);

-- SELECT
SELECT id, Nome, Estado_id FROM Cidade WHERE id = 1;

-- UPDATE
UPDATE Cidade SET
    Nome = 'Campinas',
    Estado_id = 1
WHERE id = 1;

-- DELETE
DELETE FROM Cidade WHERE id = 1;

-- ///////////////////////////////////////////////////////////////////////////////////////////////////////

-- INSERT
INSERT INTO Especialidade (Nome) VALUES ('Eletricista');

-- SELECT
SELECT id, Nome FROM Especialidade WHERE id = 1;

-- UPDATE
UPDATE Especialidade SET
    Nome = 'Eletricista'
WHERE id = 1;

-- DELETE
DELETE FROM Especialidade WHERE id = 1;

-- ///////////////////////////////////////////////////////////////////////////////////////////////////////
-- ///////////////////////////////////////////////////////////////////////////////////////////////////////
-- ///////////////////////////////////////////////////////////////////////////////////////////////////////
-- ///////////////////////////////////////////////////////////////////////////////////////////////////////
-- ///////////////////////////////////////////////////////////////////////////////////////////////////////
-- ///////////////////////////////////////////////////////////////////////////////////////////////////////