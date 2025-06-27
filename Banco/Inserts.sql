-- healthgo_inserts.sql
-- Inserts para o banco de dados HealthGo

USE HealthGo;

SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------
-- Inserts para a tabela Nacao
-- -----------------------------------------------------
INSERT INTO Nacao (Nome) VALUES ('Brasil');
INSERT INTO Nacao (Nome) VALUES ('Estados Unidos');
INSERT INTO Nacao (Nome) VALUES ('Canadá');
INSERT INTO Nacao (Nome) VALUES ('Alemanha');
INSERT INTO Nacao (Nome) VALUES ('França');
INSERT INTO Nacao (Nome) VALUES ('Japão');
INSERT INTO Nacao (Nome) VALUES ('Austrália');
INSERT INTO Nacao (Nome) VALUES ('Reino Unido');
INSERT INTO Nacao (Nome) VALUES ('Argentina');
INSERT INTO Nacao (Nome) VALUES ('Portugal');
INSERT INTO Nacao (Nome) VALUES ('Espanha');
INSERT INTO Nacao (Nome) VALUES ('Itália');
INSERT INTO Nacao (Nome) VALUES ('México');
INSERT INTO Nacao (Nome) VALUES ('China');
INSERT INTO Nacao (Nome) VALUES ('Índia');
INSERT INTO Nacao (Nome) VALUES ('África do Sul');
INSERT INTO Nacao (Nome) VALUES ('Nova Zelândia');
INSERT INTO Nacao (Nome) VALUES ('Suécia');
INSERT INTO Nacao (Nome) VALUES ('Noruega');
INSERT INTO Nacao (Nome) VALUES ('Finlândia');

-- -----------------------------------------------------
-- Inserts para a tabela Estado
-- -----------------------------------------------------
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Santa Catarina', 'SC', 1);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('São Paulo', 'SP', 1);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Rio de Janeiro', 'RJ', 1);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Minas Gerais', 'MG', 1);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Paraná', 'PR', 1);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Rio Grande do Sul', 'RS', 1);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Bahia', 'BA', 1);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Pernambuco', 'PE', 1);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Ceará', 'CE', 1);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Goiás', 'GO', 1);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Califórnia', 'CA', 2);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Nova Iorque', 'NY', 2);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Flórida', 'FL', 2);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Texas', 'TX', 2);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Ontário', 'ON', 3);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Quebec', 'QC', 3);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Baviera', 'BY', 4);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Brandemburgo', 'BB', 4);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Île-de-France', 'IDF', 5);
INSERT INTO Estado (Nome, Sigla, Nacao_id) VALUES ('Occitânia', 'OCC', 5);

-- -----------------------------------------------------
-- Inserts para a tabela Cidade
-- -----------------------------------------------------
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Blumenau', 1);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Joinville', 1);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Florianópolis', 1);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('São Paulo', 2);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Campinas', 2);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Rio de Janeiro', 3);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Niterói', 3);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Belo Horizonte', 4);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Uberlândia', 4);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Curitiba', 5);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Londrina', 5);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Porto Alegre', 6);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Caxias do Sul', 6);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Salvador', 7);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Recife', 8);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Fortaleza', 9);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Goiânia', 10);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Los Angeles', 11);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Nova Iorque', 12);
INSERT INTO Cidade (Nome, Estado_id) VALUES ('Orlando', 13);

-- -----------------------------------------------------
-- Inserts para a tabela Pessoa
-- -----------------------------------------------------
INSERT INTO Pessoa (Nome, DataNascimento, CPF, Telefone, Email, Senha, EnderecoFoto, CaoGuia, CEP, Bairro, Rua, NumeroEndereco, Cidade_id) VALUES
('João Silva', '1980-01-15', '111.222.333-44', '47988887777', 'joao.silva@email.com', 'senha123', 'foto1.jpg', 0, '89000-000', 'Centro', 'Rua XV de Novembro', '100', 1),
('Maria Oliveira', '1992-05-20', '222.333.444-55', '47999998888', 'maria.oliveira@email.com', 'senha456', 'foto2.jpg', 1, '89001-001', 'Boa Vista', 'Rua Bahia', '250', 2),
('Pedro Souza', '1975-11-30', '333.444.555-66', '48911112222', 'pedro.souza@email.com', 'senha789', 'foto3.jpg', 0, '88000-000', 'Agronômica', 'Avenida Beira Mar', '500', 3),
('Ana Santos', '1988-03-08', '444.555.666-77', '11922223333', 'ana.santos@email.com', 'senhaabc', 'foto4.jpg', 0, '01000-000', 'Paulista', 'Avenida Paulista', '1000', 4),
('Carlos Lima', '1995-07-25', '555.666.777-88', '19933334444', 'carlos.lima@email.com', 'senhaxyz', 'foto5.jpg', 1, '13000-000', 'Cambui', 'Rua Coronel Quirino', '300', 5),
('Fernanda Costa', '1982-09-10', '666.777.888-99', '21944445555', 'fernanda.costa@email.com', 'senhadfg', 'foto6.jpg', 0, '20000-000', 'Centro', 'Avenida Rio Branco', '700', 6),
('Gabriel Almeida', '1990-02-18', '777.888.999-00', '21955556666', 'gabriel.almeida@email.com', 'senhajkl', 'foto7.jpg', 0, '24000-000', 'Icaraí', 'Rua Gavião Peixoto', '120', 7),
('Juliana Pereira', '1978-12-05', '888.999.000-11', '31966667777', 'juliana.pereira@email.com', 'senhatre', 'foto8.jpg', 1, '30000-000', 'Savassi', 'Rua Pernambuco', '450', 8),
('Rafael Rocha', '1998-06-14', '999.000.111-22', '34977778888', 'rafael.rocha@email.com', 'senhatyu', 'foto9.jpg', 0, '38000-000', 'Centro', 'Avenida João Naves de Ávila', '900', 9),
('Patricia Martins', '1985-04-22', '000.111.222-33', '41988889999', 'patricia.martins@email.com', 'senhacvb', 'foto10.jpg', 0, '80000-000', 'Batel', 'Rua Comendador Araújo', '600', 10),
('Ricardo Gomes', '1970-08-01', '123.456.789-01', '43912345678', 'ricardo.gomes@email.com', 'senha101', 'foto11.jpg', 0, '86000-000', 'Centro', 'Avenida Higienópolis', '150', 11),
('Sofia Fernandes', '1993-10-17', '234.567.890-12', '51923456789', 'sofia.fernandes@email.com', 'senha202', 'foto12.jpg', 1, '90000-000', 'Moinhos de Vento', 'Rua Padre Chagas', '200', 12),
('Lucas Rodrigues', '1989-01-28', '345.678.901-23', '54934567890', 'lucas.rodrigues@email.com', 'senha303', 'foto13.jpg', 0, '95000-000', 'Centro', 'Rua Sinimbu', '350', 13),
('Mariana Dias', '1972-03-11', '456.789.012-34', '71945678901', 'mariana.dias@email.com', 'senha404', 'foto14.jpg', 0, '40000-000', 'Barra', 'Avenida Oceânica', '800', 14),
('Thiago Mendes', '1996-05-03', '567.890.123-45', '81956789012', 'thiago.mendes@email.com', 'senha505', 'foto15.jpg', 1, '50000-000', 'Boa Vista', 'Avenida Conde da Boa Vista', '400', 15),
('Larissa Farias', '1984-07-07', '678.901.234-56', '85967890123', 'larissa.farias@email.com', 'senha606', 'foto16.jpg', 0, '60000-000', 'Aldeota', 'Avenida Dom Luís', '950', 16),
('Diego Pires', '1991-09-19', '789.012.345-67', '62978901234', 'diego.pires@email.com', 'senha707', 'foto17.jpg', 0, '74000-000', 'Setor Bueno', 'Avenida T-1', '550', 17),
('Beatriz Costa', '1987-11-24', '890.123.456-78', '3235678901', 'beatriz.costa@email.com', 'senha808', 'foto18.jpg', 0, '90210', 'Beverly Hills', 'Rodeo Drive', '123', 18),
('Alex Johnson', '1983-02-09', '901.234.567-89', '9171234567', 'alex.johnson@email.com', 'senha909', 'foto19.jpg', 0, '10001', 'Manhattan', 'Times Square', '45', 19),
('Emily Brown', '1994-08-12', '012.345.678-90', '4072345678', 'emily.brown@email.com', 'senha1010', 'foto20.jpg', 1, '32801', 'Downtown', 'Church Street', '789', 20);

