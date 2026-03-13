USE servidor_local;

CREATE TABLE tabela_prestadores(
id  VARCHAR (255) PRIMARY KEY NOT NULL,
nif INT NOT NULL,
precoHora DECIMAL (10,2),
profissao VARCHAR (100),
minimoDesconto DECIMAL (10,2),
taxaUrgencia DECIMAL (10,3),
percentagemDesconto DECIMAL (10,3),
disponivel BOOLEAN NOT NULL,
enable BOOLEAN NOT NULL ,
created_at DATETIME NOT NULL,
update_at DATETIME NOT NULL
);

ALTER TABLE tabela_prestadores
DROP COLUMN taxaUrgencia,
ADD COLUMN taxa_urgencia DECIMAL (10,3) AFTER profissao,
DROP COLUMN minimoDesconto,
ADD COLUMN minimo_desconto DECIMAL (10,3) AFTER taxa_urgencia,
DROP COLUMN percentagemDesconto,
ADD COLUMN percentagem_desconto DECIMAL (10,3) AFTER minimo_desconto,
DROP COLUMN precoHora,
ADD COLUMN preco_hora DECIMAL (10,3) AFTER percentagem_desconto;

CREATE TABLE tabela_utilizadores(
id VARCHAR (255) PRIMARY KEY NOT NULL,
nome VARCHAR (50) NOT NULL,
numero_identificacao VARCHAR (100) NOT NULL,
data_nascimento DATE NOT NULL,
email VARCHAR (100) NOT NULL,
telefone VARCHAR (13),
pais VARCHAR (100) NOT NULL,
localidade VARCHAR (100) NOT NULL,
`passord` VARCHAR (255) NOT NULL,
enabled BOOLEAN NOT NULL,
created_at DATETIME NOT NULL,
updated_at DATETIME NOT NULL
);

CREATE TABLE tabela_servicos(
id INTEGER (255) PRIMARY KEY NOT NULL auto_increment,
nome VARCHAR (50) NOT NULL,
descricao VARCHAR (20),
categoria VARCHAR (20) NOT NULL,
enabled BOOLEAN NOT NULL,
created_at DATETIME NOT NULL,
updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `tbl_orcamento` (
	`id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
	`total` DOUBLE NOT NULL,
	`utilizadores` VARCHAR(255) NOT NULL,
	`id_utilizador` VARCHAR(255) NOT NULL,
	`enabled` BOOLEAN NOT NULL,
	`created_at` DATETIME NOT NULL,
	`updated_at` DATETIME NOT NULL	
);

CREATE TABLE IF NOT EXISTS `tbl_prestacao_servicos` (
	`id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
	`disignacao` VARCHAR(100) NOT NULL,
	`subtotal` DOUBLE NOT NULL,
	`hora_estimadas` INTEGER,
	`id_prestador` VARCHAR(255) NOT NULL,
	`id_servico` INTEGER NOT NULL,
	`preco_hora` DOUBLE,
	`estado` ENUM('pendente', 'em progresso', 'finalizado', 'cancelado') NOT NULL,
	`id_orcamento` INTEGER,
	`enabled` BOOLEAN NOT NULL,
	`created_at` DATETIME NOT NULL,
	`updated_at` DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `tabela_proposta` (
	`id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
	`id_prestacao` INTEGER NOT NULL,
	`preco_hora` DOUBLE NOT NULL,
	`hora_estimada` INTEGER NOT NULL,
	`estado` ENUM('pendente', 'aceite', 'recusado') NOT NULL,
	`enabled` BOOLEAN NOT NULL,
	`created_at` DATETIME NOT NULL,
	`updated_at` DATETIME NOT NULL
);

RENAME TABLE tbl_orcamento TO tabela_orcamento;
RENAME TABLE tbl_prestacao_servicos TO tabela_prestacao_servicos;

ALTER TABLE tabela_proposta
ADD CONSTRAINT fk_prestacao_servico_proposta
FOREIGN KEY  (id_prestacao)
REFERENCES tabela_prestacao_servicos(id)
;

ALTER TABLE tabela_prestacao_servicos 
ADD CONSTRAINT id_prestador
FOREIGN KEY (id_prestador)
REFERENCES tabela_prestadores(id), 
ADD CONSTRAINT id_servico 
FOREIGN KEY (id_servico)
REFERENCES tabela_servicos(id);

ALTER TABLE tabela_prestadores
ADD COLUMN nif DECIMAL (10,0) AFTER minimo_desconto;






 