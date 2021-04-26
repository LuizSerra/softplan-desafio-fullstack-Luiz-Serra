import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { ProcessoService } from 'src/app/core/services/processo.service';
import { IdParecer, Parecer, Processo, Usuario } from './../../core/model';
import { literalArr } from '@angular/compiler/src/output/output_ast';
import { ParecerService } from 'src/app/core/services/parecer.service';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    private usuarioService: UsuarioService,
    private parecerService: ParecerService,
    private jwtHelper: JwtHelperService
  ) { }

  ngOnInit(): void {

    const processoId = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Processo');
    if (processoId) {
      this.carregarProcesso(processoId);
    }
    else {
      this.carregaUsuarios();
    }


    this.listaUsuariosOrigem =  [];
    this.listaUsuariosDestino = [];
  }

  listaUsuariosOrigem = Array<Usuario>();

  listaUsuariosDestino = Array<Usuario>();

  processo = new Processo();
  parecerEdit:Parecer;

  jwtPayload: any;
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
    this.processoService.buscarPorId(processoId).subscribe((processoEncontrado:Processo) => {
      this.processo = processoEncontrado;
      
      this.atualizarTituloEdicao();
    });
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarProcesso(form);
    } else {
      this.adicionarProcesso(form);
    }
  }

  adicionarProcesso(form: FormControl) {
    console.log(this.processo)
    this.processoService.salvar(this.processo).subscribe((processoAdicionado: Processo) => {
      if (this.listaUsuariosDestino.length > 0) {
        for (let index = 0; index < this.listaUsuariosDestino.length; index++) {
          const usuario = this.listaUsuariosDestino[index];
          let idParecer = new IdParecer();
          idParecer.idProcesso = processoAdicionado.id;
          idParecer.idUsuario = usuario.id;
          let parecer = new Parecer();
          parecer.id = idParecer;
          this.parecerService.salvar(parecer).subscribe((parecerCriado: Parecer) => console.log(parecerCriado))
        }
      }

      this.router.navigate(['/processos', processoAdicionado.id])
    });
  }

  atualizarProcesso(form: FormControl) {
    this.processoService.atualizar(this.processo).subscribe(processoAtualizado => { this.processo = processoAtualizado });
  }

  novo(form: FormControl) {
    this.listaUsuariosDestino.map(e => console.log(e))
    form.reset();
    setTimeout(function () {
      this.processo = new Processo();
    }.bind(this), 1);
    this.router.navigate(['/processos/new']);
  }

  get triador() {
    this.jwtPayload = this.jwtHelper.decodeToken(localStorage.getItem("token"));
    return this.jwtPayload.authorities[0] === 'TRIADOR';
  }
}
