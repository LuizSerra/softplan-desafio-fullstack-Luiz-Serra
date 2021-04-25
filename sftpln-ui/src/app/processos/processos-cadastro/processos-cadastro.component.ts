import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { ProcessoService } from 'src/app/core/services/processo.service';
import { Processo, Usuario } from './../../core/model';

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
    private processoService: ProcessoService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {

    const processoId = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Processo');
    if (processoId) {
      this.carregarProcesso(processoId);
    }

    if (this.editando) {
      this.carregarPareceres();
    }
    else {
      this.carregaUsuarios();
    }


    this.listaUsuariosOrigem =
      this.listaUsuariosDestino = [];
  }

  usuarios = []

  listaUsuariosOrigem = Array<Usuario>();

  listaUsuariosDestino= Array<Usuario>();

  processo = new Processo();

  get editando() {
    return Boolean(this.processo.id);
  }

  carregarPareceres() {
    throw new Error('Method not implemented.');
  }
  
  carregaUsuarios() {
    this.usuarioService.pesquisar().subscribe((usuarios: Usuario[]) => this.listaUsuariosOrigem = usuarios);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição do Processo: ${this.processo.nome}`);
  }

  carregarProcesso(processoId: number) {
    this.processoService.buscarPorId(processoId).subscribe(resp => {
      this.processo = resp
      this.atualizarTituloEdicao();
    });
  }

  adicionarProcesso(form: FormControl) {
    console.log(this.processo)
    this.processoService.salvar(this.processo).subscribe(processoAdicionado => {
      
      
      this.router.navigate(['/processos', processoAdicionado.id])
  });
  }

  atualizarProcesso(form: FormControl) {
    this.processoService.atualizar(this.processo).subscribe(processoAtualizado => { this.processo = processoAtualizado });
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarProcesso(form);
    } else {
      this.adicionarProcesso(form);
    }
  }
  

  criarPendenciaParecer(processo: Processo) {
    /*
    Criar o servico de parecer e injetar nessa classe,
    criar um parecer usando o id do processo retornado por funçao de criar/atualizar e cada id da lista usuarioDestino*/
  }

  novo(form: FormControl) {
    this.listaUsuariosDestino.map(e=> console.log(e))
    form.reset();
    setTimeout(function () {
      this.processo = new Processo();
    }.bind(this), 1);
    this.router.navigate(['/processos/new']);
  }

  get triador() {
    return Boolean(true);
  }
}
