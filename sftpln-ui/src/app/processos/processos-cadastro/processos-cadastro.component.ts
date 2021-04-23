import { ProcessoService } from './../processo.service';
import { Processo } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-processos-cadastro',
  templateUrl: './processos-cadastro.component.html',
  styleUrls: ['./processos-cadastro.component.css']
})
export class ProcessosCadastroComponent implements OnInit {

  constructor(private processoService:ProcessoService) { }

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

  processo = new Processo();

  salvar(form) {
    console.log(this.processo)
   let teste = this.processoService.salvar(this.processo).subscribe(resp => console.log(resp));
  }

  criarPendenciaParecer(Processo){
    /*
    Criar o servico de parecer e injetar nessa classe,
    criar um parecer usando o id do processo retornado por funçao de criar/atualizar e cada id da lista usuarioDestino*/
  }

  get triador() {
    return Boolean(true);
  }
}
