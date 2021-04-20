CREATE TABLE IF NOT EXISTS testdb.usuario_permissao (
    id_usuario BIGINT(20) NOT NULL,
    id_permissao BIGINT(20) NOT NULL,
    PRIMARY KEY (id_usuario, id_permissao),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_permissao) REFERENCES permissao(id)
);


-- admin
INSERT INTO testdb.usuario_permissao (id_usuario, id_permissao) VALUES (1, 1);

--triador
INSERT INTO testdb.usuario_permissao (id_usuario, id_permissao) VALUES (2, 2);

--finalizador
INSERT INTO testdb.usuario_permissao (id_usuario, id_permissao) VALUES (3, 3);
