SELECT nometabela_servicos FROM tabela_utilizadores;

SELECT nome FROM tabela_servicos;

SELECT id,nome FROM tabela_servicos;

SELECT tabela_utilizadores.id FROM tabela_utilizadores, tabela_prestadores;

SELECT tabela_utilizadores.id,tabela_prestadores.id 
FROM tabela_utilizadores, tabela_prestadores;

SELECT * FROM tabela_utilizadores, tabela_prestadores;

SELECT tabela_orcamento.id,
       total,
	   tabela_utilizadores.id,
       nome
FROM tabela_orcamento,
	tabela_utilizadores
WHERE 
tabela_orcamento.id_utilizador="
34c85c60-27b3-4feb-9f7a-02e4be4eceee";

SELECT * FROM tabela_utilizadores;

SELECT * FROM tabela_utilizadores
WHERE tabela_utilizadores.id= "34c85c60-27b3-4feb-9f7a-02e4be4eceee";