-- -----------------------------------------------------
-- Inserts para a tabela Hotel
-- -----------------------------------------------------
INSERT INTO Hotel (CNPJ, Nome, Tipo, Email, Telefone, Site, Acessibilidade, CEP, Bairro, Rua, NumeroEndereco, Descricao, Ativo, Cidade_id) VALUES
('00.000.000/0001-00', 'Hotel Paradiso', 'Hotel', 'paradiso@email.com', '4733331111', 'www.hotelparadiso.com', 'Rampas, Elevadores, Quartos adaptados', '89010-000', 'Centro', 'Rua Sete de Setembro', '100', 'Um hotel luxuoso com vista para o rio.', 1, 1),
('01.000.000/0001-01', 'Pousada Encanto', 'Pousada', 'encanto@email.com', '4734342222', 'www.pousadaencanto.com', 'Cadeiras de rodas disponíveis', '89020-000', 'Vila Nova', 'Rua XV de Outubro', '200', 'Aconchegante pousada familiar.', 1, 2),
('02.000.000/0001-02', 'Hostel Aventura', 'Hostel', 'aventura@email.com', '4832323333', 'www.hostelaventura.com', 'Banheiros adaptados', '88030-000', 'Lagoa', 'Rua das Flores', '300', 'Ideal para viajantes e mochileiros.', 1, 3),
('03.000.000/0001-03', 'Hotel Moderno', 'Hotel', 'moderno@email.com', '1130304444', 'www.hotelmoderno.com', 'Elevadores, Sinalização em Braille', '01300-000', 'Consolação', 'Rua Augusta', '400', 'Hotel com design arrojado e moderno.', 1, 4),
('04.000.000/0001-04', 'Apartamento Conforto', 'Apartamento', 'conforto@email.com', '1931315555', 'www.apartamentoconforto.com', 'Portas largas', '13050-000', 'Centro', 'Avenida Aquidabã', '500', 'Apartamentos completos para longa estadia.', 1, 5),
('05.000.000/0001-05', 'Casa Colonial', 'Casa', 'colonial@email.com', '2135356666', 'www.casacolonial.com', 'Acesso sem degraus', '20200-000', 'Santa Teresa', 'Rua Aprazível', '600', 'Casa histórica com charme colonial.', 1, 6),
('06.000.000/0001-06', 'Hotel Vista Mar', 'Hotel', 'vistamar@email.com', '2136367777', 'www.hotelvistamar.com', 'Corrimãos', '24200-000', 'Praia', 'Avenida Atlântica', '700', 'Quartos com vista deslumbrante para o mar.', 1, 7),
('07.000.000/0001-07', 'Pousada Verde', 'Pousada', 'pousadaverde@email.com', '3137378888', 'www.pousadaverde.com', 'Rampas de acesso', '30100-000', 'Funcionários', 'Rua Cláudio Manuel', '800', 'Ambiente tranquilo e arborizado.', 1, 8),
('08.000.000/0001-08', 'Hotel Executivo', 'Hotel', 'executivo@email.com', '3438389999', 'www.hotelexecutivo.com', 'Elevadores, Sinalização tátil', '38400-000', 'Centro', 'Avenida Afonso Pena', '900', 'Ideal para viagens a negócios.', 1, 9),
('09.000.000/0001-09', 'Hostel Urbano', 'Hostel', 'urbano@email.com', '4139390000', 'www.hostelurbano.com', 'Acesso fácil', '80000-000', 'Centro', 'Rua Cândido Lopes', '1000', 'Localização central e vibrante.', 1, 10),
('10.000.000/0001-10', 'Hotel Sol Nascente', 'Hotel', 'solnascente@email.com', '4330001111', 'www.hotelsolnascente.com', 'Quartos com barras de apoio', '86000-000', 'Aurora', 'Rua do Sol', '1100', 'Conforto e bom gosto para sua estadia.', 1, 11),
('11.000.000/0001-11', 'Pousada da Serra', 'Pousada', 'serrana@email.com', '5131112222', 'www.pousadaserra.com', 'Rampas, Vagas especiais', '90000-000', 'Centro Histórico', 'Rua da Praia', '1200', 'A tranquilidade da serra ao seu alcance.', 1, 12),
('12.000.000/0001-12', 'Hotel Charme', 'Hotel', 'charme@email.com', '5432223333', 'www.hotelcharme.com', 'Elevadores, Sinalização visual', '95000-000', 'Lourdes', 'Rua dos Plátanos', '1300', 'Com estilo único e atendimento impecável.', 1, 13),
('13.000.000/0001-13', 'Hostel Praia', 'Hostel', 'hostelpraia@email.com', '7133334444', 'www.hostelpraia.com', 'Áreas comuns acessíveis', '40100-000', 'Ondina', 'Avenida Oceânica', '1400', 'Próximo às melhores praias.', 1, 14),
('14.000.000/0001-14', 'Hotel Central', 'Hotel', 'hotelcentral@email.com', '8134445555', 'www.hotelcentral.com', 'Rampas, Portas automáticas', '50000-000', 'Boa Vista', 'Avenida Dantas Barreto', '1500', 'No coração da cidade, perto de tudo.', 1, 15),
('15.000.000/0001-15', 'Pousada Doce Lar', 'Pousada', 'docelar@email.com', '8535556666', 'www.pousadadocelar.com', 'Banheiros adaptados, Sinalização em Braille', '60100-000', 'Meireles', 'Avenida Abolição', '1600', 'Sua casa fora de casa.', 1, 16),
('16.000.000/0001-16', 'Hotel Conexão', 'Hotel', 'conexao@email.com', '6236667777', 'www.hotelconexao.com', 'Vagas de estacionamento especiais', '74000-000', 'Aeroporto', 'Avenida Anhanguera', '1700', 'Localização estratégica perto do aeroporto.', 1, 17),
('17.000.000/0001-17', 'Luxury Suites', 'Hotel', 'luxurysuites@email.com', '3101234567', 'www.luxurysuites.com', 'Wheelchair accessible rooms', '90210', 'Beverly Hills', 'Wilshire Blvd', '1800', 'Exclusive suites for discerning guests.', 1, 18),
('18.000.000/0001-18', 'Times Square Inn', 'Hostel', 'tsinn@email.com', '2129876543', 'www.timessquareinn.com', 'Elevator access', '10036', 'Midtown', 'Broadway', '1900', 'Affordable stay in the heart of NYC.', 1, 19),
('19.000.000/0001-19', 'Magic Kingdom Resort', 'Hotel', 'mkresort@email.com', '4078765432', 'www.magickingdomresort.com', 'Full accessibility features', '32830', 'Lake Buena Vista', 'World Dr', '2000', 'Family-friendly resort near attractions.', 1, 20);

