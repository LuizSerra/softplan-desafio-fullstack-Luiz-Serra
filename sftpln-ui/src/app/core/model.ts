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

