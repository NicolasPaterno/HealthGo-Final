-- Script completo para criar e popular o banco de dados HealthGo
-- Execute este script no MySQL para criar o banco e inserir todos os dados de teste

-- =====================================================
-- 1. CRIAÇÃO DO BANCO DE DADOS
-- =====================================================

-- Criar o banco de dados se não existir
CREATE DATABASE IF NOT EXISTS `HealthGo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

-- Usar o banco de dados
USE `HealthGo`;

-- =====================================================
-- 2. CRIAÇÃO DAS TABELAS
-- =====================================================

-- Tabela Estado
CREATE TABLE IF NOT EXISTS `Estado` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(255) NOT NULL,
  `Sigla` CHAR(4) NULL,
  PRIMARY KEY (`Id`)
) ENGINE = InnoDB;

-- Tabela Cidade
CREATE TABLE IF NOT EXISTS `Cidade` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(255) NOT NULL,
  `Estado_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Cidade_Estado1_idx` (`Estado_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Cidade_Estado1`
    FOREIGN KEY (`Estado_Id`)
    REFERENCES `Estado` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela Pessoa
CREATE TABLE IF NOT EXISTS `Pessoa` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NOT NULL,
  `DataNascimento` DATE NOT NULL,
  `CPF` VARCHAR(14) NOT NULL,
  `Telefone` VARCHAR(45) NULL,
  `Email` VARCHAR(255) NOT NULL,
  `Senha` VARCHAR(255) NOT NULL,
  `EnderecoFoto` VARCHAR(255) NULL,
  `CaoGuia` TINYINT(1) NULL DEFAULT 0,
  `CEP` VARCHAR(20) NOT NULL,
  `Bairro` VARCHAR(255) NOT NULL,
  `Rua` VARCHAR(255) NOT NULL,
  `NumeroEndereco` VARCHAR(255) NOT NULL,
  `ROLE` VARCHAR(20) NOT NULL DEFAULT 'Consumidor',
  `Cidade_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Pessoa_Cidade1_idx` (`Cidade_Id` ASC) VISIBLE,
  UNIQUE INDEX `CPF_UNIQUE` (`CPF` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  CONSTRAINT `fk_Pessoa_Cidade1`
    FOREIGN KEY (`Cidade_Id`)
    REFERENCES `Cidade` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela Hotel
CREATE TABLE IF NOT EXISTS `Hotel` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `CNPJ` VARCHAR(18) NOT NULL,
  `Nome` VARCHAR(255) NOT NULL,
  `Tipo` ENUM('Casa', 'Apartamento', 'Hostel', 'Pousada', 'Hotel') NOT NULL,
  `Email` VARCHAR(150) NOT NULL,
  `Telefone` VARCHAR(45) NOT NULL,
  `Site` VARCHAR(255) NULL,
  `Acessibilidade` VARCHAR(255) NULL,
  `CEP` VARCHAR(20) NOT NULL,
  `Bairro` VARCHAR(255) NOT NULL,
  `Rua` VARCHAR(255) NOT NULL,
  `NumeroEndereco` VARCHAR(255) NOT NULL,
  `Descricao` VARCHAR(255) NULL,
  `DataInicio` DATETIME NULL,
  `Cidade_Id` INT NOT NULL,
  `Pessoa_Id` INT NOT NULL,
  `Ativo` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`Id`),
  INDEX `fk_Hotel_Cidade1_idx` (`Cidade_Id` ASC) VISIBLE,
  UNIQUE INDEX `CNPJ_UNIQUE` (`CNPJ` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  INDEX `fk_Hotel_Pessoa1_idx` (`Pessoa_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Hotel_Cidade1`
    FOREIGN KEY (`Cidade_Id`)
    REFERENCES `Cidade` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Hotel_Pessoa1`
    FOREIGN KEY (`Pessoa_Id`)
    REFERENCES `Pessoa` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela Lembrete
