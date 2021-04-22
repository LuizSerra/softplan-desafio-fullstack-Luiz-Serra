import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios-cadastro',
  templateUrl: './usuarios-cadastro.component.html',
  styleUrls: ['./usuarios-cadastro.component.css']
})
export class UsuariosCadastroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  permissaoSelecionada = "";
  permissoes = [
    {id: 1, descricao:"ADM"},
    {id: 2, descricao:"TRIADOR"},
    {id: 3, descricao:"FINALIZADOR"}
  ];

  salvar(form) {
    console.log(form)
  }

  get editando() {
    return Boolean(false);
  }

}
