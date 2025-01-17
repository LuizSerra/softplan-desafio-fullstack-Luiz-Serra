CREATE TABLE IF NOT EXISTS testdb.processo (
	id BIGINT(20) generated by default as identity PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
    	descricao VARCHAR(200) NOT NULL
);

INSERT INTO testdb.processo (nome, descricao) VALUES ('testdb.processo DE COMPRA', 'testdb.processo DE AQUISIÇÃO DE PRODUTOS');
INSERT INTO testdb.processo (nome, descricao) VALUES ('testdb.processo DE VENDA', 'testdb.processo DE VENDA DE PRODUTOS');
INSERT INTO testdb.processo (nome, descricao) VALUES ('testdb.processo DE ESTORNO', 'testdb.processo DE ESTORNO DE VALORES');
INSERT INTO testdb.processo (nome, descricao) VALUES ('testdb.processo DEVOLUTIVO', 'testdb.processo DE DEVOLUÇÃO DE PRODUTOS');

CREATE TABLE IF NOT EXISTS testdb.parecer (
    id_usuario BIGINT(20) NOT NULL,
    id_processo BIGINT(20) NOT NULL,
    descricao VARCHAR(200) NOT NULL,
        
    PRIMARY KEY (id_usuario, id_processo),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_processo) REFERENCES testdb.processo(id)
);


INSERT INTO testdb.parecer (id_usuario, id_processo, descricao) VALUES (3, 1, 'A COMPRA PODE SER EFETUADA SEM LICITAÇÃO');
