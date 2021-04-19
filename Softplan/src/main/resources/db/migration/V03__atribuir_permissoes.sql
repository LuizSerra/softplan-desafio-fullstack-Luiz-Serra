CREATE TABLE IF NOT EXISTS usuario_permissao (
    id_usuario BIGINT(20) NOT NULL,
    id_permissao BIGINT(20) NOT NULL,
    PRIMARY KEY (id_usuario, id_permissao),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_permissao) REFERENCES permissao(id)
);


-- admin
INSERT INTO usuario_permissao (id_usuario, id_permissao) VALUES (1, 4);
INSERT INTO usuario_permissao (id_usuario, id_permissao) VALUES (1, 5);
INSERT INTO usuario_permissao (id_usuario, id_permissao) VALUES (1, 6);

--triador
INSERT INTO usuario_permissao (id_usuario, id_permissao) VALUES (2, 1);
INSERT INTO usuario_permissao (id_usuario, id_permissao) VALUES (2, 2);
INSERT INTO usuario_permissao (id_usuario, id_permissao) VALUES (2, 3);

--finalizador
INSERT INTO usuario_permissao (id_usuario, id_permissao) VALUES (3, 7);
INSERT INTO usuario_permissao (id_usuario, id_permissao) VALUES (3, 8);
