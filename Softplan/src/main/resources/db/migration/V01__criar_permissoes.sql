CREATE TABLE IF NOT EXISTS permissao (
	id BIGINT(20) PRIMARY KEY,
    	descricao VARCHAR(200) NOT NULL
);

-- permissao
INSERT INTO permissao (id, descricao) VALUES (1, 'CADASTRAR_PROCESSO');
INSERT INTO permissao (id, descricao) VALUES (2, 'PESQUISAR_PROCESSO');
INSERT INTO permissao (id, descricao) VALUES (3, 'ATRIBUIR_PROCESSO');

INSERT INTO permissao (id, descricao) VALUES (4, 'CADASTRAR_USUARIO');
INSERT INTO permissao (id, descricao) VALUES (5, 'REMOVER_USUARIO');
INSERT INTO permissao (id, descricao) VALUES (6, 'PESQUISAR_USUARIO');

INSERT INTO permissao (id, descricao) VALUES (7, 'CADASTRAR_PARECER');
INSERT INTO permissao (id, descricao) VALUES (8, 'PESQUISAR_PARECER');