-- -----------------------------------------------------
-- Inserts para a tabela Lembrete
-- -----------------------------------------------------
INSERT INTO Lembrete (Titulo, DataInicio, DataFim, Descricao, Frequencia, Pessoa_id) VALUES
('Consulta Médica', '2025-07-10 10:00:00', '2025-07-10 11:00:00', 'Retorno com o cardiologista.', 'NENHUMA', 1),
('Reunião de Trabalho', '2025-07-15 14:00:00', '2025-07-15 15:00:00', 'Reunião semanal com a equipe.', 'SEMANAL', 2),
('Pagar Contas', '2025-07-05 09:00:00', NULL, 'Contas de água, luz e internet.', 'MENSAL', 3),
('Aniversário da Vó', '2025-08-20 18:00:00', NULL, 'Comprar presente.', 'ANUAL', 4),
('Academia', '2025-07-01 07:00:00', NULL, 'Treino de pernas.', 'DIARIA', 5),
('Dentista', '2025-09-01 16:00:00', '2025-09-01 17:00:00', 'Limpeza anual.', 'ANUAL', 6),
('Comprar Supermercado', '2025-07-08 10:00:00', NULL, 'Lista de compras.', 'SEMANAL', 7),
('Viagem de Férias', '2025-12-10 08:00:00', '2025-12-20 18:00:00', 'Preparar malas.', 'NENHUMA', 8),
('Projeto X', '2025-07-22 13:00:00', '2025-07-22 17:00:00', 'Entrega da primeira fase.', 'NENHUMA', 9),
('Caminhada Matinal', '2025-07-01 06:00:00', NULL, 'Manter a rotina.', 'DIARIA', 10),
('Revisão do Carro', '2025-10-01 09:00:00', NULL, 'Levar o carro na oficina.', 'ANUAL', 11),
('Curso de Idiomas', '2025-07-03 19:00:00', NULL, 'Aula de inglês.', 'SEMANAL', 12),
('Reunião de Condomínio', '2025-07-28 20:00:00', NULL, 'Discutir novas regras.', 'MENSAL', 13),
('Visita aos Pais', '2025-07-06 14:00:00', NULL, 'Almoço em família.', 'NENHUMA', 14),
('Estudar para Prova', '2025-08-05 09:00:00', '2025-08-05 12:00:00', 'Preparar-se para a prova de cálculo.', 'NENHUMA', 15),
('Apresentação no Trabalho', '2025-07-25 10:00:00', '2025-07-25 11:00:00', 'Apresentar resultados do trimestre.', 'NENHUMA', 16),
('Encontro com Amigos', '2025-07-12 19:00:00', NULL, 'Jantar na pizzaria.', 'NENHUMA', 17),
('Manutenção do Computador', '2025-07-18 15:00:00', NULL, 'Fazer backup dos arquivos.', 'MENSAL', 18),
('Reunião com o Advogado', '2025-08-01 10:00:00', NULL, 'Assinar documentos.', 'NENHUMA', 19),
('Doar Sangue', '2025-09-10 09:00:00', NULL, 'Agendar doação.', 'ANUAL', 20);

