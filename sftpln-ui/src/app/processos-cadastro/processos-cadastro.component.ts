import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-processos-cadastro',
  templateUrl: './processos-cadastro.component.html',
  styleUrls: ['./processos-cadastro.component.css']
})
export class ProcessosCadastroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.listaUsuariosOrigem = this.usuarios;
    this.listaUsuariosDestino = [];
  }

  usuarios = [
    {nome:'Peter Parker', email: "peter@shield.com"},
    {nome:'Nathasha Romanov', email: "nath@shield.com"},
    {nome:'Tony Stark', email: "tony.stark@shield.com"},
    {nome:'Bruce Banner', email: "bruce@shield.com"},
    {nome:'Steve Rogers', email: "cap@shield.com"}          
]
  listaUsuariosOrigem: any[];

  listaUsuariosDestino: any[];

  salvar(form) {
    console.log(form)
  }

  get editando() {
    return Boolean(false);
  }
}
