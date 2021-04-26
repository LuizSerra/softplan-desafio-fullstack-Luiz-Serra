CREATE TABLE IF NOT EXISTS testdb.permissao (
	id BIGINT(20) PRIMARY KEY,
    	descricao VARCHAR(200) NOT NULL
);

-- testdb.permissao
INSERT INTO testdb.permissao (id, descricao) VALUES (1, 'ADM');
INSERT INTO testdb.permissao (id, descricao) VALUES (2, 'TRIADOR');
INSERT INTO testdb.permissao (id, descricao) VALUES (3, 'FINALIZADOR');



CREATE TABLE IF NOT EXISTS testdb.usuario (
    id BIGINT(20)  generated by default as identity PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(150) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);



INSERT INTO testdb.usuario (nome, email, senha, ativo) VALUES ('ADMINISTRADOR', 'admin@softplan.com', '$2a$10$CBHOY7qH9eMAKQuxPycIu.9psD27tnyPKzJUgsEg3hkwC/As0OJSi', true );
INSERT INTO testdb.usuario (nome, email, senha, ativo) VALUES ('TRIADOR', 'triador@softplan.com', '$2a$10$CBHOY7qH9eMAKQuxPycIu.9psD27tnyPKzJUgsEg3hkwC/As0OJSi', true );
INSERT INTO testdb.usuario (nome, email, senha, ativo) VALUES ('FINALIZADOR', 'finalizador@softplan.com', '$2a$10$CBHOY7qH9eMAKQuxPycIu.9psD27tnyPKzJUgsEg3hkwC/As0OJSi', true );
INSERT INTO testdb.usuario (nome, email, senha, ativo) VALUES ('Tony Stark', 'tony.stark@shield.com', '$2a$10$CBHOY7qH9eMAKQuxPycIu.9psD27tnyPKzJUgsEg3hkwC/As0OJSi', true );
INSERT INTO testdb.usuario (nome, email, senha, ativo) VALUES ('Steve Rogers', 'cap@shield.com', '$2a$10$CBHOY7qH9eMAKQuxPycIu.9psD27tnyPKzJUgsEg3hkwC/As0OJSi', true );
INSERT INTO testdb.usuario (nome, email, senha, ativo) VALUES ('Peter Parker', 'peter@shield.com', '$2a$10$CBHOY7qH9eMAKQuxPycIu.9psD27tnyPKzJUgsEg3hkwC/As0OJSi', true );
INSERT INTO testdb.usuario (nome, email, senha, ativo) VALUES ('Nathasha Romanov', 'nath@shield.com', '$2a$10$CBHOY7qH9eMAKQuxPycIu.9psD27tnyPKzJUgsEg3hkwC/As0OJSi', true );
INSERT INTO testdb.usuario (nome, email, senha, ativo) VALUES ('Bruce Banner', 'bruce@shield.com', '$2a$10$CBHOY7qH9eMAKQuxPycIu.9psD27tnyPKzJUgsEg3hkwC/As0OJSi', true );
INSERT INTO testdb.usuario (nome, email, senha, ativo) VALUES ('Bucky Barnes', 'bucky@shield.com', '$2a$10$CBHOY7qH9eMAKQuxPycIu.9psD27tnyPKzJUgsEg3hkwC/As0OJSi', true );
INSERT INTO testdb.usuario (nome, email, senha, ativo) VALUES ('Sam Wilson', 'sam@shield.com', '$2a$10$CBHOY7qH9eMAKQuxPycIu.9psD27tnyPKzJUgsEg3hkwC/As0OJSi', true );
INSERT INTO testdb.usuario (nome, email, senha, ativo) VALUES ('Thor', 'thor.odinson@shield.com', '$2a$10$CBHOY7qH9eMAKQuxPycIu.9psD27tnyPKzJUgsEg3hkwC/As0OJSi', true );
INSERT INTO testdb.usuario (nome, email, senha, ativo) VALUES ('Wanda Maximoff', 'wanda@shield.com', '$2a$10$CBHOY7qH9eMAKQuxPycIu.9psD27tnyPKzJUgsEg3hkwC/As0OJSi', true );


CREATE TABLE IF NOT EXISTS testdb.usuario_permissao (
    id_usuario BIGINT(20) NOT NULL,
    id_permissao BIGINT(20) NOT NULL,
    PRIMARY KEY (id_usuario, id_permissao),
    FOREIGN KEY (id_usuario) REFERENCES testdb.usuario(id),
    FOREIGN KEY (id_permissao) REFERENCES testdb.permissao(id)
    ON DELETE CASCADE
 ON UPDATE CASCADE
);