-- -----------------------------------------------------
-- Inserts para a tabela Quarto
-- -----------------------------------------------------
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_id) VALUES
('101', 1, 1, 'Vista para a piscina', 150.00, 2, 1),
('102', 1, 0, 'Quarto padrão', 120.00, 2, 1),
('201', 2, 1, 'Suite com varanda', 250.00, 4, 1),
('301', 3, 0, 'Quarto com vista para a cidade', 180.00, 2, 2),
('402', 4, 1, 'Quarto familiar', 200.00, 3, 2),
('501', 5, 0, 'Quarto individual', 90.00, 1, 3),
('103', 1, 1, 'Vista para o jardim', 160.00, 2, 4),
('202', 2, 0, 'Quarto executivo', 190.00, 1, 4),
('302', 3, 1, 'Suite luxo', 300.00, 4, 5),
('401', 4, 0, 'Quarto duplo', 130.00, 2, 5),
('104', 1, 1, 'Acesso facilitado', 140.00, 2, 6),
('203', 2, 0, 'Quarto com sacada', 170.00, 2, 6),
('303', 3, 1, 'Suite presidencial', 500.00, 5, 7),
('403', 4, 0, 'Quarto econômico', 100.00, 2, 7),
('502', 5, 1, 'Quarto com vista panorâmica', 220.00, 3, 8),
('105', 1, 0, 'Quarto conjugado', 280.00, 4, 8),
('204', 2, 1, 'Quarto temático', 230.00, 2, 9),
('304', 3, 0, 'Quarto adaptado', 175.00, 2, 9),
('404', 4, 1, 'Quarto pet-friendly', 195.00, 2, 10),
('503', 5, 0, 'Quarto superior', 210.00, 2, 10);

-- -----------------------------------------------------
-- Inserts para a tabela OrdemServico
-- -----------------------------------------------------
INSERT INTO OrdemServico (DataCriacao, StatusOS, Pessoa_id) VALUES
('2025-06-20 10:00:00', 'Concluído', 1),
('2025-06-21 11:30:00', 'Em andamento', 2),
('2025-06-22 14:00:00', 'Cancelado', 3),
('2025-06-23 09:00:00', 'Concluído', 4),
('2025-06-24 16:00:00', 'Em andamento', 5),
('2025-06-25 08:00:00', 'Concluído', 6),
('2025-06-26 12:00:00', 'Em andamento', 7),
('2025-06-27 15:00:00', 'Cancelado', 8),
('2025-06-28 10:30:00', 'Concluído', 9),
('2025-06-29 13:00:00', 'Em andamento', 10),
('2025-07-01 09:00:00', 'Concluído', 11),
('2025-07-02 11:00:00', 'Em andamento', 12),
('2025-07-03 14:30:00', 'Cancelado', 13),
('2025-07-04 10:00:00', 'Concluído', 14),
('2025-07-05 16:00:00', 'Em andamento', 15),
('2025-07-06 08:30:00', 'Concluído', 16),
('2025-07-07 12:30:00', 'Em andamento', 17),
('2025-07-08 15:30:00', 'Cancelado', 18),
('2025-07-09 10:00:00', 'Concluído', 19),
('2025-07-10 13:00:00', 'Em andamento', 20);

-- -----------------------------------------------------
-- Inserts para a tabela OrdemServico_Hotel
-- -----------------------------------------------------
INSERT INTO OrdemServico_Hotel (StatusOS, Preco, Observacao, QuantAcompanhante, DataInicio, DataFim, Quarto_id, OrdemServico_id) VALUES
('Concluído', 300.00, 'Estadia de 2 noites', 1, '2025-06-20 14:00:00', '2025-06-22 12:00:00', 1, 1),
('Em andamento', 240.00, 'Reserva para 1 semana', 0, '2025-06-21 15:00:00', '2025-06-28 12:00:00', 2, 2),
('Cancelado', 500.00, 'Cancelamento por motivo de força maior', 2, '2025-06-22 16:00:00', '2025-06-24 12:00:00', 3, 3),
('Concluído', 360.00, 'Fim de semana prolongado', 1, '2025-06-23 10:00:00', '2025-06-26 12:00:00', 4, 4),
('Em andamento', 400.00, 'Viagem de negócios', 0, '2025-06-24 17:00:00', '2025-06-27 12:00:00', 5, 5),
('Concluído', 180.00, 'Pernoite', 0, '2025-06-25 08:00:00', '2025-06-26 08:00:00', 6, 6),
('Em andamento', 320.00, 'Família com crianças', 2, '2025-06-26 14:00:00', '2025-06-29 12:00:00', 7, 7),
('Cancelado', 600.00, 'Problemas com o voo', 3, '2025-06-27 18:00:00', '2025-06-30 12:00:00', 8, 8),
('Concluído', 390.00, 'Aniversário de casamento', 1, '2025-06-28 11:00:00', '2025-07-01 12:00:00', 9, 9),
('Em andamento', 260.00, 'Estadia a trabalho', 0, '2025-06-29 14:00:00', '2025-07-02 12:00:00', 10, 10),
('Concluído', 280.00, 'Viagem de lazer', 1, '2025-07-01 15:00:00', '2025-07-03 12:00:00', 11, 11),
('Em andamento', 340.00, 'Férias de verão', 2, '2025-07-02 16:00:00', '2025-07-05 12:00:00', 12, 12),
('Cancelado', 1000.00, 'Reembolso total', 4, '2025-07-03 17:00:00', '2025-07-06 12:00:00', 13, 13),
('Concluído', 200.00, 'Estadia rápida', 0, '2025-07-04 11:00:00', '2025-07-05 11:00:00', 14, 14),
('Em andamento', 440.00, 'Fim de semana em família', 3, '2025-07-05 18:00:00', '2025-07-08 12:00:00', 15, 15),
('Concluído', 560.00, 'Passeio turístico', 1, '2025-07-06 09:00:00', '2025-07-09 12:00:00', 16, 16),
('Em andamento', 460.00, 'Evento na cidade', 2, '2025-07-07 13:00:00', '2025-07-10 12:00:00', 17, 17),
('Cancelado', 350.00, 'Mudança de planos', 1, '2025-07-08 16:00:00', '2025-07-11 12:00:00', 18, 18),
('Concluído', 390.00, 'Lua de mel', 1, '2025-07-09 10:00:00', '2025-07-12 12:00:00', 19, 19),
('Em andamento', 420.00, 'Semana de treinamento', 0, '2025-07-10 14:00:00', '2025-07-13 12:00:00', 20, 20);


