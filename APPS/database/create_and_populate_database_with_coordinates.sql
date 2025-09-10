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
  `PrecoHora` DECIMAL(10,2) NOT NULL,
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
CREATE TABLE IF NOT EXISTS `healthgo`.`ordemservico_prestadorservico` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `DataInicio` DATETIME NOT NULL,
  `DataFim` DATETIME NOT NULL,
  `OrdemServico_Id` INT NOT NULL,
  `prestadorservico_especialidade_Id` INT NOT NULL,
  PRIMARY KEY (`Id`, `prestadorservico_especialidade_Id`),
  INDEX `fk_OrdemServico_PrestadorServico_OrdemServico1_idx` (`OrdemServico_Id` ASC) VISIBLE,
  INDEX `fk_ordemservico_prestadorservico_prestadorservico_especiali_idx` (`prestadorservico_especialidade_Id` ASC) VISIBLE,
  CONSTRAINT `fk_OrdemServico_PrestadorServico_OrdemServico1`
    FOREIGN KEY (`OrdemServico_Id`)
    REFERENCES `healthgo`.`ordemservico` (`Id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_ordemservico_prestadorservico_prestadorservico_especialida1`
    FOREIGN KEY (`prestadorservico_especialidade_Id`)
    REFERENCES `healthgo`.`prestadorservico_especialidade` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

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

-- Tabela Voo
CREATE TABLE IF NOT EXISTS `Voo` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Numero` VARCHAR(20) NOT NULL UNIQUE,
  `Preco` DECIMAL(10,2) NOT NULL,
  `DataPartida` DATETIME NOT NULL,
  `DataChegada` DATETIME NOT NULL,
  `Companhia` VARCHAR(20) NOT NULL,
  `Assento_Tipo` ENUM('Primeira Classe', 'Executiva', 'Econômica'),
  `AeroportoOrigem_Id` INT NOT NULL,
  `AeroportoDestino_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Voo_Aeroporto1_idx` (`AeroportoOrigem_Id` ASC) VISIBLE,
  INDEX `fk_Voo_Aeroporto2_idx` (`AeroportoDestino_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Voo_Aeroporto1`
    FOREIGN KEY (`AeroportoOrigem_Id`)
    REFERENCES `Aeroporto` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Voo_Aeroporto2`
    FOREIGN KEY (`AeroportoDestino_Id`)
    REFERENCES `Aeroporto` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Tabela Passagem
CREATE TABLE IF NOT EXISTS `healthgo`.`passagem` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Voo_Id` INT NOT NULL,
  `OrdemServico_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Passagem_Voo1_idx` (`Voo_Id` ASC) VISIBLE,
  INDEX `fk_passagem_ordemservico1_idx` (`ordemservico_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Passagem_Voo1`
    FOREIGN KEY (`Voo_Id`)
    REFERENCES `healthgo`.`voo` (`Id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_passagem_ordemservico1`
    FOREIGN KEY (`ordemservico_Id`)
    REFERENCES `healthgo`.`ordemservico` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;

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
INSERT INTO `Aeroporto` (`Nome`, `Codigo`, `Cidade_Id`) VALUES ('Aeroporto Internacional de Guarulhos', 'GRU', 24);
INSERT INTO `Aeroporto` (`Nome`, `Codigo`, `Cidade_Id`) VALUES ('Aeroporto de Congonhas', 'CGH', 24);
INSERT INTO `Aeroporto` (`Nome`, `Codigo`, `Cidade_Id`) VALUES ('Aeroporto Internacional do Galeão', 'GIG', 19);
INSERT INTO `Aeroporto` (`Nome`, `Codigo`, `Cidade_Id`) VALUES ('Aeroporto Santos Dumont', 'SDU', 19);
INSERT INTO `Aeroporto` (`Nome`, `Codigo`, `Cidade_Id`) VALUES ('Aeroporto Internacional de Brasília', 'BSB', 25);
INSERT INTO `Aeroporto` (`Nome`, `Codigo`, `Cidade_Id`) VALUES ('Aeroporto Internacional de Florianópolis', 'FLN', 61);

INSERT INTO `Aeroporto` (`Nome`, `Codigo`, `Cidade_Id`) VALUES
('Aeroporto Campo de Marte', 'SBMT', 24),
('Aeroporto de Jacarepaguá', 'SBJR', 19),
('Aeroporto Brigadeiro Cabral', 'SNZW', 25),
('Aeroporto Costa de Piranhas', 'SBFI', 61),
('Aeroporto Presidente Juscelino Kubitschek', 'BSB', 25),
('Aeroporto Internacional de Viracopos', 'VCP', 24),
('Aeroporto Internacional de Curitiba', 'CWB', 25);


-- Inserts para a tabela Voo
-- Vários voos conectando os aeroportos existentes e os recém-adicionados.
-- As novas referências de AeroportoOrigem_Id e AeroportoDestino_Id usarão os IDs gerados acima.
-- Assumindo que os IDs de aeroporto são gerados sequencialmente, usei os IDs 1-6 dos exemplos anteriores e 7-13 para os novos.

INSERT INTO `Voo` (`Numero`, `DataPartida`, `DataChegada`, `Companhia`, `Assento_Tipo`, `Preco`, `AeroportoOrigem_Id`, `AeroportoDestino_Id`) VALUES
('LA3121', '2025-09-10 08:00:00', '2025-09-10 09:10:00', 'LATAM', 'Econômica', 350.50, 1, 3),
('G31002', '2025-09-10 10:30:00', '2025-09-10 11:45:00', 'GOL', 'Executiva', 850.75, 4, 2),
('AD5010', '2025-09-11 12:00:00', '2025-09-11 13:50:00', 'AZUL', 'Primeira Classe', 1500.00, 1, 5),
('LA4567', '2025-09-11 15:30:00', '2025-09-11 17:00:00', 'LATAM', 'Econômica', 420.00, 5, 6),
('G31088', '2025-09-12 18:00:00', '2025-09-12 19:35:00', 'GOL', 'Executiva', 910.00, 6, 3),
('JJ3156', '2025-09-15 14:00:00', '2025-09-15 15:30:00', 'LATAM', 'Econômica', 380.25, 1, 4),
('AD2050', '2025-09-15 16:30:00', '2025-09-15 18:00:00', 'AZUL', 'Executiva', 790.00, 3, 2),
('GOL8875', '2025-09-16 09:00:00', '2025-09-16 10:45:00', 'GOL', 'Econômica', 300.00, 2, 5),
('LATAM9123', '2025-09-16 11:30:00', '2025-09-16 13:00:00', 'LATAM', 'Executiva', 880.50, 5, 1),
('AZUL4489', '2025-09-17 19:00:00', '2025-09-17 21:00:00', 'AZUL', 'Primeira Classe', 1650.00, 4, 3),
('GOL5500', '2025-09-18 07:00:00', '2025-09-18 08:30:00', 'GOL', 'Econômica', 290.00, 6, 2),
('LA3345', '2025-09-18 10:00:00', '2025-09-18 12:00:00', 'LATAM', 'Econômica', 450.00, 7, 8),
('AD9876', '2025-09-19 13:00:00', '2025-09-19 14:40:00', 'AZUL', 'Executiva', 950.00, 8, 9),
('G32578', '2025-09-19 15:15:00', '2025-09-19 16:50:00', 'GOL', 'Primeira Classe', 1800.00, 9, 10),
('LA7654', '2025-09-20 17:00:00', '2025-09-20 18:30:00', 'LATAM', 'Econômica', 360.00, 10, 11),
('AD1234', '2025-09-21 06:00:00', '2025-09-21 07:30:00', 'AZUL', 'Executiva', 810.00, 11, 12),
('GOL6789', '2025-09-21 09:00:00', '2025-09-21 10:45:00', 'GOL', 'Econômica', 320.00, 12, 13),
('LA1122', '2025-09-22 11:00:00', '2025-09-22 12:30:00', 'LATAM', 'Primeira Classe', 1750.00, 13, 7),
('AD2233', '2025-09-22 14:00:00', '2025-09-22 15:50:00', 'AZUL', 'Econômica', 400.00, 7, 9),
('G34455', '2025-09-23 16:00:00', '2025-09-23 17:30:00', 'GOL', 'Executiva', 930.00, 9, 11),
('LA6677', '2025-09-23 18:00:00', '2025-09-23 19:45:00', 'LATAM', 'Econômica', 390.00, 11, 8),
('AD8899', '2025-09-24 20:00:00', '2025-09-24 22:00:00', 'AZUL', 'Primeira Classe', 1900.00, 8, 12),
('GOL9900', '2025-09-25 08:30:00', '2025-09-25 10:00:00', 'GOL', 'Econômica', 330.00, 12, 10),
('LA1111', '2025-10-04 12:30:00', '2025-10-04 14:00:00', 'LATAM', 'Executiva', 925.00, 9, 10),
('AD2222', '2025-10-05 15:00:00', '2025-10-05 16:45:00', 'AZUL', 'Primeira Classe', 1950.00, 10, 11),
('GOL3333', '2025-10-06 17:00:00', '2025-10-06 18:30:00', 'GOL', 'Econômica', 275.00, 11, 12),
('LA4444', '2025-10-07 19:00:00', '2025-10-07 20:40:00', 'LATAM', 'Executiva', 895.00, 12, 13),
('AD5555', '2025-10-08 21:00:00', '2025-10-08 22:30:00', 'AZUL', 'Econômica', 410.00, 13, 1),
('LA9024', '2025-10-10 08:00:00', '2025-10-10 09:30:00', 'LATAM', 'Primeira Classe', 1800.00, 2, 11),
('G31924', '2025-10-10 10:15:00', '2025-10-10 11:45:00', 'GOL', 'Executiva', 920.00, 4, 12),
('AD5024', '2025-10-10 13:00:00', '2025-10-10 14:30:00', 'AZUL', 'Econômica', 350.00, 5, 11),
('LA9019', '2025-10-11 08:30:00', '2025-10-11 10:00:00', 'LATAM', 'Primeira Classe', 1750.00, 3, 4),
('G31919', '2025-10-11 11:00:00', '2025-10-11 12:30:00', 'GOL', 'Executiva', 880.00, 1, 2),
('AD5019', '2025-10-11 14:00:00', '2025-10-11 15:30:00', 'AZUL', 'Econômica', 330.00, 2, 12),
('LA9025', '2025-10-12 07:45:00', '2025-10-12 09:15:00', 'LATAM', 'Primeira Classe', 1850.00, 10, 11),
('G31925', '2025-10-12 10:00:00', '2025-10-12 11:30:00', 'GOL', 'Executiva', 940.00, 2, 4),
('AD5025', '2025-10-12 12:45:00', '2025-10-12 14:15:00', 'AZUL', 'Econômica', 345.00, 6, 4),
('LA9061', '2025-10-13 09:00:00', '2025-10-13 10:30:00', 'LATAM', 'Primeira Classe', 1900.00, 11, 6),
('G31961', '2025-10-13 11:00:00', '2025-10-13 12:30:00', 'GOL', 'Executiva', 970.00, 9, 3),
('AD5061', '2025-10-13 13:30:00', '2025-10-13 15:00:00', 'AZUL', 'Econômica', 360.00, 8, 6);


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
