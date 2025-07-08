
CREATE TABLE IF NOT EXISTS `HealthGo`.`Hotel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `CNPJ` VARCHAR(18) NOT NULL,
  `Nome` VARCHAR(255) NOT NULL,
  `Tipo` ENUM('Casa', 'Apartamento', 'Hostel', 'Pousada') NOT NULL,
  `Email` VARCHAR(150) NOT NULL,
  `Telefone` VARCHAR(45) NOT NULL,
  `EnderecoFoto` VARCHAR(255) NULL,
  `Site` VARCHAR(255) NULL,
  `Acessibilidade` VARCHAR(255) NULL,
  `CEP` VARCHAR(20) NOT NULL,
  `Bairro` VARCHAR(255) NOT NULL,
  `Rua` VARCHAR(255) NOT NULL,
  `NumeroEndereco` VARCHAR(255) NOT NULL,
  `Cidade_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Hotel_Cidade1_idx` (`Cidade_id` ASC) VISIBLE,
  UNIQUE INDEX `CNPJ_UNIQUE` (`CNPJ` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  CONSTRAINT `fk_Hotel_Cidade1`
    FOREIGN KEY (`Cidade_id`)
    REFERENCES `HealthGo`.`Cidade` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- Inserções corrigidas
INSERT INTO `HealthGo`.`Hotel`
(CNPJ, Nome, Tipo, Email, Telefone, EnderecoFoto, Site, Acessibilidade, CEP, Bairro, Rua, NumeroEndereco, Cidade_id)
VALUES
('21.093.547/0001-59', 'Monteiro', 'Pousada', 'lda-cruz@costa.br', '+55 (011) 9595 6896', 'https://dummyimage.com/37x90', 'http://da.com/', 'Sim', '24828-969', 'Monsenhor Messias', 'Lagoa Carvalho', '341', 31),
('53.842.697/0001-04', 'Rodrigues Almeida S.A.', 'Pousada', 'alana02@santos.org', '11 6531 4067', 'https://dummyimage.com/895x432', 'https://moreira.br/', 'Não', '81139479', 'Fernão Dias', 'Alameda Dias', '65', 66),
('47.602.513/0001-36', 'Moraes', 'Pousada', 'qmoura@santos.br', '+55 (084) 4140-9843', 'https://placeimg.com/721/179/any', 'https://oliveira.br/', 'Sim', '16185-525', 'Nova Suíça', 'Distrito Ana Sophia Pereira', '57', 23),
('16.908.437/0001-68', 'Caldeira Ltda.', 'Pousada', 'ana-claramelo@da.br', '+55 21 9200 0880', 'https://dummyimage.com/4x976', 'http://martins.net/', 'Sim', '01086-442', 'Jaqueline', 'Quadra Barbosa', '62', 127),
('80.437.196/0001-15', 'Ferreira - ME', 'Pousada', 'benicio57@gmail.com', '0500-917-3724', 'https://www.lorempixel.com/601/263', 'https://moura.br/', 'Sim', '44936455', 'Vila Madre Gertrudes 2ª Seção', 'Avenida João Moura', '32', 30),
('34.951.260/0001-64', 'Martins', 'Pousada', 'naraujo@yahoo.com.br', '+55 (071) 2656-1284', 'https://dummyimage.com/109x661', 'http://rezende.com/', 'Não', '84618-588', 'Alvorada', 'Estrada do Barreiro', '23', 40),
('89.234.106/0001-90', 'Moraes Almeida', 'Pousada', 'marcelotavares@silveira.com', '61 4023-5430', 'https://placekitten.com/400/500', 'http://www.santos.com.br', 'Não', '66835-500', 'Jardim Luzia', 'Rua Clara Nogueira', '10', 15);