-- -----------------------------------------------------
-- Inserts para a tabela Especialidade
-- -----------------------------------------------------
INSERT INTO Especialidade (Nome) VALUES ('Enfermagem');
INSERT INTO Especialidade (Nome) VALUES ('Fisioterapia');
INSERT INTO Especialidade (Nome) VALUES ('Medicina Geral');
INSERT INTO Especialidade (Nome) VALUES ('Nutrição');
INSERT INTO Especialidade (Nome) VALUES ('Psicologia');
INSERT INTO Especialidade (Nome) VALUES ('Terapeuta Ocupacional');
INSERT INTO Especialidade (Nome) VALUES ('Cuidadores de Idosos');
INSERT INTO Especialidade (Nome) VALUES ('Motorista Particular');
INSERT INTO Especialidade (Nome) VALUES ('Acompanhante Hospitalar');
INSERT INTO Especialidade (Nome) VALUES ('Personal Trainer');
INSERT INTO Especialidade (Nome) VALUES ('Fonoaudiologia');
INSERT INTO Especialidade (Nome) VALUES ('Podologia');
INSERT INTO Especialidade (Nome) VALUES ('Massoterapia');
INSERT INTO Especialidade (Nome) VALUES ('Quiropraxia');
INSERT INTO Especialidade (Nome) VALUES ('Acupuntura');
INSERT INTO Especialidade (Nome) VALUES ('Farmacêutico');
INSERT INTO Especialidade (Nome) VALUES ('Radiologia');
INSERT INTO Especialidade (Nome) VALUES ('Terapia da Fala');
INSERT INTO Especialidade (Nome) VALUES ('Dietista');
INSERT INTO Especialidade (Nome) VALUES ('Assistente Pessoal');

-- -----------------------------------------------------
-- Inserts para a tabela PrestadorServico
-- -----------------------------------------------------
INSERT INTO PrestadorServico (PrecoHora, Observacao, CNPJ, Ativo, Especialidade_id, Pessoa_id) VALUES
(50.00, 'Enfermeira com 5 anos de experiência.', NULL, 1, 1, 1),
(75.00, 'Fisioterapeuta especialista em reabilitação motora.', NULL, 1, 2, 2),
(120.00, 'Clínico geral com consultório próprio.', '00.000.000/0001-00', 1, 3, 3),
(60.00, 'Nutricionista esportiva.', NULL, 1, 4, 4),
(80.00, 'Psicóloga com foco em terapia cognitivo-comportamental.', NULL, 1, 5, 5),
(70.00, 'Terapeuta ocupacional para reabilitação de idosos.', NULL, 1, 6, 6),
(40.00, 'Cuidador com experiência em pacientes com Alzheimer.', NULL, 1, 7, 7),
(35.00, 'Motorista com carro adaptado para cadeirantes.', NULL, 1, 8, 8),
(45.00, 'Acompanhante para plantões hospitalares.', NULL, 1, 9, 9),
(90.00, 'Personal trainer com certificação em pilates.', NULL, 1, 10, 10),
(65.00, 'Fonoaudióloga para distúrbios da fala.', NULL, 1, 11, 11),
(55.00, 'Podólogo especializado em pés diabéticos.', NULL, 1, 12, 12),
(70.00, 'Massoterapeuta com diversas técnicas.', NULL, 1, 13, 13),
(85.00, 'Quiropraxia para problemas de coluna.', NULL, 1, 14, 14),
(95.00, 'Acupunturista para alívio da dor.', NULL, 1, 15, 15),
(50.00, 'Farmacêutico para orientações sobre medicamentos.', NULL, 1, 16, 16),
(70.00, 'Técnico em radiologia para exames domiciliares.', NULL, 1, 17, 17),
(80.00, 'Terapeuta da fala para crianças.', NULL, 1, 18, 18),
(60.00, 'Dietista para planos alimentares personalizados.', NULL, 1, 19, 19),
(40.00, 'Assistente pessoal para tarefas diárias.', NULL, 1, 20, 20);

