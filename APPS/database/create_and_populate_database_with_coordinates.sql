-- Script completo para criar e popular o banco de dados HealthGo COM COORDENADAS
-- Execute este script no MySQL para criar o banco e inserir todos os dados de teste
-- Inclui coordenadas geográficas para hotéis de Blumenau e Rio do Sul

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

-- Tabela Hotel (ATUALIZADA COM COORDENADAS)
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
  `Latitude` DECIMAL(10, 8) NULL COMMENT 'Latitude do hotel',
  `Longitude` DECIMAL(11, 8) NULL COMMENT 'Longitude do hotel',
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
  `DataServico` DATETIME NOT NULL,
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

-- Tabela Avaliacao
CREATE TABLE IF NOT EXISTS `Avaliacao` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nota` INT NOT NULL,
  `Comentario` VARCHAR(255) NULL,
  `DataAvaliacao` DATETIME NOT NULL,
  `Pessoa_Id` INT NOT NULL,
  `Hotel_Id` INT NULL,
  `PrestadorServico_Id` INT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Avaliacao_Pessoa1_idx` (`Pessoa_Id` ASC) VISIBLE,
  INDEX `fk_Avaliacao_Hotel1_idx` (`Hotel_Id` ASC) VISIBLE,
  INDEX `fk_Avaliacao_PrestadorServico1_idx` (`PrestadorServico_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Avaliacao_Pessoa1`
    FOREIGN KEY (`Pessoa_Id`)
    REFERENCES `Pessoa` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Avaliacao_Hotel1`
    FOREIGN KEY (`Hotel_Id`)
    REFERENCES `Hotel` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Avaliacao_PrestadorServico1`
    FOREIGN KEY (`PrestadorServico_Id`)
    REFERENCES `PrestadorServico` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela Imagem
CREATE TABLE IF NOT EXISTS `Imagem` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Url` VARCHAR(255) NOT NULL,
  `Descricao` VARCHAR(255) NULL,
  `Hotel_Id` INT NULL,
  `Pessoa_Id` INT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Imagem_Hotel1_idx` (`Hotel_Id` ASC) VISIBLE,
  INDEX `fk_Imagem_Pessoa1_idx` (`Pessoa_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Imagem_Hotel1`
    FOREIGN KEY (`Hotel_Id`)
    REFERENCES `Hotel` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Imagem_Pessoa1`
    FOREIGN KEY (`Pessoa_Id`)
    REFERENCES `Pessoa` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela CamaQuarto
CREATE TABLE IF NOT EXISTS `CamaQuarto` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Tipo` ENUM('Solteiro', 'Casal', 'Beliche') NOT NULL,
  `Quantidade` INT NOT NULL,
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
  `Codigo` VARCHAR(10) NOT NULL,
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
  `Companhia` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE = InnoDB;

-- Tabela Voo
CREATE TABLE IF NOT EXISTS `Voo` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Numero` VARCHAR(20) NOT NULL,
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
  `Classe` ENUM('Econômica', 'Executiva', 'Primeira') NOT NULL,
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

-- Tabela TokenRecuperacaoSenha
CREATE TABLE IF NOT EXISTS `TokenRecuperacaoSenha` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Token` VARCHAR(255) NOT NULL,
  `DataExpiracao` DATETIME NOT NULL,
  `Pessoa_Id` INT NOT NULL,
  `Utilizado` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Id`),
  INDEX `fk_TokenRecuperacaoSenha_Pessoa1_idx` (`Pessoa_Id` ASC) VISIBLE,
  CONSTRAINT `fk_TokenRecuperacaoSenha_Pessoa1`
    FOREIGN KEY (`Pessoa_Id`)
    REFERENCES `Pessoa` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- =====================================================
-- 3. INSERÇÃO DE DADOS BÁSICOS
-- =====================================================

-- Estados brasileiros
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

-- Cidades principais (incluindo Blumenau e Rio do Sul)
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
(63, 'Itajaí', 24),
(64, 'Rio do Sul', 24);

-- =====================================================
-- 4. INSERÇÃO DE USUÁRIOS PRINCIPAIS (SENHAS CRIPTOGRAFADAS)
-- =====================================================

-- Usuário Admin (Role = Gerente)
-- Senha: Admin123. (criptografada com bcrypt)
INSERT INTO Pessoa (Id, Nome, DataNascimento, CPF, Telefone, Email, Senha, EnderecoFoto, CaoGuia, CEP, Bairro, Rua, NumeroEndereco, ROLE, Cidade_Id) VALUES
(1, 'Administrador', '1980-01-01', '000.000.000-00', '(47) 99999-9999', 'admin@gmail.com', '$2a$10$5lfCjiHjvjbYuja8vZqG4e2BIA1M2oPF3KWPi1YPdW9a3VvnX7sNu', 'https://via.placeholder.com/150', 0, '89010-000', 'Centro', 'Rua das Palmeiras', '123', 'Gerente', 61);

-- Usuário User (Role = Consumidor)
-- Senha: User123. (criptografada com bcrypt)
INSERT INTO Pessoa (Id, Nome, DataNascimento, CPF, Telefone, Email, Senha, EnderecoFoto, CaoGuia, CEP, Bairro, Rua, NumeroEndereco, ROLE, Cidade_Id) VALUES
(2, 'Usuário Teste', '1990-01-01', '111.111.111-11', '(47) 88888-8888', 'user@gmail.com', '$2a$10$/Xja513hl0RPjToTVpxeNeVhpOITrWB6qwZ5xMDuh.FOfbssSO5FO', 'https://via.placeholder.com/150', 0, '89020-000', 'Vila Nova', 'Rua das Flores', '456', 'Consumidor', 61);

-- =====================================================
-- 5. INSERÇÃO DE HOTÉIS COM COORDENADAS REAIS
-- =====================================================

-- Hotéis de Blumenau (coordenadas reais)
INSERT INTO Hotel (CNPJ, Nome, Tipo, Email, Telefone, Site, Acessibilidade, CEP, Bairro, Rua, NumeroEndereco, Descricao, DataInicio, Cidade_Id, Pessoa_id, Ativo, Latitude, Longitude) VALUES
-- Hotel no Centro de Blumenau (Rua XV de Novembro)
('12.345.678/0001-01', 'Hotel Central Blumenau', 'Hotel', 'contato@hotelcentral.com', '(47) 3333-1111', 'https://hotelcentral.com', 'Rampas de acesso, elevadores', '89010-000', 'Centro', 'Rua XV de Novembro', '100', 'Hotel localizado no coração de Blumenau, próximo ao centro comercial', NOW(), 61, 1, 1, -26.9189, -49.0661),

-- Hotel na Itoupava Seca
('12.345.678/0001-02', 'Pousada Itoupava', 'Pousada', 'contato@pousadaitoupava.com', '(47) 3333-2222', 'https://pousadaitoupava.com', 'Quartos adaptados', '89030-000', 'Itoupava Seca', 'Rua da Paz', '250', 'Pousada familiar em ambiente tranquilo', NOW(), 61, 1, 1, -26.9250, -49.0750),

-- Hotel na Itoupava Central
('12.345.678/0001-03', 'Residencial Itoupava Central', 'Apartamento', 'contato@residencialitoupava.com', '(47) 3333-3333', 'https://residencialitoupava.com', 'Acessibilidade completa', '89030-100', 'Itoupava Central', 'Rua das Flores', '500', 'Residencial com apartamentos mobiliados', NOW(), 61, 1, 1, -26.9300, -49.0800),

-- Hotel na Itoupava Norte
('12.345.678/0001-04', 'Hostel Itoupava Norte', 'Hostel', 'contato@hostelitoupava.com', '(47) 3333-4444', 'https://hostelitoupava.com', 'Quartos compartilhados acessíveis', '89030-200', 'Itoupava Norte', 'Rua do Progresso', '750', 'Hostel para mochileiros e viajantes', NOW(), 61, 1, 1, -26.9350, -49.0850),

-- Casa de temporada
('12.345.678/0001-05', 'Casa Temporada Blumenau', 'Casa', 'contato@casatemporada.com', '(47) 3333-5555', 'https://casatemporada.com', 'Casa térrea com rampas', '89030-300', 'Itoupava Seca', 'Rua da Harmonia', '1000', 'Casa completa para temporada', NOW(), 61, 1, 1, -26.9200, -49.0700),

-- Hotel no Garcia (bairro histórico)
('12.345.678/0001-06', 'Hotel Garcia Heritage', 'Hotel', 'contato@hotelgarcia.com', '(47) 3333-6666', 'https://hotelgarcia.com', 'Hotel histórico com acessibilidade', '89025-000', 'Garcia', 'Rua das Palmeiras', '200', 'Hotel histórico no bairro Garcia', NOW(), 61, 1, 1, -26.9150, -49.0600),

-- Hotel no Vorstadt
('12.345.678/0001-07', 'Pousada Vorstadt', 'Pousada', 'contato@pousadavorstadt.com', '(47) 3333-7777', 'https://pousadavorstadt.com', 'Pousada familiar acessível', '89015-000', 'Vorstadt', 'Rua do Comércio', '300', 'Pousada no bairro Vorstadt', NOW(), 61, 1, 1, -26.9100, -49.0550);

-- Hotéis de Rio do Sul (coordenadas reais)
INSERT INTO Hotel (CNPJ, Nome, Tipo, Email, Telefone, Site, Acessibilidade, CEP, Bairro, Rua, NumeroEndereco, Descricao, DataInicio, Cidade_Id, Pessoa_id, Ativo, Latitude, Longitude) VALUES
-- Hotel no Centro de Rio do Sul
('12.345.678/0001-08', 'Hotel Rio do Sul Centro', 'Hotel', 'contato@hotelriodosul.com', '(47) 3333-8888', 'https://hotelriodosul.com', 'Hotel completo com acessibilidade', '89160-000', 'Centro', 'Rua do Comércio', '150', 'Hotel no centro de Rio do Sul', NOW(), 64, 1, 1, -27.2150, -49.6430),

-- Pousada na Barra do Trombudo
('12.345.678/0001-09', 'Pousada Barra do Trombudo', 'Pousada', 'contato@pousadabarra.com', '(47) 3333-9999', 'https://pousadabarra.com', 'Pousada familiar', '89160-100', 'Barra do Trombudo', 'Rua da Barra', '250', 'Pousada na Barra do Trombudo', NOW(), 64, 1, 1, -27.2200, -49.6480),

-- Hotel no Bairro Canta Galo
('12.345.678/0001-10', 'Hotel Canta Galo', 'Hotel', 'contato@hotelcantagalo.com', '(47) 3333-0000', 'https://hotelcantagalo.com', 'Hotel executivo', '89160-200', 'Canta Galo', 'Rua do Progresso', '350', 'Hotel executivo no bairro Canta Galo', NOW(), 64, 1, 1, -27.2250, -49.6530);

-- =====================================================
-- 6. INSERÇÃO DE QUARTOS
-- =====================================================

-- Quartos para Hotel Central Blumenau
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('101', 1, 0, 'Quarto padrão com vista para a rua', 150.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Central Blumenau')),
('102', 1, 0, 'Quarto padrão com vista para a rua', 150.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Central Blumenau')),
('201', 2, 1, 'Quarto superior com vista panorâmica', 200.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Central Blumenau')),
('202', 2, 0, 'Quarto superior com vista panorâmica', 200.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Central Blumenau')),
('301', 3, 0, 'Suíte executiva', 300.00, 4, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Central Blumenau'));

-- Quartos para Pousada Itoupava
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('1', 1, 1, 'Quarto familiar com varanda', 120.00, 4, (SELECT Id FROM Hotel WHERE Nome = 'Pousada Itoupava')),
('2', 1, 0, 'Quarto casal com vista para o jardim', 100.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Pousada Itoupava')),
('3', 1, 1, 'Quarto triplo', 140.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Pousada Itoupava'));

-- Quartos para Residencial Itoupava Central
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('A101', 1, 0, 'Apartamento 1 quarto mobiliado', 180.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Residencial Itoupava Central')),
('A102', 1, 0, 'Apartamento 1 quarto mobiliado', 180.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Residencial Itoupava Central')),
('A201', 2, 0, 'Apartamento 2 quartos mobiliado', 220.00, 4, (SELECT Id FROM Hotel WHERE Nome = 'Residencial Itoupava Central'));

-- Quartos para Hostel Itoupava Norte
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('Dorm1', 1, 1, 'Dormitório feminino (6 camas)', 60.00, 6, (SELECT Id FROM Hotel WHERE Nome = 'Hostel Itoupava Norte')),
('Dorm2', 1, 1, 'Dormitório masculino (6 camas)', 60.00, 6, (SELECT Id FROM Hotel WHERE Nome = 'Hostel Itoupava Norte')),
('Priv1', 2, 0, 'Quarto privativo casal', 120.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hostel Itoupava Norte'));

-- Quartos para Casa Temporada Blumenau
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('Casa', 1, 1, 'Casa completa com 3 quartos', 300.00, 8, (SELECT Id FROM Hotel WHERE Nome = 'Casa Temporada Blumenau'));

-- Quartos para Hotel Garcia Heritage
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('101', 1, 0, 'Quarto histórico', 180.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Garcia Heritage')),
('201', 2, 0, 'Suíte histórica', 250.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Garcia Heritage'));

-- Quartos para Pousada Vorstadt
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('1', 1, 1, 'Quarto familiar', 110.00, 4, (SELECT Id FROM Hotel WHERE Nome = 'Pousada Vorstadt')),
('2', 1, 0, 'Quarto casal', 90.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Pousada Vorstadt'));

-- Quartos para Hotel Rio do Sul Centro
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('101', 1, 0, 'Quarto padrão', 130.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Rio do Sul Centro')),
('201', 2, 0, 'Quarto superior', 160.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Rio do Sul Centro')),
('301', 3, 0, 'Suíte', 220.00, 4, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Rio do Sul Centro'));

-- Quartos para Pousada Barra do Trombudo
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('1', 1, 1, 'Quarto familiar', 100.00, 4, (SELECT Id FROM Hotel WHERE Nome = 'Pousada Barra do Trombudo')),
('2', 1, 0, 'Quarto casal', 80.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Pousada Barra do Trombudo'));

-- Quartos para Hotel Canta Galo
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('101', 1, 0, 'Quarto executivo', 140.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Canta Galo')),
('201', 2, 0, 'Suíte executiva', 200.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Canta Galo'));

-- =====================================================
-- 7. INSERÇÃO DE DADOS ADICIONAIS
-- =====================================================

-- Especialidades médicas
INSERT INTO Especialidade (Id, Nome) VALUES
(1, 'Cardiologia'),
(2, 'Neurologia'),
(3, 'Ortopedia'),
(4, 'Pediatria'),
(5, 'Ginecologia'),
(6, 'Dermatologia'),
(7, 'Psicologia'),
(8, 'Fisioterapia');

-- Prestadores de serviço
INSERT INTO PrestadorServico (Id, Observacao, CNPJ, Pessoa_Id) VALUES
(1, 'Médico cardiologista com 15 anos de experiência', '98.765.432/0001-01', 1),
(2, 'Psicóloga especializada em terapia cognitivo-comportamental', '98.765.432/0001-02', 2);

-- Relacionamento Prestador-Especialidade
INSERT INTO PrestadorServico_Especialidade (PrestadorServico_Id, Especialidade_Id) VALUES
(1, 1), -- Cardiologista
(2, 7); -- Psicóloga

-- Lembretes de exemplo
INSERT INTO Lembrete (Id, Titulo, Data, Tipo, Pessoa_Id) VALUES
(1, 'Consulta Cardiologista', '2024-02-15 14:00:00', 'Consulta', 2),
(2, 'Tomar Remédio', '2024-02-10 08:00:00', 'Remédio', 2),
(3, 'Exame de Sangue', '2024-02-20 09:00:00', 'Outro', 2);

-- Aeroportos
INSERT INTO Aeroporto (Id, Nome, Codigo, Cidade_Id) VALUES
(1, 'Aeroporto Internacional de Florianópolis', 'FLN', 24),
(2, 'Aeroporto de Navegantes', 'NVT', 63),
(3, 'Aeroporto de Blumenau', 'BNU', 61);

-- Aviões
INSERT INTO Aviao (Id, Modelo, Capacidade, Companhia) VALUES
(1, 'Boeing 737-800', 189, 'LATAM'),
(2, 'Airbus A320', 180, 'GOL'),
(3, 'Embraer E195', 118, 'Azul');

-- Voos
INSERT INTO Voo (Id, Numero, DataPartida, DataChegada, AeroportoOrigem_Id, AeroportoDestino_Id, Aviao_Id) VALUES
(1, 'LA1234', '2024-02-15 10:00:00', '2024-02-15 11:30:00', 1, 2, 1),
(2, 'G31000', '2024-02-16 14:00:00', '2024-02-16 15:30:00', 2, 1, 2);

-- Passagens
INSERT INTO Passagem (Id, Preco, Classe, Voo_Id, Pessoa_Id) VALUES
(1, 250.00, 'Econômica', 1, 2),
(2, 350.00, 'Executiva', 2, 2);

-- Avaliações
INSERT INTO Avaliacao (Id, Nota, Comentario, DataAvaliacao, Pessoa_Id, Hotel_Id) VALUES
(1, 5, 'Excelente hotel, muito bem localizado!', '2024-02-01 10:00:00', 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Central Blumenau')),
(2, 4, 'Pousada muito acolhedora, recomendo!', '2024-02-02 15:00:00', 2, (SELECT Id FROM Hotel WHERE Nome = 'Pousada Itoupava'));

-- Imagens
INSERT INTO Imagem (Id, Url, Descricao, Hotel_Id) VALUES
(1, 'https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=Hotel+Central', 'Fachada do Hotel Central Blumenau', (SELECT Id FROM Hotel WHERE Nome = 'Hotel Central Blumenau')),
(2, 'https://via.placeholder.com/800x600/059669/FFFFFF?text=Pousada+Itoupava', 'Fachada da Pousada Itoupava', (SELECT Id FROM Hotel WHERE Nome = 'Pousada Itoupava'));

-- Camas dos quartos
INSERT INTO CamaQuarto (Id, Tipo, Quantidade, Quarto_Id) VALUES
(1, 'Casal', 1, (SELECT Id FROM Quarto WHERE Numero = '101' AND Hotel_Id = (SELECT Id FROM Hotel WHERE Nome = 'Hotel Central Blumenau'))),
(2, 'Solteiro', 2, (SELECT Id FROM Quarto WHERE Numero = '201' AND Hotel_Id = (SELECT Id FROM Hotel WHERE Nome = 'Hotel Central Blumenau'))),
(3, 'Casal', 1, (SELECT Id FROM Quarto WHERE Numero = '1' AND Hotel_Id = (SELECT Id FROM Hotel WHERE Nome = 'Pousada Itoupava')));

-- =====================================================
-- 8. VERIFICAÇÃO DOS DADOS INSERIDOS
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

-- Verificar hotéis criados COM COORDENADAS
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
    h.Latitude,
    h.Longitude,
    COUNT(q.Id) as TotalQuartos
FROM Hotel h
JOIN Cidade c ON h.Cidade_Id = c.Id
JOIN Estado e ON c.Estado_Id = e.Id
LEFT JOIN Quarto q ON h.Id = q.Hotel_Id
WHERE h.Pessoa_id = 1
GROUP BY h.Id, h.Nome, h.Bairro, h.Rua, h.NumeroEndereco, h.CEP, c.Nome, e.Sigla, h.Ativo, h.Latitude, h.Longitude
ORDER BY h.Id;

-- Verificar quartos criados
SELECT 
    'Quartos Criados' as Tipo,
    q.Id as QuartoId,
    q.Numero,
    q.Preco,
    q.LimitePessoa,
    q.AceitaAnimal,
    h.Nome as HotelNome,
    h.Bairro,
    h.Latitude,
    h.Longitude
FROM Quarto q
JOIN Hotel h ON q.Hotel_Id = h.Id
WHERE h.Pessoa_id = 1
ORDER BY h.Nome, q.Numero;

-- Verificar coordenadas dos hotéis
SELECT 
    'Coordenadas dos Hotéis' as Tipo,
    h.Nome as Hotel,
    c.Nome as Cidade,
    h.Latitude,
    h.Longitude,
    CASE 
        WHEN h.Latitude IS NOT NULL AND h.Longitude IS NOT NULL THEN '✅ Com coordenadas'
        ELSE '❌ Sem coordenadas'
    END as Status
FROM Hotel h
JOIN Cidade c ON h.Cidade_Id = c.Id
ORDER BY h.Id;

-- Contar hotéis com e sem coordenadas
SELECT 
    'Estatísticas de Coordenadas' as Tipo,
    COUNT(*) as total_hoteis,
    COUNT(h.Latitude) as com_coordenadas,
    COUNT(*) - COUNT(h.Latitude) as sem_coordenadas,
    ROUND((COUNT(h.Latitude) / COUNT(*)) * 100, 2) as percentual_com_coordenadas
FROM Hotel h;

-- =====================================================
-- 9. INFORMAÇÕES DE LOGIN
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
-- 10. MENSAGEM DE SUCESSO
-- =====================================================

SELECT 
    'BANCO DE DADOS CRIADO COM SUCESSO!' as Status,
    'O banco HealthGo foi criado e populado com dados de teste.' as Mensagem
UNION ALL
SELECT 
    'COORDENADAS ADICIONADAS:' as Status,
    'Todos os hotéis agora possuem coordenadas geográficas reais!' as Mensagem
UNION ALL
SELECT 
    'PRÓXIMOS PASSOS:' as Status,
    '1. Configure a string de conexão no appsettings.json' as Mensagem
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
    '4. Faça login com admin@gmail.com / Admin123.' as Mensagem
UNION ALL
SELECT 
    '' as Status,
    '5. Acesse /dashboard/hotels para ver o mapa funcionando!' as Mensagem;
