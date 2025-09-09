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
CREATE TABLE IF NOT EXISTS `healthgo`.`passagem` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Preco` DECIMAL(10,2) NOT NULL,
  `Classe` ENUM('Primeira Classe', 'Executiva', 'Econômica') NOT NULL,
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
-- Cidades adicionais do Sul e Sudeste
(28, 'Campinas', 25),
(29, 'Santos', 25),
(30, 'Ribeirão Preto', 25),
(31, 'Sorocaba', 25),
(32, 'Guarulhos', 25),
(33, 'São Bernardo do Campo', 25),
(34, 'Santo André', 25),
(35, 'Osasco', 25),
(36, 'São José dos Campos', 25),
(37, 'Mogi das Cruzes', 25),
(38, 'Diadema', 25),
(39, 'Jundiaí', 25),
(40, 'Carapicuíba', 25),
(41, 'Piracicaba', 25),
(42, 'Bauru', 25),
(43, 'Itaquaquecetuba', 25),
(44, 'São Vicente', 25),
(45, 'Franca', 25),
(46, 'Praia Grande', 25),
(47, 'Guarujá', 25),
(48, 'Taubaté', 25),
(49, 'Limeira', 25),
(50, 'Suzano', 25),
(51, 'Sumaré', 25),
(52, 'Barueri', 25),
(53, 'Embu das Artes', 25),
(54, 'São Caetano do Sul', 25),
(55, 'Mauá', 25),
(56, 'Taboão da Serra', 25),
(57, 'Indaiatuba', 25),
(58, 'Cotia', 25),
(59, 'Americana', 25),
(60, 'Araraquara', 25),
(61, 'Blumenau', 24),
(62, 'Joinville', 24),
(63, 'Itajaí', 24),
(64, 'Rio do Sul', 24),
(65, 'Chapecó', 24),
(66, 'Criciúma', 24),
(67, 'Lages', 24),
(68, 'Jaraguá do Sul', 24),
(69, 'Palhoça', 24),
(70, 'Balneário Camboriú', 24),
(71, 'Brusque', 24),
(72, 'Tubarão', 24),
(73, 'São José', 24),
(74, 'Navegantes', 24),
(75, 'Canoinhas', 24),
(76, 'Araranguá', 24),
(77, 'Caçador', 24),
(78, 'Concórdia', 24),
(79, 'Itapema', 24),
(80, 'São Bento do Sul', 24),
(81, 'Curitiba', 16),
(82, 'Londrina', 16),
(83, 'Maringá', 16),
(84, 'Ponta Grossa', 16),
(85, 'Cascavel', 16),
(86, 'São José dos Pinhais', 16),
(87, 'Foz do Iguaçu', 16),
(88, 'Colombo', 16),
(89, 'Guarapuava', 16),
(90, 'Paranaguá', 16),
(91, 'Araucária', 16),
(92, 'Toledo', 16),
(93, 'Apucarana', 16),
(94, 'Pinhais', 16),
(95, 'Campo Largo', 16),
(96, 'Arapongas', 16),
(97, 'Almirante Tamandaré', 16),
(98, 'Umuarama', 16),
(99, 'Piraquara', 16),
(100, 'Cambé', 16),
(101, 'Porto Alegre', 21),
(102, 'Caxias do Sul', 21),
(103, 'Pelotas', 21),
(104, 'Canoas', 21),
(105, 'Santa Maria', 21),
(106, 'Gravataí', 21),
(107, 'Viamão', 21),
(108, 'Novo Hamburgo', 21),
(109, 'São Leopoldo', 21),
(110, 'Rio Grande', 21),
(111, 'Alvorada', 21),
(112, 'Passo Fundo', 21),
(113, 'Sapucaia do Sul', 21),
(114, 'Uruguaiana', 21),
(115, 'Santa Cruz do Sul', 21),
(116, 'Cachoeirinha', 21),
(117, 'Bagé', 21),
(118, 'Bento Gonçalves', 21),
(119, 'Erechim', 21),
(120, 'Guaíba', 21),
(121, 'Belo Horizonte', 13),
(122, 'Uberlândia', 13),
(123, 'Contagem', 13),
(124, 'Juiz de Fora', 13),
(125, 'Betim', 13),
(126, 'Montes Claros', 13),
(127, 'Ribeirão das Neves', 13),
(128, 'Uberaba', 13),
(129, 'Governador Valadares', 13),
(130, 'Ipatinga', 13),
(131, 'Sete Lagoas', 13),
(132, 'Divinópolis', 13),
(133, 'Santa Luzia', 13),
(134, 'Ibirité', 13),
(135, 'Poços de Caldas', 13),
(136, 'Patos de Minas', 13),
(137, 'Pouso Alegre', 13),
(138, 'Teófilo Otoni', 13),
(139, 'Barbacena', 13),
(140, 'Sabará', 13),
(141, 'Rio de Janeiro', 19),
(142, 'São Gonçalo', 19),
(143, 'Duque de Caxias', 19),
(144, 'Nova Iguaçu', 19),
(145, 'Niterói', 19),
(146, 'Belford Roxo', 19),
(147, 'São João de Meriti', 19),
(148, 'Campos dos Goytacazes', 19),
(149, 'Petrópolis', 19),
(150, 'Volta Redonda', 19),
(151, 'Magé', 19),
(152, 'Macaé', 19),
(153, 'Itaboraí', 19),
(154, 'Cabo Frio', 19),
(155, 'Angra dos Reis', 19),
(156, 'Nova Friburgo', 19),
(157, 'Barra Mansa', 19),
(158, 'Teresópolis', 19),
(159, 'Mesquita', 19),
(160, 'Nilópolis', 19),
(161, 'Vitória', 8),
(162, 'Vila Velha', 8),
(163, 'Cariacica', 8),
(164, 'Serra', 8),
(165, 'Cachoeiro de Itapemirim', 8),
(166, 'Vitória', 8),
(167, 'Linhares', 8),
(168, 'São Mateus', 8),
(169, 'Colatina', 8),
(170, 'Guarapari', 8),
(171, 'Aracruz', 8),
(172, 'Viana', 8),
(173, 'Nova Venécia', 8),
(174, 'Barra de São Francisco', 8),
(175, 'Santa Teresa', 8),
(176, 'Domingos Martins', 8),
(177, 'Castelo', 8),
(178, 'Itapemirim', 8),
(179, 'Marataízes', 8),
(180, 'São Gabriel da Palha', 8);

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
-- 6. INSERÇÃO DE HOTÉIS COM COORDENADAS REAIS
-- =====================================================

-- Hotéis de Blumenau (5 hotéis próximos a hospitais reais)
INSERT INTO Hotel (CNPJ, Nome, Tipo, Email, Telefone, Site, Acessibilidade, CEP, Bairro, Rua, NumeroEndereco, Descricao, DataInicio, Cidade_Id, Pessoa_id, Ativo, Latitude, Longitude) VALUES
-- Hotel no Centro (próximo ao Hospital Santo Antônio)
('12.345.678/0001-01', 'Hotel Central Blumenau', 'Hotel', 'contato@hotelcentral.com', '(47) 3333-1111', 'https://hotelcentral.com', 'Rampas de acesso, elevadores', '89010-000', 'Centro', 'Rua XV de Novembro', '100', 'Hotel localizado no coração de Blumenau, próximo ao Hospital Santo Antônio', NOW(), 61, 1, 1, -26.9189, -49.0661),

-- Hotel na Itoupava Seca (próximo ao Hospital Santa Catarina)
('12.345.678/0001-02', 'Pousada Itoupava', 'Pousada', 'contato@pousadaitoupava.com', '(47) 3333-2222', 'https://pousadaitoupava.com', 'Quartos adaptados', '89030-000', 'Itoupava Seca', 'Rua da Paz', '250', 'Pousada familiar próximo ao Hospital Santa Catarina', NOW(), 61, 1, 1, -26.9250, -49.0750),

-- Hotel na Itoupava Central (próximo ao Hospital Regional)
('12.345.678/0001-03', 'Hotel Itoupava Central', 'Hotel', 'contato@itoupavacentral.com', '(47) 3333-3333', 'https://itoupavacentral.com', 'Acessibilidade completa', '89030-100', 'Itoupava Central', 'Rua das Flores', '500', 'Hotel próximo ao Hospital Regional', NOW(), 61, 1, 1, -26.9300, -49.0800),

-- Hotel na Itoupava Norte (próximo ao Hospital da Mulher)
('12.345.678/0001-04', 'Hotel Itoupava Norte', 'Hotel', 'contato@itoupavanorte.com', '(47) 3333-4444', 'https://itoupavanorte.com', 'Acessibilidade completa', '89030-200', 'Itoupava Norte', 'Rua do Progresso', '750', 'Hotel próximo ao Hospital da Mulher', NOW(), 61, 1, 1, -26.9350, -49.0850),

-- Hotel no Vorstadt (próximo ao Hospital Psiquiátrico)
('12.345.678/0001-05', 'Pousada Vorstadt', 'Pousada', 'contato@pousadavorstadt.com', '(47) 3333-7777', 'https://pousadavorstadt.com', 'Pousada familiar acessível', '89015-000', 'Vorstadt', 'Rua do Comércio', '300', 'Pousada no bairro Vorstadt próximo ao hospital', NOW(), 61, 1, 1, -26.9100, -49.0550);

-- Hotéis de Florianópolis (5 hotéis próximos a hospitais reais)
INSERT INTO Hotel (CNPJ, Nome, Tipo, Email, Telefone, Site, Acessibilidade, CEP, Bairro, Rua, NumeroEndereco, Descricao, DataInicio, Cidade_Id, Pessoa_id, Ativo, Latitude, Longitude) VALUES
-- Hotel no Centro (próximo ao Hospital de Caridade)
('12.345.678/0001-06', 'Hotel Centro Floripa', 'Hotel', 'contato@centrofloripa.com', '(48) 3333-1001', 'https://centrofloripa.com', 'Totalmente acessível', '88015-200', 'Centro', 'Rua Menino Deus', '100', 'Hotel no centro próximo ao Hospital de Caridade', NOW(), 24, 1, 1, -27.5900, -48.5500),

-- Hotel no Centro (próximo ao Hospital Baía Sul)
('12.345.678/0001-07', 'Hotel Baía Sul Medical', 'Hotel', 'contato@baiasulmedical.com', '(48) 3333-1002', 'https://baiasulmedical.com', 'Acessível para cadeirantes', '88020-000', 'Centro', 'Rua Rui Barbosa', '50', 'Hotel próximo ao Hospital Baía Sul', NOW(), 24, 1, 1, -27.5900, -48.5500),

-- Hotel na Trindade (próximo ao Hospital Universitário)
('12.345.678/0001-08', 'Hotel Trindade Medical', 'Hotel', 'contato@trindademedical.com', '(48) 3333-2001', 'https://trindademedical.com', 'Totalmente acessível', '88040-900', 'Trindade', 'Rua Prof. Maria Flora Pausewang', '100', 'Hotel próximo ao Hospital Universitário', NOW(), 24, 1, 1, -27.6000, -48.5200),

-- Pousada na Trindade (próximo ao Hospital Infantil)
('12.345.678/0001-09', 'Pousada Trindade', 'Pousada', 'contato@pousadatrindade.com', '(48) 3333-2002', 'https://pousadatrindade.com', 'Acessibilidade completa', '88040-900', 'Trindade', 'Rua Prof. Maria Flora Pausewang', '200', 'Pousada próxima ao Hospital Infantil', NOW(), 24, 1, 1, -27.6001, -48.5201),

-- Hotel no Centro (próximo ao Hospital Dona Helena)
('12.345.678/0001-10', 'Hotel Dona Helena Plaza', 'Hotel', 'contato@donahelenaplaza.com', '(48) 3333-1003', 'https://donahelenaplaza.com', 'Totalmente acessível', '88020-000', 'Centro', 'Rua Rui Barbosa', '100', 'Hotel próximo ao Hospital Dona Helena', NOW(), 24, 1, 1, -27.5901, -48.5501);

-- Hotéis de São Paulo (5 hotéis próximos a hospitais reais)
INSERT INTO Hotel (CNPJ, Nome, Tipo, Email, Telefone, Site, Acessibilidade, CEP, Bairro, Rua, NumeroEndereco, Descricao, DataInicio, Cidade_Id, Pessoa_id, Ativo, Latitude, Longitude) VALUES
-- Hotel no Cerqueira César (próximo ao Hospital das Clínicas)
('12.345.678/0001-11', 'Hotel Cerqueira Medical', 'Hotel', 'contato@cerqueiramedical.com', '(11) 3333-3001', 'https://cerqueiramedical.com', 'Totalmente acessível', '05403-000', 'Cerqueira César', 'Av. Dr. Enéas Carvalho de Aguiar', '100', 'Hotel próximo ao Hospital das Clínicas', NOW(), 25, 1, 1, -23.5617, -46.6565),

-- Hotel na Bela Vista (próximo ao Hospital Sírio-Libanês)
('12.345.678/0001-12', 'Hotel Bela Vista Medical', 'Hotel', 'contato@belavistamedical.com', '(11) 3333-4001', 'https://belavistamedical.com', 'Totalmente acessível', '01308-050', 'Bela Vista', 'Rua Dona Adma Jafet', '50', 'Hotel próximo ao Hospital Sírio-Libanês', NOW(), 25, 1, 1, -23.5617, -46.6565),

-- Hotel no Morumbi (próximo ao Hospital Albert Einstein)
('12.345.678/0001-13', 'Hotel Morumbi Medical', 'Hotel', 'contato@morumbimedical.com', '(11) 3333-5001', 'https://morumbimedical.com', 'Totalmente acessível', '05652-900', 'Morumbi', 'Av. Albert Einstein', '300', 'Hotel próximo ao Hospital Albert Einstein', NOW(), 25, 1, 1, -23.6000, -46.7000),

-- Hotel no Paraíso (próximo ao Hospital do Coração)
('12.345.678/0001-14', 'Hotel Paraíso Medical', 'Hotel', 'contato@paraisomedical.com', '(11) 3333-6001', 'https://paraisomedical.com', 'Acessível para cadeirantes', '04005-000', 'Paraíso', 'Rua Desembargador Eliseu Guilherme', '100', 'Hotel próximo ao Hospital do Coração', NOW(), 25, 1, 1, -23.5700, -46.6400),

-- Hotel na Vila Clementino (próximo ao Hospital São Paulo)
('12.345.678/0001-15', 'Hotel Vila Clementino Medical', 'Hotel', 'contato@vilaclementinomedical.com', '(11) 3333-7001', 'https://vilaclementinomedical.com', 'Totalmente acessível', '04039-000', 'Vila Clementino', 'Rua Napoleão de Barros', '500', 'Hotel próximo ao Hospital São Paulo', NOW(), 25, 1, 1, -23.6000, -46.6400);

-- Hotéis de Curitiba (5 hotéis próximos a hospitais reais)
INSERT INTO Hotel (CNPJ, Nome, Tipo, Email, Telefone, Site, Acessibilidade, CEP, Bairro, Rua, NumeroEndereco, Descricao, DataInicio, Cidade_Id, Pessoa_id, Ativo, Latitude, Longitude) VALUES
-- Hotel no Bom Retiro (próximo ao Hospital de Clínicas)
('12.345.678/0001-16', 'Hotel Bom Retiro Medical', 'Hotel', 'contato@bomretiromedical.com', '(41) 3333-6001', 'https://bomretiromedical.com', 'Totalmente acessível', '80060-240', 'Bom Retiro', 'Rua General Carneiro', '100', 'Hotel próximo ao Hospital de Clínicas', NOW(), 81, 1, 1, -25.4284, -49.2733),

-- Hotel no Bom Retiro (próximo ao Hospital Pequeno Príncipe)
('12.345.678/0001-17', 'Hotel Pequeno Príncipe Plaza', 'Hotel', 'contato@pequenoprincipeplaza.com', '(41) 3333-6002', 'https://pequenoprincipeplaza.com', 'Acessível para cadeirantes', '80250-060', 'Bom Retiro', 'Rua Desembargador Motta', '1000', 'Hotel próximo ao Hospital Pequeno Príncipe', NOW(), 81, 1, 1, -25.4284, -49.2733),

-- Hotel no Bom Retiro (próximo ao Hospital Erasto Gaertner)
('12.345.678/0001-18', 'Hotel Erasto Gaertner Medical', 'Hotel', 'contato@erastogaertnermedical.com', '(41) 3333-6003', 'https://erastogaertnermedical.com', 'Totalmente acessível', '81520-010', 'Bom Retiro', 'Rua Dr. Ovande do Amaral', '150', 'Hotel próximo ao Hospital Erasto Gaertner', NOW(), 81, 1, 1, -25.4284, -49.2733),

-- Hotel no Bom Retiro (próximo ao Hospital Nossa Senhora das Graças)
('12.345.678/0001-19', 'Hotel Nossa Senhora Medical', 'Hotel', 'contato@nossasenhormedical.com', '(41) 3333-6004', 'https://nossasenhormedical.com', 'Acessível para cadeirantes', '80060-240', 'Bom Retiro', 'Rua General Carneiro', '250', 'Hotel próximo ao Hospital Nossa Senhora das Graças', NOW(), 81, 1, 1, -25.4284, -49.2733),

-- Hotel no Cajuru (próximo ao Hospital Cajuru)
('12.345.678/0001-20', 'Hotel Cajuru Medical', 'Hotel', 'contato@cajurumedical.com', '(41) 3333-6005', 'https://cajurumedical.com', 'Totalmente acessível', '80050-350', 'Cajuru', 'Rua São José', '200', 'Hotel próximo ao Hospital Cajuru', NOW(), 81, 1, 1, -25.4500, -49.2500);

-- Hotéis de Porto Alegre (5 hotéis próximos a hospitais reais)
INSERT INTO Hotel (CNPJ, Nome, Tipo, Email, Telefone, Site, Acessibilidade, CEP, Bairro, Rua, NumeroEndereco, Descricao, DataInicio, Cidade_Id, Pessoa_id, Ativo, Latitude, Longitude) VALUES
-- Hotel no Bom Fim (próximo ao Hospital de Clínicas)
('12.345.678/0001-21', 'Hotel Bom Fim Medical', 'Hotel', 'contato@bomfimmedical.com', '(51) 3333-8001', 'https://bomfimmedical.com', 'Totalmente acessível', '90035-903', 'Bom Fim', 'Rua Ramiro Barcelos', '2000', 'Hotel próximo ao Hospital de Clínicas', NOW(), 101, 1, 1, -30.0346, -51.2177),

-- Hotel no Moinhos de Vento (próximo ao Hospital Moinhos de Vento)
('12.345.678/0001-22', 'Hotel Moinhos Medical', 'Hotel', 'contato@moinhosmedical.com', '(51) 3333-9001', 'https://moinhosmedical.com', 'Totalmente acessível', '90560-030', 'Moinhos de Vento', 'Rua Ramiro Barcelos', '800', 'Hotel próximo ao Hospital Moinhos de Vento', NOW(), 101, 1, 1, -30.0346, -51.2177),

-- Hotel no Moinhos de Vento (próximo ao Hospital Mãe de Deus)
('12.345.678/0001-23', 'Hotel Mãe de Deus Plaza', 'Hotel', 'contato@maededeusplaza.com', '(51) 3333-9002', 'https://maededeusplaza.com', 'Acessível para cadeirantes', '90460-190', 'Moinhos de Vento', 'Rua Costa', '20', 'Hotel próximo ao Hospital Mãe de Deus', NOW(), 101, 1, 1, -30.0346, -51.2177),

-- Hotel no Santana (próximo ao Hospital São Lucas)
('12.345.678/0001-24', 'Hotel Santana Medical', 'Hotel', 'contato@santanamedical.com', '(51) 3333-9003', 'https://santanamedical.com', 'Totalmente acessível', '90619-900', 'Santana', 'Av. Assis Brasil', '1800', 'Hotel próximo ao Hospital São Lucas', NOW(), 101, 1, 1, -30.0346, -51.2177),

-- Hotel no Cristo Redentor (próximo ao Hospital Conceição)
('12.345.678/0001-25', 'Hotel Cristo Redentor Medical', 'Hotel', 'contato@cristoredentormedical.com', '(51) 3333-9004', 'https://cristoredentormedical.com', 'Acessível para cadeirantes', '91350-200', 'Cristo Redentor', 'Av. Francisco Trein', '500', 'Hotel próximo ao Hospital Conceição', NOW(), 101, 1, 1, -30.0346, -51.2177);

-- Hotéis de Belo Horizonte (5 hotéis próximos a hospitais reais)
INSERT INTO Hotel (CNPJ, Nome, Tipo, Email, Telefone, Site, Acessibilidade, CEP, Bairro, Rua, NumeroEndereco, Descricao, DataInicio, Cidade_Id, Pessoa_id, Ativo, Latitude, Longitude) VALUES
-- Hotel na Santa Efigênia (próximo ao Hospital das Clínicas)
('12.345.678/0001-26', 'Hotel Santa Efigênia Medical', 'Hotel', 'contato@santaefigeniamedical.com', '(31) 3333-0001', 'https://santaefigeniamedical.com', 'Totalmente acessível', '30130-100', 'Santa Efigênia', 'Av. Prof. Alfredo Balena', '50', 'Hotel próximo ao Hospital das Clínicas', NOW(), 121, 1, 1, -19.9167, -43.9345),

-- Hotel no Funcionários (próximo ao Hospital Mater Dei)
('12.345.678/0001-27', 'Hotel Funcionários Medical', 'Hotel', 'contato@funcionariosmedical.com', '(31) 3333-1001', 'https://funcionariosmedical.com', 'Totalmente acessível', '30112-000', 'Funcionários', 'Rua Gonçalves Dias', '2500', 'Hotel próximo ao Hospital Mater Dei', NOW(), 121, 1, 1, -19.9167, -43.9345),

-- Hotel no Funcionários (próximo ao Hospital Felício Rocho)
('12.345.678/0001-28', 'Hotel Felício Rocho Medical', 'Hotel', 'contato@feliciorochomedical.com', '(31) 3333-1002', 'https://feliciorochomedical.com', 'Acessível para cadeirantes', '30112-000', 'Funcionários', 'Rua da Bahia', '350', 'Hotel próximo ao Hospital Felício Rocho', NOW(), 121, 1, 1, -19.9167, -43.9345),

-- Hotel na Santa Efigênia (próximo ao Hospital Odilon Behrens)
('12.345.678/0001-29', 'Hotel Odilon Behrens Medical', 'Hotel', 'contato@odilonbehrensmedical.com', '(31) 3333-1003', 'https://odilonbehrensmedical.com', 'Totalmente acessível', '30130-100', 'Santa Efigênia', 'Rua Formiga', '30', 'Hotel próximo ao Hospital Odilon Behrens', NOW(), 121, 1, 1, -19.9167, -43.9345),

-- Hotel no Caiçara (próximo ao Hospital Risoleta Tolentino Neves)
('12.345.678/0001-30', 'Hotel Caiçara Medical', 'Hotel', 'contato@caiçaramedical.com', '(31) 3333-1004', 'https://caiçaramedical.com', 'Acessível para cadeirantes', '30640-000', 'Caiçara', 'Rua das Gabirobas', '50', 'Hotel próximo ao Hospital Risoleta Tolentino Neves', NOW(), 121, 1, 1, -19.9167, -43.9345);

-- Hotéis do Rio de Janeiro (5 hotéis próximos a hospitais reais)
INSERT INTO Hotel (CNPJ, Nome, Tipo, Email, Telefone, Site, Acessibilidade, CEP, Bairro, Rua, NumeroEndereco, Descricao, DataInicio, Cidade_Id, Pessoa_id, Ativo, Latitude, Longitude) VALUES
-- Hotel em Copacabana (próximo ao Hospital Copa D'Or)
('12.345.678/0001-31', 'Hotel Copa D\'Or Medical', 'Hotel', 'contato@copadormedical.com', '(21) 3333-2001', 'https://copadormedical.com', 'Totalmente acessível', '22071-900', 'Copacabana', 'Rua Figueiredo de Magalhães', '800', 'Hotel próximo ao Hospital Copa D\'Or', NOW(), 141, 1, 1, -22.9068, -43.1729),

-- Hotel em Copacabana (próximo ao Hospital São Lucas)
('12.345.678/0001-32', 'Hotel São Lucas Medical', 'Hotel', 'contato@saolucasmedical.com', '(21) 3333-2002', 'https://saolucasmedical.com', 'Acessível para cadeirantes', '22071-900', 'Copacabana', 'Rua Figueiredo de Magalhães', '850', 'Hotel próximo ao Hospital São Lucas', NOW(), 141, 1, 1, -22.9068, -43.1729),

-- Hotel em Copacabana (próximo ao Hospital Miguel Couto)
('12.345.678/0001-33', 'Hotel Miguel Couto Medical', 'Hotel', 'contato@miguelcoutomedical.com', '(21) 3333-2003', 'https://miguelcoutomedical.com', 'Totalmente acessível', '22071-900', 'Copacabana', 'Rua Figueiredo de Magalhães', '900', 'Hotel próximo ao Hospital Miguel Couto', NOW(), 141, 1, 1, -22.9068, -43.1729),

-- Hotel em Copacabana (próximo ao Hospital Pró-Cardíaco)
('12.345.678/0001-34', 'Hotel Pró-Cardíaco Medical', 'Hotel', 'contato@procardiacomedical.com', '(21) 3333-2004', 'https://procardiacomedical.com', 'Acessível para cadeirantes', '22071-900', 'Copacabana', 'Rua Figueiredo de Magalhães', '950', 'Hotel próximo ao Hospital Pró-Cardíaco', NOW(), 141, 1, 1, -22.9068, -43.1729),

-- Hotel na Ilha do Fundão (próximo ao Hospital Universitário)
('12.345.678/0001-35', 'Hotel Fundão Medical', 'Hotel', 'contato@fundaomedical.com', '(21) 3333-3001', 'https://fundaomedical.com', 'Totalmente acessível', '21941-590', 'Ilha do Fundão', 'Av. Carlos Chagas Filho', '300', 'Hotel próximo ao Hospital Universitário', NOW(), 141, 1, 1, -22.9068, -43.1729);

-- Hotéis de Vitória (5 hotéis próximos a hospitais reais)
INSERT INTO Hotel (CNPJ, Nome, Tipo, Email, Telefone, Site, Acessibilidade, CEP, Bairro, Rua, NumeroEndereco, Descricao, DataInicio, Cidade_Id, Pessoa_id, Ativo, Latitude, Longitude) VALUES
-- Hotel no Centro (próximo a hospitais do centro)
('12.345.678/0001-36', 'Hotel Centro Vitória', 'Hotel', 'contato@centrovitoria.com', '(27) 3333-4001', 'https://centrovitoria.com', 'Totalmente acessível', '29010-000', 'Centro', 'Rua da Praia', '100', 'Hotel no centro próximo a hospitais', NOW(), 161, 1, 1, -20.3155, -40.3128),

-- Hotel no Centro (próximo ao Hospital Universitário)
('12.345.678/0001-37', 'Hotel Universitário Vitória', 'Hotel', 'contato@universitariovitoria.com', '(27) 3333-4002', 'https://universitariovitoria.com', 'Acessível para cadeirantes', '29010-000', 'Centro', 'Rua da Praia', '200', 'Hotel próximo ao Hospital Universitário', NOW(), 161, 1, 1, -20.3156, -40.3129),

-- Hotel no Centro (próximo ao Hospital Santa Casa)
('12.345.678/0001-38', 'Hotel Santa Casa Vitória', 'Hotel', 'contato@santacasavitoria.com', '(27) 3333-4003', 'https://santacasavitoria.com', 'Totalmente acessível', '29010-000', 'Centro', 'Rua da Praia', '300', 'Hotel próximo ao Hospital Santa Casa', NOW(), 161, 1, 1, -20.3157, -40.3130),

-- Hotel no Centro (próximo ao Hospital Evangélico)
('12.345.678/0001-39', 'Hotel Evangélico Vitória', 'Hotel', 'contato@evangelicovitoria.com', '(27) 3333-4004', 'https://evangelicovitoria.com', 'Acessível para cadeirantes', '29010-000', 'Centro', 'Rua da Praia', '400', 'Hotel próximo ao Hospital Evangélico', NOW(), 161, 1, 1, -20.3158, -40.3131),

-- Hotel no Centro (próximo ao Hospital Meridional)
('12.345.678/0001-40', 'Hotel Meridional Vitória', 'Hotel', 'contato@meridionalvitoria.com', '(27) 3333-4005', 'https://meridionalvitoria.com', 'Totalmente acessível', '29010-000', 'Centro', 'Rua da Praia', '500', 'Hotel próximo ao Hospital Meridional', NOW(), 161, 1, 1, -20.3159, -40.3132);

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

-- Quartos para Hotel Itoupava Central
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('A101', 1, 0, 'Apartamento 1 quarto mobiliado', 180.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Itoupava Central')),
('A102', 1, 0, 'Apartamento 1 quarto mobiliado', 180.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Itoupava Central')),
('A201', 2, 0, 'Apartamento 2 quartos mobiliado', 220.00, 4, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Itoupava Central'));

-- Quartos para Hotel Itoupava Norte
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('Dorm1', 1, 1, 'Dormitório feminino (6 camas)', 60.00, 6, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Itoupava Norte')),
('Dorm2', 1, 1, 'Dormitório masculino (6 camas)', 60.00, 6, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Itoupava Norte')),
('Priv1', 2, 0, 'Quarto privativo casal', 120.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Itoupava Norte'));

-- Quartos para Pousada Vorstadt
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('1', 1, 1, 'Quarto familiar', 110.00, 4, (SELECT Id FROM Hotel WHERE Nome = 'Pousada Vorstadt')),
('2', 1, 0, 'Quarto casal', 90.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Pousada Vorstadt'));

-- Quartos para Hotel Centro Floripa
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('101', 1, 0, 'Quarto padrão', 130.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Centro Floripa')),
('201', 2, 0, 'Quarto superior', 160.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Centro Floripa')),
('301', 3, 0, 'Suíte', 220.00, 4, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Centro Floripa'));

-- Quartos para Hotel Baía Sul Medical
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('1', 1, 1, 'Quarto familiar', 100.00, 4, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Baía Sul Medical')),
('2', 1, 0, 'Quarto casal', 80.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Baía Sul Medical'));

-- Quartos para Hotel Trindade Medical
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('101', 1, 0, 'Quarto executivo', 140.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Trindade Medical')),
('201', 2, 0, 'Suíte executiva', 200.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Trindade Medical'));

-- Quartos para Pousada Trindade
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('1', 1, 1, 'Quarto familiar', 110.00, 4, (SELECT Id FROM Hotel WHERE Nome = 'Pousada Trindade')),
('2', 1, 0, 'Quarto casal', 90.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Pousada Trindade'));

-- Quartos para Hotel Dona Helena Plaza
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('101', 1, 0, 'Quarto padrão', 120.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Dona Helena Plaza')),
('201', 2, 0, 'Quarto superior', 150.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Dona Helena Plaza'));

-- Quartos para Hotel Cerqueira Medical
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('101', 1, 0, 'Quarto padrão', 200.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Cerqueira Medical')),
('201', 2, 0, 'Quarto superior', 250.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Cerqueira Medical')),
('301', 3, 0, 'Suíte executiva', 350.00, 4, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Cerqueira Medical'));

-- Quartos para Hotel Bela Vista Medical
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('101', 1, 0, 'Quarto padrão', 180.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Bela Vista Medical')),
('201', 2, 0, 'Quarto superior', 220.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Bela Vista Medical'));

-- Quartos para Hotel Morumbi Medical
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('101', 1, 0, 'Quarto padrão', 300.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Morumbi Medical')),
('201', 2, 0, 'Quarto superior', 380.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Morumbi Medical')),
('301', 3, 0, 'Suíte executiva', 500.00, 4, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Morumbi Medical'));

-- Quartos para Hotel Paraíso Medical
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('101', 1, 0, 'Quarto padrão', 250.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Paraíso Medical')),
('201', 2, 0, 'Quarto superior', 300.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Paraíso Medical'));

-- Quartos para Hotel Vila Clementino Medical
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('101', 1, 0, 'Quarto padrão', 200.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Vila Clementino Medical')),
('201', 2, 0, 'Quarto superior', 250.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Vila Clementino Medical'));

-- Quartos para alguns hotéis das capitais
-- Quartos para Hotel Bom Retiro Medical (Curitiba)
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('101', 1, 0, 'Quarto padrão', 150.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Bom Retiro Medical')),
('201', 2, 0, 'Quarto superior', 180.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Bom Retiro Medical'));

-- Quartos para Hotel Bom Fim Medical (Porto Alegre)
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('101', 1, 0, 'Quarto padrão', 160.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Bom Fim Medical')),
('201', 2, 0, 'Quarto superior', 200.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Bom Fim Medical'));

-- Quartos para Hotel Santa Efigênia Medical (Belo Horizonte)
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('101', 1, 0, 'Quarto padrão', 140.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Santa Efigênia Medical')),
('201', 2, 0, 'Quarto superior', 170.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Santa Efigênia Medical'));

-- Quartos para Hotel Copa D'Or Medical (Rio de Janeiro)
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('101', 1, 0, 'Quarto padrão', 220.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Copa D\'Or Medical')),
('201', 2, 0, 'Quarto superior', 280.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Copa D\'Or Medical'));

-- Quartos para Hotel Centro Vitória (Vitória)
INSERT INTO Quarto (Numero, Andar, AceitaAnimal, Observacao, Preco, LimitePessoa, Hotel_Id) VALUES
('101', 1, 0, 'Quarto padrão', 120.00, 2, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Centro Vitória')),
('201', 2, 0, 'Quarto superior', 150.00, 3, (SELECT Id FROM Hotel WHERE Nome = 'Hotel Centro Vitória'));

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