-- -----------------------------------------------------
-- Inserts para a tabela OrdemServico_PrestadorServico
-- -----------------------------------------------------
INSERT INTO OrdemServico_PrestadorServico (Preco, HorasTrabalhadas, DataInicio, DataFim, StatusOS, PrestadorServico_id, OrdemServico_id) VALUES
(100.00, 2, '2025-06-20 10:00:00', '2025-06-20 12:00:00', 'Concluído', 1, 1),
(150.00, 2, '2025-06-21 11:30:00', '2025-06-21 13:30:00', 'Em andamento', 2, 2),
(240.00, 2, '2025-06-22 14:00:00', '2025-06-22 16:00:00', 'Cancelado', 3, 3),
(120.00, 2, '2025-06-23 09:00:00', '2025-06-23 11:00:00', 'Concluído', 4, 4),
(160.00, 2, '2025-06-24 16:00:00', '2025-06-24 18:00:00', 'Em andamento', 5, 5),
(140.00, 2, '2025-06-25 08:00:00', '2025-06-25 10:00:00', 'Concluído', 6, 6),
(80.00, 2, '2025-06-26 12:00:00', '2025-06-26 14:00:00', 'Em andamento', 7, 7),
(70.00, 2, '2025-06-27 15:00:00', '2025-06-27 17:00:00', 'Cancelado', 8, 8),
(90.00, 2, '2025-06-28 10:30:00', '2025-06-28 12:30:00', 'Concluído', 9, 9),
(180.00, 2, '2025-06-29 13:00:00', '2025-06-29 15:00:00', 'Em andamento', 10, 10),
(130.00, 2, '2025-07-01 09:00:00', '2025-07-01 11:00:00', 'Concluído', 11, 11),
(110.00, 2, '2025-07-02 11:00:00', '2025-07-02 13:00:00', 'Em andamento', 12, 12),
(140.00, 2, '2025-07-03 14:30:00', '2025-07-03 16:30:00', 'Cancelado', 13, 13),
(170.00, 2, '2025-07-04 10:00:00', '2025-07-04 12:00:00', 'Concluído', 14, 14),
(190.00, 2, '2025-07-05 16:00:00', '2025-07-05 18:00:00', 'Em andamento', 15, 15),
(100.00, 2, '2025-07-06 08:30:00', '2025-07-06 10:30:00', 'Concluído', 16, 16),
(140.00, 2, '2025-07-07 12:30:00', '2025-07-07 14:30:00', 'Em andamento', 17, 17),
(160.00, 2, '2025-07-08 15:30:00', '2025-07-08 17:30:00', 'Cancelado', 18, 18),
(120.00, 2, '2025-07-09 10:00:00', '2025-07-09 12:00:00', 'Concluído', 19, 19),
(80.00, 2, '2025-07-10 13:00:00', '2025-07-10 15:00:00', 'Em andamento', 20, 20);

-- -----------------------------------------------------
-- Inserts para a tabela Gerencia
-- -----------------------------------------------------
INSERT INTO Gerencia (Ativo, DataInicio, DataFim, Pessoa_id, Hotel_id) VALUES
(1, '2024-01-01 09:00:00', NULL, 1, 1),
(1, '2024-02-15 10:00:00', NULL, 2, 2),
(1, '2024-03-20 11:00:00', NULL, 3, 3),
(1, '2024-04-01 12:00:00', NULL, 4, 4),
(1, '2024-05-10 13:00:00', NULL, 5, 5),
(1, '2024-06-01 14:00:00', NULL, 6, 6),
(1, '2024-07-05 15:00:00', NULL, 7, 7),
(1, '2024-08-12 16:00:00', NULL, 8, 8),
(1, '2024-09-20 17:00:00', NULL, 9, 9),
(1, '2024-10-01 18:00:00', NULL, 10, 10),
(1, '2024-11-05 09:00:00', NULL, 11, 11),
(1, '2024-12-10 10:00:00', NULL, 12, 12),
(1, '2025-01-15 11:00:00', NULL, 13, 13),
(1, '2025-02-20 12:00:00', NULL, 14, 14),
(1, '2025-03-25 13:00:00', NULL, 15, 15),
(1, '2025-04-01 14:00:00', NULL, 16, 16),
(1, '2025-05-10 15:00:00', NULL, 17, 17),
(1, '2025-06-01 16:00:00', NULL, 18, 18),
(1, '2025-06-15 17:00:00', NULL, 19, 19),
(1, '2025-06-20 18:00:00', NULL, 20, 20);

-- -----------------------------------------------------
-- Inserts para a tabela Cama_Quarto
-- -----------------------------------------------------
INSERT INTO Cama_Quarto (Quantidade, TipoCama, Quarto_id) VALUES
(1, 'Casal', 1),
(2, 'Solteiro', 2),
(1, 'Casal', 3),
(1, 'Solteiro', 4),
(1, 'Beliche', 5),
(1, 'Futon', 6),
(2, 'Casal', 7),
(1, 'Solteiro', 8),
(1, 'Casal', 9),
(2, 'Solteiro', 10),
(1, 'Casal', 11),
(1, 'Futon', 12),
(2, 'Beliche', 13),
(1, 'Solteiro', 14),
(1, 'Casal', 15),
(2, 'Solteiro', 16),
(1, 'Casal', 17),
(1, 'Futon', 18),
(2, 'Solteiro', 19),
(1, 'Casal', 20);

-- -----------------------------------------------------
-- Inserts para a tabela Aeroporto
-- -----------------------------------------------------
INSERT INTO Aeroporto (Nome, CodigoIata, Cidade_id) VALUES
('Aeroporto Internacional de Blumenau', 'BNU', 1),
('Aeroporto de Joinville - Lauro Carneiro de Loyola', 'JOI', 2),
('Aeroporto Internacional de Florianópolis - Hercílio Luz', 'FLN', 3),
('Aeroporto Internacional de São Paulo - Guarulhos', 'GRU', 4),
('Aeroporto Internacional de Viracopos', 'VCP', 5),
('Aeroporto Internacional do Rio de Janeiro - Galeão', 'GIG', 6),
('Aeroporto Santos Dumont', 'SDU', 7),
('Aeroporto Internacional de Belo Horizonte - Confins', 'CNF', 8),
('Aeroporto de Uberlândia - Ten. Cel. Av. César Bombonato', 'UDI', 9),
('Aeroporto Internacional de Curitiba - Afonso Pena', 'CWB', 10),
('Aeroporto de Londrina - Governador José Richa', 'LDB', 11),
('Aeroporto Internacional de Porto Alegre - Salgado Filho', 'POA', 12),
('Aeroporto de Caxias do Sul - Hugo Cantergiani', 'CXJ', 13),
('Aeroporto Internacional de Salvador - Dep. Luís Eduardo Magalhães', 'SSA', 14),
('Aeroporto Internacional do Recife - Guararapes', 'REC', 15),
('Aeroporto Internacional de Fortaleza - Pinto Martins', 'FOR', 16),
('Aeroporto de Goiânia - Santa Genoveva', 'GYN', 17),
('Los Angeles International Airport', 'LAX', 18),
('John F. Kennedy International Airport', 'JFK', 19),
('Orlando International Airport', 'MCO', 20);