-- admin
INSERT INTO testdb.usuario_permissao (id_usuario, id_permissao) VALUES (1, 1);
INSERT INTO testdb.usuario_permissao (id_usuario, id_permissao) VALUES (4, 1);
INSERT INTO testdb.usuario_permissao (id_usuario, id_permissao) VALUES (5, 1);

--triador
INSERT INTO testdb.usuario_permissao (id_usuario, id_permissao) VALUES (2, 2);
INSERT INTO testdb.usuario_permissao (id_usuario, id_permissao) VALUES (6, 2);
INSERT INTO testdb.usuario_permissao (id_usuario, id_permissao) VALUES (7, 2);

--finalizador
INSERT INTO testdb.usuario_permissao (id_usuario, id_permissao) VALUES (3, 3);
INSERT INTO testdb.usuario_permissao (id_usuario, id_permissao) VALUES (8, 3);
INSERT INTO testdb.usuario_permissao (id_usuario, id_permissao) VALUES (9, 3);
INSERT INTO testdb.usuario_permissao (id_usuario, id_permissao) VALUES (10, 3);
INSERT INTO testdb.usuario_permissao (id_usuario, id_permissao) VALUES (11, 3);
INSERT INTO testdb.usuario_permissao (id_usuario, id_permissao) VALUES (12, 3);


CREATE TABLE IF NOT EXISTS testdb.processo (
	id BIGINT(20) generated by default as identity PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
    	descricao VARCHAR(200)
);

INSERT INTO testdb.processo (nome, descricao) VALUES ('PROCESSO DE COMPRA', 'PROCESSO DE AQUISIÇÃO DE PRODUTOS');
INSERT INTO testdb.processo (nome, descricao) VALUES ('PROCESSO DE VENDA', 'PROCESSO DE VENDA DE PRODUTOS');
INSERT INTO testdb.processo (nome, descricao) VALUES ('PROCESSO DE ESTORNO', 'PROCESSO DE ESTORNO DE VALORES');
INSERT INTO testdb.processo (nome, descricao) VALUES ('PROCESSO DEVOLUTIVO', 'PROCESSO DE DEVOLUÇÃO DE PRODUTOS');
INSERT INTO testdb.processo (nome, descricao) VALUES ('PROCESSO DE MUDANÇA', 'PROCESSO DE MUDANÇA DE SITE');
INSERT INTO testdb.processo (nome, descricao) VALUES ('PROCESSO DE CONTRATAÇÃO', 'PROCESSO DE CONTRATAÇÃO DE SERVIÇOS');
INSERT INTO testdb.processo (nome, descricao) VALUES ('PROCESSO DE MONTAGEM', 'PROCESSO DE MONTAGEM DE PRODUTOS');
INSERT INTO testdb.processo (nome, descricao) VALUES ('PROCESSO DE DESCARTE', 'PROCESSO DE DESCARTE DE PRODUTOS');
INSERT INTO testdb.processo (nome, descricao) VALUES ('PROCESSO DE ALUGUEL', 'PROCESSO DE ALUGUEL DE IMÓVEL');
INSERT INTO testdb.processo (nome, descricao) VALUES ('PROCESSO DE ALOCAÇÂO', 'PROCESSO DE ALOCAÇÂO DE RECURSOS');
INSERT INTO testdb.processo (nome, descricao) VALUES ('PROCESSO DE ARRENDAMENTO', 'PROCESSO DE ARRENDAMENTO DE IMÓVEL');
INSERT INTO testdb.processo (nome, descricao) VALUES ('PROCESSO DE INTERMEDIAÇÂO', 'PROCESSO DE INTERMEDIAÇÂO DE CONTRATO');



CREATE TABLE IF NOT EXISTS testdb.parecer (
    id_usuario BIGINT(20) NOT NULL,
    id_processo BIGINT(20) NOT NULL,
    descricao VARCHAR(200),
        
    PRIMARY KEY (id_usuario, id_processo),
    FOREIGN KEY (id_usuario) REFERENCES testdb.usuario(id),
    FOREIGN KEY (id_processo) REFERENCES testdb.processo(id)
    ON DELETE CASCADE
 ON UPDATE CASCADE
);


INSERT INTO testdb.parecer (id_usuario, id_processo) VALUES (3, 1);
INSERT INTO testdb.parecer (id_usuario, id_processo, descricao) VALUES (3, 2, 'Aprovado');
INSERT INTO testdb.parecer (id_usuario, id_processo, descricao) VALUES (8, 3, 'Rejeitado');
INSERT INTO testdb.parecer (id_usuario, id_processo) VALUES (9, 2);
INSERT INTO testdb.parecer (id_usuario, id_processo, descricao) VALUES (10, 4, 'A COMPRA PODE SER EFETUADA SEM LICITAÇÃO');
INSERT INTO testdb.parecer (id_usuario, id_processo) VALUES (3, 5);