CREATE TABLE tabela_categoria(
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
disignacao VARCHAR(255) NOT NULL,
icone VARCHAR(255),	
created_at DATETIME NOT NULL,
updated_at DATETIME NOT NULL
);


CREATE TABLE tabela_empresa(
id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
disignacao VARCHAR(255)NOT NULL ,
descricao VARCHAR(255) ,
localizacao VARCHAR (255) NOT NULL,
nif DOUBLE NOT NULL UNIQUE,
icone VARCHAR (255),
id_utilizador VARCHAR (255) NOT NULL,
enabled BOOLEAN NOT NULL,
created_at DATETIME NOT NULL,
updated_at DATETIME NOT NULL
);

ALTER TABLE tabela_empresa
ADD CONSTRAINT fk_utilizadores_empresa
FOREIGN KEY(id_utilizador)
REFERENCES tabela_utilizadores(id);

ALTER TABLE tabela_servicos
DROP COLUMN categoria,
ADD COLUMN id_categoria INT NULL AFTER descricao,
ADD CONSTRAINT fk_categoria_servicos
FOREIGN KEY (id_categoria)
REFERENCES tabela_categoria(id);