-- -----------------------------------------------------
-- Inserts para a tabela Aviao
-- -----------------------------------------------------
INSERT INTO Aviao (QuantidadeVaga, CodigoRegistro, Companhia, Modelo, Fabricante) VALUES
(150, 'PR-ABC', 'LATAM', 'Airbus A320', 'Airbus'),
(200, 'PP-DEF', 'GOL', 'Boeing 737-800', 'Boeing'),
(180, 'PS-GHI', 'Azul', 'Embraer 195', 'Embraer'),
(300, 'N123AA', 'American Airlines', 'Boeing 777-200ER', 'Boeing'),
(250, 'D-ABCD', 'Lufthansa', 'Airbus A330-300', 'Airbus'),
(160, 'F-EFGH', 'Air France', 'Airbus A321', 'Airbus'),
(220, 'JA801J', 'Japan Airlines', 'Boeing 787-8', 'Boeing'),
(140, 'VH-JKL', 'Qantas', 'Boeing 737-400', 'Boeing'),
(190, 'G-MNOP', 'British Airways', 'Airbus A320neo', 'Airbus'),
(170, 'LV-QRZ', 'Aerolineas Argentinas', 'Boeing 737-700', 'Boeing'),
(130, 'CS-TUI', 'TAP Air Portugal', 'Embraer 190', 'Embraer'),
(210, 'EC-MNT', 'Iberia', 'Airbus A340-600', 'Airbus'),
(280, 'XA-UVW', 'Aeromexico', 'Boeing 787-9', 'Boeing'),
(350, 'B-XYZ1', 'Air China', 'Boeing 747-400', 'Boeing'),
(260, 'VT-ABC', 'Air India', 'Airbus A320neo', 'Airbus'),
(150, 'ZS-DEF', 'South African Airways', 'Airbus A319', 'Airbus'),
(180, 'ZK-GHI', 'Air New Zealand', 'Boeing 777-300ER', 'Boeing'),
(170, 'SE-JKL', 'SAS', 'Airbus A320', 'Airbus'),
(140, 'LN-MNO', 'Norwegian', 'Boeing 737-800', 'Boeing'),
(190, 'OH-PQR', 'Finnair', 'Airbus A321', 'Airbus');

-- -----------------------------------------------------
-- Inserts para a tabela Assento
-- -----------------------------------------------------
INSERT INTO Assento (Numero, Tipo, Preco, Aviao_Id) VALUES
('1A', 'Primeira Classe', 1200.00, 1),
('1B', 'Primeira Classe', 1200.00, 1),
('10C', 'Executivo', 800.00, 1),
('10D', 'Executivo', 800.00, 1),
('25F', 'Economico', 300.00, 1),
('25G', 'Economico', 300.00, 1),
('2A', 'Primeira Classe', 1500.00, 2),
('12E', 'Executivo', 900.00, 2),
('30K', 'Economico', 350.00, 2),
('3A', 'Primeira Classe', 1100.00, 3),
('15F', 'Executivo', 750.00, 3),
('28B', 'Economico', 280.00, 3),
('4A', 'Primeira Classe', 1800.00, 4),
('18C', 'Executivo', 1000.00, 4),
('35H', 'Economico', 400.00, 4),
('5A', 'Primeira Classe', 1400.00, 5),
('20D', 'Executivo', 850.00, 5),
('22E', 'Economico', 320.00, 5),
('6A', 'Primeira Classe', 1300.00, 6),
('24F', 'Economico', 290.00, 6);

-- -----------------------------------------------------
-- Inserts para a tabela Voo
-- -----------------------------------------------------
INSERT INTO Voo (CodigoVoo, DataHoraPartida, DataHoraChegada, Origem_Id, Destino_Id, Aviao_Id) VALUES
('JJ3400', '2025-07-01 10:00:00', '2025-07-01 12:00:00', 1, 4, 1),
('AD5000', '2025-07-02 14:00:00', '2025-07-02 16:00:00', 2, 5, 2),
('LA7890', '2025-07-03 09:00:00', '2025-07-03 11:00:00', 3, 6, 3),
('G31234', '2025-07-04 18:00:00', '2025-07-04 20:00:00', 4, 1, 4),
('UA9876', '2025-07-05 11:00:00', '2025-07-05 13:00:00', 5, 2, 5),
('LH5678', '2025-07-06 07:00:00', '2025-07-06 09:00:00', 6, 3, 6),
('AF4321', '2025-07-07 15:00:00', '2025-07-07 17:00:00', 7, 8, 7),
('JL1122', '2025-07-08 20:00:00', '2025-07-08 22:00:00', 8, 9, 8),
('QF3344', '2025-07-09 10:00:00', '2025-07-09 12:00:00', 9, 10, 9),
('BA5566', '2025-07-10 13:00:00', '2025-07-10 15:00:00', 10, 11, 10),
('AR7788', '2025-07-11 16:00:00', '2025-07-11 18:00:00', 11, 12, 11),
('TP9900', '2025-07-12 08:00:00', '2025-07-12 10:00:00', 12, 13, 12),
('IB1011', '2025-07-13 11:00:00', '2025-07-13 13:00:00', 13, 14, 13),
('AM2233', '2025-07-14 14:00:00', '2025-07-14 16:00:00', 14, 15, 14),
('CA4455', '2025-07-15 17:00:00', '2025-07-15 19:00:00', 15, 16, 15),
('AI6677', '2025-07-16 09:00:00', '2025-07-16 11:00:00', 16, 17, 16),
('SA8899', '2025-07-17 12:00:00', '2025-07-17 14:00:00', 17, 18, 17),
('NZ0011', '2025-07-18 15:00:00', '2025-07-18 17:00:00', 18, 19, 18),
('SK2233', '2025-07-19 18:00:00', '2025-07-19 20:00:00', 19, 20, 19),
('DY4455', '2025-07-20 21:00:00', '2025-07-20 23:00:00', 20, 1, 20);

