CREATE TABLE IF NOT EXISTS testdb.permissao (
	id BIGINT(20) PRIMARY KEY,
    	descricao VARCHAR(200) NOT NULL
);

-- testdb.permissao
INSERT INTO testdb.permissao (id, descricao) VALUES (1, 'ADM');
INSERT INTO testdb.permissao (id, descricao) VALUES (2, 'TRIADOR');
INSERT INTO testdb.permissao (id, descricao) VALUES (3, 'FINALIZADOR');
