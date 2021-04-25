import { ProcessoService } from './../processo.service';
import { Processo } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-processos-cadastro',
  templateUrl: './processos-cadastro.component.html',
  styleUrls: ['./processos-cadastro.component.css']
})
export class ProcessosCadastroComponent implements OnInit {

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private processoService:ProcessoService
    ) { }

  ngOnInit(): void {

    const processoId = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Processo');
    if (processoId) {
      this.carregarProcesso(processoId);
    }
    this.carregaUsuarios();
   // this.carregarPareceres();

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


  carregarPareceres() {
    throw new Error('Method not implemented.');
  }
  carregaUsuarios() {
    this.listaUsuariosOrigem = this.usuarios;
  }

  carregarProcesso(processoId: number) {
    this.processoService.buscarPorId(processoId).subscribe(resp => this.processo = resp)
  }
 
  salvar(form: FormControl) {
    console.log(this.processo)
    this.processoService.salvar(this.processo).subscribe(resp => console.log(resp));
  }
  
  criarPendenciaParecer(processo: Processo){
    /*
    Criar o servico de parecer e injetar nessa classe,
    criar um parecer usando o id do processo retornado por funçao de criar/atualizar e cada id da lista usuarioDestino*/
  }
  
  novo(form: FormControl) {
    form.reset();
    setTimeout( function() {
      this.processo = new Processo();
    }.bind(this), 1);
    this.router.navigate(['/processos/new']);
  }


  get triador() {
    return Boolean(true);
  }
}
