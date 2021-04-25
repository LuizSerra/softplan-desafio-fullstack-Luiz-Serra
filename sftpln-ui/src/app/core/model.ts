export class IdParecer {
    idUsuario: number;
    idProcesso: number;
}

export class Parecer {
    id = new IdParecer();
    descricao: string
}

export class Processo {
    id: number;
    nome: string;
    descricao: string;
}

export class Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    ativo: boolean;
    permissoes: Permissao[];
}

export class Permissao {
    id: number;
    descricao: string;
}