-- -----------------------------------------------------
-- Inserts para a tabela Passagem
-- -----------------------------------------------------
INSERT INTO Passagem (Preco, Assento_Id, Voo_Id, OrdemServico_id) VALUES
(300.00, 5, 1, 1),
(350.00, 9, 2, 2),
(280.00, 12, 3, 3),
(400.00, 15, 4, 4),
(320.00, 18, 5, 5),
(290.00, 20, 6, 6),
(1200.00, 1, 7, 7),
(800.00, 3, 8, 8),
(1500.00, 7, 9, 9),
(900.00, 8, 10, 10),
(1100.00, 10, 11, 11),
(750.00, 11, 12, 12),
(1800.00, 13, 13, 13),
(1000.00, 14, 14, 14),
(1400.00, 16, 15, 15),
(850.00, 17, 16, 16),
(1300.00, 19, 17, 17),
(1200.00, 2, 18, 18),
(800.00, 4, 19, 19),
(300.00, 6, 20, 20);

-- -----------------------------------------------------
-- Inserts para a tabela Imagens
-- -----------------------------------------------------
INSERT INTO Imagens (Endereco, Nome) VALUES
('img/hotel/hotel1_quarto1.jpg', 'Quarto Hotel Paradiso 1'),
('img/hotel/hotel1_quarto2.jpg', 'Quarto Hotel Paradiso 2'),
('img/pousada/pousada1_jardim.jpg', 'Jardim Pousada Encanto'),
('img/hostel/hostel1_comum.jpg', 'Área Comum Hostel Aventura'),
('img/hotel/hotel2_suite.jpg', 'Suíte Hotel Moderno'),
('img/apartamento/apt1_sala.jpg', 'Sala Apartamento Conforto'),
('img/casa/casa1_fachada.jpg', 'Fachada Casa Colonial'),
('img/hotel/hotel3_vista.jpg', 'Vista Hotel Vista Mar'),
('img/pousada/pousada2_piscina.jpg', 'Piscina Pousada Verde'),
('img/hotel/hotel4_lobby.jpg', 'Lobby Hotel Executivo'),
('img/hostel/hostel2_cozinha.jpg', 'Cozinha Hostel Urbano'),
('img/hotel/hotel5_fachada.jpg', 'Fachada Hotel Sol Nascente'),
('img/pousada/pousada3_quarto.jpg', 'Quarto Pousada da Serra'),
('img/hotel/hotel6_restaurante.jpg', 'Restaurante Hotel Charme'),
('img/hostel/hostel3_dormitorio.jpg', 'Dormitório Hostel Praia'),
('img/hotel/hotel7_recepcao.jpg', 'Recepção Hotel Central'),
('img/pousada/pousada4_lazer.jpg', 'Área de Lazer Pousada Doce Lar'),
('img/hotel/hotel8_conferencia.jpg', 'Sala de Conferência Hotel Conexão'),
('img/hotel/hotel9_exterior.jpg', 'Exterior Luxury Suites'),
('img/hostel/hostel4_interior.jpg', 'Interior Times Square Inn');

-- -----------------------------------------------------
-- Inserts para a tabela Avaliacao
-- -----------------------------------------------------
INSERT INTO Avaliacao (Nota, Comentario, Pessoa_Id) VALUES
(5, 'Excelente serviço, muito atenciosos!', 1),
(4, 'Bom atendimento, mas poderia melhorar a estrutura.', 2),
(3, 'Experiência regular, alguns problemas de comunicação.', 3),
(5, 'Adorei a estadia, tudo impecável!', 4),
(4, 'Quarto confortável e limpo.', 5),
(2, 'Poucas opções de acessibilidade.', 6),
(5, 'Profissionais muito qualificados.', 7),
(3, 'Atendimento um pouco demorado.', 8),
(4, 'Boa relação custo-benefício.', 9),
(5, 'Recomendo a todos, perfeito!', 10),
(4, 'Limpeza impecável.', 11),
(5, 'Localização excelente.', 12),
(3, 'Café da manhã poderia ser melhor.', 13),
(5, 'Vista maravilhosa.', 14),
(4, 'Conforto garantido.', 15),
(2, 'Barulho excessivo.', 16),
(5, 'Estrutura moderna.', 17),
(4, 'Equipe prestativa.', 18),
(5, 'Ótimo para famílias.', 19),
(3, 'Wi-Fi instável.', 20);

-- -----------------------------------------------------
-- Inserts para a tabela Avaliacao_Servico
-- -----------------------------------------------------
INSERT INTO Avaliacao_Servico (Avaliacao_Id, PrestadorServico_Id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12),
(13, 13),
(14, 14),
(15, 15),
(16, 16),
(17, 17),
(18, 18),
(19, 19),
(20, 20);

-- -----------------------------------------------------
-- Inserts para a tabela Hotel_Avaliacao
-- -----------------------------------------------------
INSERT INTO Hotel_Avaliacao (Hotel_Id, Avaliacao_Id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(3, 6),
(4, 7),
(4, 8),
(5, 9),
(5, 10),
(6, 11),
(6, 12),
(7, 13),
(7, 14),
(8, 15),
(8, 16),
(9, 17),
(9, 18),
(10, 19),
(10, 20);

-- -----------------------------------------------------
-- Inserts para a tabela Imagens_Quarto
-- -----------------------------------------------------
INSERT INTO Imagens_Quarto (Imagens_Id, Quarto_Id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(5, 4),
(6, 5),
(7, 6),
(8, 7),
(9, 8),
(10, 9),
(11, 10),
(12, 11),
(13, 12),
(14, 13),
(15, 14),
(16, 15),
(17, 16),
(18, 17),
(19, 18),
(20, 19);

-- -----------------------------------------------------
-- Inserts para a tabela Imagens_Hotel
-- -----------------------------------------------------
INSERT INTO Imagens_Hotel (Imagens_Id, Hotel_Id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(5, 4),
(6, 5),
(7, 6),
(8, 7),
(9, 8),
(10, 9),
(11, 10),
(12, 11),
(13, 12),
(14, 13),
(15, 14),
(16, 15),
(17, 16),
(18, 17),
(19, 18),
(20, 19);

SET FOREIGN_KEY_CHECKS = 1;