CREATE TABLE IF NOT EXISTS `Lembrete` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Titulo` VARCHAR(80) NOT NULL,
  `Data` DATETIME NOT NULL,
  `Tipo` ENUM('Remédio', 'Consulta', 'Outro') NOT NULL,
  `Pessoa_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Lembrete_Pessoa1_idx` (`Pessoa_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Lembrete_Pessoa1`
    FOREIGN KEY (`Pessoa_Id`)
    REFERENCES `Pessoa` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela Quarto
CREATE TABLE IF NOT EXISTS `Quarto` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Numero` VARCHAR(25) NOT NULL,
  `Andar` INT NULL,
  `AceitaAnimal` TINYINT(1) NOT NULL,
  `Observacao` VARCHAR(255) NULL,
  `Preco` DECIMAL(10,2) NOT NULL,
  `LimitePessoa` INT NOT NULL,
  `Hotel_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Quarto_Hotel1_idx` (`Hotel_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Quarto_Hotel1`
    FOREIGN KEY (`Hotel_Id`)
    REFERENCES `Hotel` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela OrdemServico
CREATE TABLE IF NOT EXISTS `OrdemServico` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `DataCriacao` DATETIME NOT NULL,
  `StatusOS` ENUM('Concluído', 'Em andamento', 'Cancelado') NULL,
  `FormaPagamento` VARCHAR(55) NULL,
  `Pessoa_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_OrdemServico_Pessoa1_idx` (`Pessoa_Id` ASC) VISIBLE,
  CONSTRAINT `fk_OrdemServico_Pessoa1`
    FOREIGN KEY (`Pessoa_Id`)
    REFERENCES `Pessoa` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela OrdemServico_Hotel
CREATE TABLE IF NOT EXISTS `OrdemServico_Hotel` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `DataEntrada` DATETIME NOT NULL,
  `DataSaida` DATETIME NOT NULL,
  `OrdemServico_Id` INT NOT NULL,
  `Hotel_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_OrdemServico_Hotel_OrdemServico1_idx` (`OrdemServico_Id` ASC) VISIBLE,
  INDEX `fk_OrdemServico_Hotel_Hotel1_idx` (`Hotel_Id` ASC) VISIBLE,
  CONSTRAINT `fk_OrdemServico_Hotel_OrdemServico1`
    FOREIGN KEY (`OrdemServico_Id`)
    REFERENCES `OrdemServico` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_OrdemServico_Hotel_Hotel1`
    FOREIGN KEY (`Hotel_Id`)
    REFERENCES `Hotel` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela PrestadorServico
CREATE TABLE IF NOT EXISTS `PrestadorServico` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Observacao` VARCHAR(255) NULL,
  `CNPJ` VARCHAR(18) NOT NULL,
  `Pessoa_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_PrestadorServico_Pessoa1_idx` (`Pessoa_Id` ASC) VISIBLE,
  CONSTRAINT `fk_PrestadorServico_Pessoa1`
    FOREIGN KEY (`Pessoa_Id`)
    REFERENCES `Pessoa` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela Especialidade
CREATE TABLE IF NOT EXISTS `Especialidade` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE = InnoDB;

-- Tabela PrestadorServico_Especialidade
CREATE TABLE IF NOT EXISTS `PrestadorServico_Especialidade` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `PrestadorServico_Id` INT NOT NULL,
  `Especialidade_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_PrestadorServico_Especialidade_PrestadorServico1_idx` (`PrestadorServico_Id` ASC) VISIBLE,
  INDEX `fk_PrestadorServico_Especialidade_Especialidade1_idx` (`Especialidade_Id` ASC) VISIBLE,
  CONSTRAINT `fk_PrestadorServico_Especialidade_PrestadorServico1`
    FOREIGN KEY (`PrestadorServico_Id`)
    REFERENCES `PrestadorServico` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PrestadorServico_Especialidade_Especialidade1`
    FOREIGN KEY (`Especialidade_Id`)
    REFERENCES `Especialidade` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela OrdemServico_PrestadorServico
CREATE TABLE IF NOT EXISTS `OrdemServico_PrestadorServico` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `DataInicio` DATETIME NOT NULL,
  `DataFim` DATETIME NOT NULL,
  `OrdemServico_Id` INT NOT NULL,
  `PrestadorServico_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_OrdemServico_PrestadorServico_OrdemServico1_idx` (`OrdemServico_Id` ASC) VISIBLE,
  INDEX `fk_OrdemServico_PrestadorServico_PrestadorServico1_idx` (`PrestadorServico_Id` ASC) VISIBLE,
  CONSTRAINT `fk_OrdemServico_PrestadorServico_OrdemServico1`
    FOREIGN KEY (`OrdemServico_Id`)
    REFERENCES `OrdemServico` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_OrdemServico_PrestadorServico_PrestadorServico1`
    FOREIGN KEY (`PrestadorServico_Id`)
    REFERENCES `PrestadorServico` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela CamaQuarto
CREATE TABLE IF NOT EXISTS `CamaQuarto` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Tipo` ENUM('Solteiro', 'Casal', 'Beliche') NOT NULL,
  `Quarto_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_CamaQuarto_Quarto1_idx` (`Quarto_Id` ASC) VISIBLE,
  CONSTRAINT `fk_CamaQuarto_Quarto1`
    FOREIGN KEY (`Quarto_Id`)
    REFERENCES `Quarto` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela Aeroporto
CREATE TABLE IF NOT EXISTS `Aeroporto` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(255) NOT NULL,
  `Sigla` VARCHAR(10) NOT NULL,
  `Cidade_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Aeroporto_Cidade1_idx` (`Cidade_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Aeroporto_Cidade1`
    FOREIGN KEY (`Cidade_Id`)
    REFERENCES `Cidade` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela Aviao
CREATE TABLE IF NOT EXISTS `Aviao` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Modelo` VARCHAR(255) NOT NULL,
  `Capacidade` INT NOT NULL,
  `Aeroporto_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Aviao_Aeroporto1_idx` (`Aeroporto_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Aviao_Aeroporto1`
    FOREIGN KEY (`Aeroporto_Id`)
    REFERENCES `Aeroporto` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela Assento
CREATE TABLE IF NOT EXISTS `Assento` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Numero` VARCHAR(10) NOT NULL,
  `Classe` ENUM('Primeira Classe', 'Executiva', 'Econômica') NOT NULL,
  `Aviao_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Assento_Aviao1_idx` (`Aviao_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Assento_Aviao1`
    FOREIGN KEY (`Aviao_Id`)
    REFERENCES `Aviao` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela Voo
CREATE TABLE IF NOT EXISTS `Voo` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `NumeroVoo` VARCHAR(20) NOT NULL,
  `DataPartida` DATETIME NOT NULL,
  `DataChegada` DATETIME NOT NULL,
  `AeroportoOrigem_Id` INT NOT NULL,
  `AeroportoDestino_Id` INT NOT NULL,
  `Aviao_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Voo_Aeroporto1_idx` (`AeroportoOrigem_Id` ASC) VISIBLE,
  INDEX `fk_Voo_Aeroporto2_idx` (`AeroportoDestino_Id` ASC) VISIBLE,
  INDEX `fk_Voo_Aviao1_idx` (`Aviao_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Voo_Aeroporto1`
    FOREIGN KEY (`AeroportoOrigem_Id`)
    REFERENCES `Aeroporto` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Voo_Aeroporto2`
    FOREIGN KEY (`AeroportoDestino_Id`)
    REFERENCES `Aeroporto` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Voo_Aviao1`
    FOREIGN KEY (`Aviao_Id`)
    REFERENCES `Aviao` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela Passagem
CREATE TABLE IF NOT EXISTS `Passagem` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Preco` DECIMAL(10,2) NOT NULL,
  `Classe` ENUM('Primeira Classe', 'Executiva', 'Econômica') NOT NULL,
  `Voo_Id` INT NOT NULL,
  `Pessoa_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Passagem_Voo1_idx` (`Voo_Id` ASC) VISIBLE,
  INDEX `fk_Passagem_Pessoa1_idx` (`Pessoa_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Passagem_Voo1`
    FOREIGN KEY (`Voo_Id`)
    REFERENCES `Voo` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Passagem_Pessoa1`
    FOREIGN KEY (`Pessoa_Id`)
    REFERENCES `Pessoa` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela Imagem
CREATE TABLE IF NOT EXISTS `Imagem` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Url` VARCHAR(255) NOT NULL,
  `Descricao` VARCHAR(255) NULL,
  PRIMARY KEY (`Id`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HealthGo`.`TokenRecuperacaoSenha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HealthGo`.`TokenRecuperacaoSenha` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Token` VARCHAR(255) NOT NULL,
  `DataExpiracao` DATETIME NOT NULL,
  `Pessoa_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_TokenRecuperacaoSenha_Pessoa1_idx` (`Pessoa_Id` ASC) VISIBLE,
  CONSTRAINT `fk_TokenRecuperacaoSenha_Pessoa1`
    FOREIGN KEY (`Pessoa_Id`)
    REFERENCES `HealthGo`.`Pessoa` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- =====================================================
-- 3. INSERÇÃO DE DADOS BÁSICOS
-- =====================================================

-- Estados
INSERT INTO Estado (Id, Nome, Sigla) VALUES
(1, 'Acre', 'AC'),
(2, 'Alagoas', 'AL'),
(3, 'Amapá', 'AP'),
(4, 'Amazonas', 'AM'),
(5, 'Bahia', 'BA'),
(6, 'Ceará', 'CE'),
(7, 'Distrito Federal', 'DF'),
(8, 'Espírito Santo', 'ES'),
(9, 'Goiás', 'GO'),
(10, 'Maranhão', 'MA'),
(11, 'Mato Grosso', 'MT'),
(12, 'Mato Grosso do Sul', 'MS'),
(13, 'Minas Gerais', 'MG'),
(14, 'Pará', 'PA'),
(15, 'Paraíba', 'PB'),
(16, 'Paraná', 'PR'),
(17, 'Pernambuco', 'PE'),
(18, 'Piauí', 'PI'),
(19, 'Rio de Janeiro', 'RJ'),
(20, 'Rio Grande do Norte', 'RN'),
(21, 'Rio Grande do Sul', 'RS'),
(22, 'Rondônia', 'RO'),
(23, 'Roraima', 'RR'),
(24, 'Santa Catarina', 'SC'),
(25, 'São Paulo', 'SP'),
(26, 'Sergipe', 'SE'),
(27, 'Tocantins', 'TO');

-- Cidades principais
INSERT INTO Cidade (Id, Nome, Estado_Id) VALUES
(1, 'Rio Branco', 1),
(2, 'Maceió', 2),
(3, 'Macapá', 3),
(4, 'Manaus', 4),
(5, 'Salvador', 5),
(6, 'Fortaleza', 6),
(7, 'Brasília', 7),
(8, 'Vitória', 8),
(9, 'Goiânia', 9),
(10, 'São Luís', 10),
(11, 'Cuiabá', 11),
(12, 'Campo Grande', 12),
(13, 'Belo Horizonte', 13),
(14, 'Belém', 14),
(15, 'João Pessoa', 15),
(16, 'Curitiba', 16),
(17, 'Recife', 17),
(18, 'Teresina', 18),
(19, 'Rio de Janeiro', 19),
(20, 'Natal', 20),
(21, 'Porto Alegre', 21),
(22, 'Porto Velho', 22),
(23, 'Boa Vista', 23),
(24, 'Florianópolis', 24),
(25, 'São Paulo', 25),
(26, 'Aracaju', 26),
(27, 'Palmas', 27),
(61, 'Blumenau', 24),
(62, 'Joinville', 24),
(63, 'Itajaí', 24);

-- =====================================================
-- 4. INSERÇÃO DE USUÁRIOS PRINCIPAIS
-- =====================================================

-- Usuário Admin (Role = Gerente = 1)
-- Senha: Admin123. (criptografada com bcrypt)
INSERT INTO Pessoa (Id, Nome, DataNascimento, CPF, Telefone, Email, Senha, EnderecoFoto, CaoGuia, CEP, Bairro, Rua, NumeroEndereco, ROLE, Cidade_Id) VALUES
(1, 'Administrador', '1980-01-01', '000.000.000-00', '(47) 99999-9999', 'admin@gmail.com', '$2a$10$5lfCjiHjvjbYuja8vZqG4e2BIA1M2oPF3KWPi1YPdW9a3VvnX7sNu', 'https://via.placeholder.com/150', 0, '89010-000', 'Centro', 'Rua das Palmeiras', '123', 'Gerente', 61);

-- Usuário User (Role = Consumidor = 0)
-- Senha: User123. (criptografada com bcrypt)
INSERT INTO Pessoa (Id, Nome, DataNascimento, CPF, Telefone, Email, Senha, EnderecoFoto, CaoGuia, CEP, Bairro, Rua, NumeroEndereco, ROLE, Cidade_Id) VALUES
(2, 'Usuário Teste', '1990-01-01', '111.111.111-11', '(47) 88888-8888', 'user@gmail.com', '$2a$10$/Xja513hl0RPjToTVpxeNeVhpOITrWB6qwZ5xMDuh.FOfbssSO5FO', 'https://via.placeholder.com/150', 0, '89020-000', 'Vila Nova', 'Rua das Flores', '456', 'Consumidor', 61);

-- =====================================================
-- 5. INSERÇÃO DE HOTÉIS DE TESTE
-- =====================================================

-- Hotéis do Admin (Pessoa_id = 1)
INSERT INTO Hotel (CNPJ, Nome, Tipo, Email, Telefone, Site, Acessibilidade, CEP, Bairro, Rua, NumeroEndereco, Descricao, DataInicio, Cidade_Id, Pessoa_id, Ativo) VALUES
-- Hotel no Centro de Blumenau
('12.345.678/0001-01', 'Hotel Central Blumenau', 'Hotel', 'contato@hotelcentral.com', '(47) 3333-1111', 'https://hotelcentral.com', 'Rampas de acesso, elevadores', '89010-000', 'Centro', 'Rua XV de Novembro', '100', 'Hotel localizado no coração de Blumenau, próximo ao centro comercial', NOW(), 61, 1, 1),

-- Hotel na Itoupava Seca
('12.345.678/0001-02', 'Pousada Itoupava', 'Pousada', 'contato@pousadaitoupava.com', '(47) 3333-2222', 'https://pousadaitoupava.com', 'Quartos adaptados', '89030-000', 'Itoupava Seca', 'Rua da Paz', '250', 'Pousada familiar em ambiente tranquilo', NOW(), 61, 1, 1),

-- Hotel na Itoupava Central
('12.345.678/0001-03', 'Residencial Itoupava Central', 'Apartamento', 'contato@residencialitoupava.com', '(47) 3333-3333', 'https://residencialitoupava.com', 'Acessibilidade completa', '89030-100', 'Itoupava Central', 'Rua das Flores', '500', 'Residencial com apartamentos mobiliados', NOW(), 61, 1, 1),

-- Hotel na Itoupava Norte
('12.345.678/0001-04', 'Hostel Itoupava Norte', 'Hostel', 'contato@hostelitoupava.com', '(47) 3333-4444', 'https://hostelitoupava.com', 'Quartos compartilhados acessíveis', '89030-200', 'Itoupava Norte', 'Rua do Progresso', '750', 'Hostel para mochileiros e viajantes', NOW(), 61, 1, 1),

-- Casa de temporada
('12.345.678/0001-05', 'Casa Temporada Blumenau', 'Casa', 'contato@casatemporada.com', '(47) 3333-5555', 'https://casatemporada.com', 'Casa térrea com rampas', '89030-300', 'Itoupava Seca', 'Rua da Harmonia', '1000', 'Casa completa para temporada', NOW(), 61, 1, 1);

-- =====================================================
-- 6. INSERÇÃO DE QUARTOS
-- =====================================================

-- Quartos para Hotel Central Blumenau
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('101', 1, 0, 'Quarto padrão com vista para a rua', 150.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Central Blumenau')),
('102', 1, 0, 'Quarto padrão com vista para a rua', 150.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Central Blumenau')),
('201', 2, 1, 'Quarto superior com vista panorâmica', 200.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Central Blumenau')),
('202', 2, 0, 'Quarto superior com vista panorâmica', 200.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Central Blumenau')),
('301', 3, 0, 'Suíte executiva', 300.00, 4, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Central Blumenau')),

-- Quartos para Pousada Itoupava
('1', 1, 1, 'Quarto familiar com varanda', 120.00, 4, (SELECT Id FROM Hotel WHERE Nome = 'Pousada Itoupava')),
('2', 1, 0, 'Quarto casal com vista para o jardim', 100.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Pousada Itoupava')),
('3', 1, 1, 'Quarto triplo', 140.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Pousada Itoupava')),

-- Quartos para Residencial Itoupava Central
('A101', 1, 0, 'Apartamento 1 quarto mobiliado', 180.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Residencial Itoupava Central')),
('A102', 1, 0, 'Apartamento 1 quarto mobiliado', 180.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Residencial Itoupava Central')),
('B201', 2, 0, 'Apartamento 2 quartos mobiliado', 250.00, 4, (SELECT Id FROM Hotel WHERE Nome = 'Residencial Itoupava Central')),
('B202', 2, 0, 'Apartamento 2 quartos mobiliado', 250.00, 4, (SELECT Id FROM Hotel WHERE Nome = 'Residencial Itoupava Central')),

-- Quartos para Hostel Itoupava Norte
('Dorm1', 1, 0, 'Dormitório feminino - 6 camas', 50.00, 6, (SELECT Id FROM Hotel WHERE Nome = 'Hostel Itoupava Norte')),
('Dorm2', 1, 0, 'Dormitório masculino - 6 camas', 50.00, 6, (SELECT Id FROM Hotel WHERE Nome = 'Hostel Itoupava Norte')),
('Priv1', 1, 0, 'Quarto privativo simples', 80.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hostel Itoupava Norte')),

-- Quartos para Casa Temporada Blumenau
('Casa', 1, 1, 'Casa completa com 3 quartos', 400.00, 8, (SELECT Id FROM Hotel WHERE Nome = 'Casa Temporada Blumenau'));

-- =====================================================
-- 7. INSERÇÃO DE LEMBRETES
-- =====================================================

INSERT INTO Lembrete (Titulo, Data, Tipo, Pessoa_Id) VALUES
('Consulta Médica', '2025-07-10 10:00:00', 'Consulta', 1),
('Reunião de Trabalho', '2025-07-15 14:00:00', 'Outro', 1),
('Pagar Contas', '2025-07-05 09:00:00', 'Outro', 2),
('Aniversário da Vó', '2025-08-20 18:00:00', 'Outro', 2),
('Academia', '2025-07-01 07:00:00', 'Outro', 1);

-- =====================================================
-- 8. INSERÇÃO DE ESPECIALIDADES
-- =====================================================

INSERT INTO Especialidade (Nome) VALUES
('Assistente Pessoal'),
('Cuidador de Idosos'),
('Enfermeiro'),
('Fisioterapeuta'),
('Psicólogo'),
('Nutricionista'),
('Terapeuta Ocupacional'),
('Fonoaudiólogo');

-- =====================================================
-- 9. INSERÇÃO DE PRESTADORES DE SERVIÇO
-- =====================================================

INSERT INTO PrestadorServico (Observacao, CNPJ, Pessoa_Id) VALUES
('Especialista em cuidados com idosos', '98.765.432/0001-01', 1),
('Cuidador experiente', '98.765.432/0001-02', 2);

-- =====================================================
-- 10. INSERÇÃO DE AEROPORTOS
-- =====================================================

INSERT INTO Aeroporto (Nome, Sigla, Cidade_Id) VALUES
('Aeroporto Internacional de Blumenau', 'BNU', 61),
('Aeroporto Internacional de Joinville', 'JOI', 62),
('Aeroporto Internacional de Navegantes', 'NVT', 63);

-- =====================================================
-- 11. INSERÇÃO DE AVIÕES
-- =====================================================

INSERT INTO Aviao (Modelo, Capacidade, Aeroporto_Id) VALUES
('Boeing 737', 180, 1),
('Airbus A320', 150, 1),
('Embraer E190', 100, 2);

-- =====================================================
-- 12. INSERÇÃO DE ASSENTOS
-- =====================================================

INSERT INTO Assento (Numero, Classe, Aviao_Id) VALUES
('1A', 'Primeira Classe', 1),
('1B', 'Primeira Classe', 1),
('2A', 'Executiva', 1),
('2B', 'Executiva', 1),
('3A', 'Econômica', 1),
('3B', 'Econômica', 1);

-- =====================================================
-- 13. INSERÇÃO DE VOOS
-- =====================================================

INSERT INTO Voo (NumeroVoo, DataPartida, DataChegada, AeroportoOrigem_Id, AeroportoDestino_Id, Aviao_Id) VALUES
('LA1234', '2025-07-15 10:00:00', '2025-07-15 11:30:00', 1, 2, 1),
('LA5678', '2025-07-16 14:00:00', '2025-07-16 15:30:00', 2, 1, 2);

-- =====================================================
-- 14. INSERÇÃO DE PASSAGENS
-- =====================================================

INSERT INTO Passagem (Preco, Classe, Voo_Id, Pessoa_Id) VALUES
(500.00, 'Econômica', 1, 2),
(800.00, 'Executiva', 2, 1);

-- =====================================================
-- 15. INSERÇÃO DE ORDENS DE SERVIÇO
-- =====================================================

INSERT INTO OrdemServico (DataCriacao, StatusOS, Pessoa_Id) VALUES
('2025-07-01 09:00:00', 'Em andamento', 1),
('2025-07-02 10:00:00', 'Concluído', 2);

-- =====================================================
-- 16. VERIFICAÇÃO DOS DADOS INSERIDOS
-- =====================================================

-- Verificar usuários criados
SELECT 
    'Usuários Criados' as Tipo,
    Id,
    Nome,
    Email,
    ROLE,
    Cidade_Id
FROM Pessoa 
WHERE Id IN (1, 2);

-- Verificar hotéis criados
SELECT 
    'Hotéis Criados' as Tipo,
    h.Id as HotelId,
    h.Nome as HotelNome,
    h.Bairro,
    h.Rua,
    h.NumeroEndereco,
    h.CEP,
    c.Nome as Cidade,
    e.Sigla as Estado,
    h.Ativo,
    COUNT(q.Id) as TotalQuartos
FROM Hotel h
JOIN Cidade c ON h.Cidade_Id = c.Id
JOIN Estado e ON c.Estado_Id = e.Id
LEFT JOIN Quarto q ON h.Id = q.Hotel_Id
WHERE h.Pessoa_id = 1
GROUP BY h.Id, h.Nome, h.Bairro, h.Rua, h.NumeroEndereco, h.CEP, c.Nome, e.Sigla, h.Ativo;

-- Verificar quartos criados
SELECT 
    'Quartos Criados' as Tipo,
    q.Id as QuartoId,
    q.Numero,
    q.Preco,
    q.LimitePessoa,
    q.AceitaAnimal,
    h.Nome as HotelNome,
    h.Bairro
FROM Quarto q
JOIN Hotel h ON q.Hotel_Id = h.Id
WHERE h.Pessoa_id = 1
ORDER BY h.Nome, q.Numero;

-- Verificar outras entidades
SELECT 'Lembretes' as Tipo, COUNT(*) as Total FROM Lembrete;
SELECT 'Especialidades' as Tipo, COUNT(*) as Total FROM Especialidade;
SELECT 'Prestadores de Serviço' as Tipo, COUNT(*) as Total FROM PrestadorServico;
SELECT 'Aeroportos' as Tipo, COUNT(*) as Total FROM Aeroporto;
SELECT 'Aviões' as Tipo, COUNT(*) as Total FROM Aviao;
SELECT 'Voos' as Tipo, COUNT(*) as Total FROM Voo;
SELECT 'Passagens' as Tipo, COUNT(*) as Total FROM Passagem;
SELECT 'Ordens de Serviço' as Tipo, COUNT(*) as Total FROM OrdemServico;

-- =====================================================
-- 17. INFORMAÇÕES DE LOGIN
-- =====================================================

SELECT 
    'INFORMAÇÕES DE LOGIN' as Info,
    '' as Detalhes
UNION ALL
SELECT 
    'Admin' as Info,
    'Email: admin@gmail.com | Senha: Admin123. | Role: Gerente' as Detalhes
UNION ALL
SELECT 
    'User' as Info,
    'Email: user@gmail.com | Senha: User123. | Role: Consumidor' as Detalhes;

-- =====================================================
-- 18. MENSAGEM DE SUCESSO
-- =====================================================

SELECT 
    'BANCO DE DADOS CRIADO COM SUCESSO!' as Status,
    'O banco HealthGo foi criado e populado com dados de teste.' as Mensagem
UNION ALL
SELECT 
    'PRÓXIMOS PASSOS:' as Status,
    '1. Configure a string de conexão no appsettings.json' as Mensagem;
UNION ALL
SELECT 
    '' as Status,
    '2. Execute o projeto backend (.NET)' as Mensagem
UNION ALL
SELECT 
    '' as Status,
    '3. Execute o projeto frontend (React)' as Mensagem
UNION ALL
SELECT 
    '' as Status,
    '4. Faça login com admin@gmail.com / Admin123.' as Mensagem;
