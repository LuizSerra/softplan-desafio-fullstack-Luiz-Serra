import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Permissao, Processo, Usuario } from 'src/app/core/model';
import { PermissaoService } from 'src/app/core/services/permissao.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-usuarios-cadastro',
  templateUrl: './usuarios-cadastro.component.html',
  styleUrls: ['./usuarios-cadastro.component.css']
})
export class UsuariosCadastroComponent implements OnInit {

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService:UsuarioService,
    private permissaoService:PermissaoService,
  ) {}

  ngOnInit(): void {
    const usuarioId = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Usuário');
    if (usuarioId) {
      this.carregarUsuario(usuarioId);
    }
    this.carregarPermissoes();
  }
  
  usuario = new Usuario();

  permissaoSelecionada:Permissao;

  permissoes:  Permissao[];

  carregarPermissoes() {
    this.permissaoService.pesquisar().subscribe((resp:Permissao[]) => this.permissoes = resp);
  }

  carregarUsuario(usuarioId: number) {
    this.usuarioService.buscarPorId(usuarioId).subscribe((resp:Usuario) => {
      this.usuario = resp
    this.atualizarTituloEdicao();
    })
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição do Usuário: ${this.usuario.nome}`);
  }
 //fazer o mesmo para processo e organizar
  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarUsuario(form);
    } else {
      this.adicionarUsuario(form);
    }
 
  }

 adicionarUsuario(form: FormControl) {
    this.usuario.permissoes.push(this.permissaoSelecionada);
    this.usuarioService.salvar(this.usuario).subscribe(usuarioAdicionado => this.router.navigate(['/usuarios', usuarioAdicionado.id]));
  }

  atualizarUsuario(form: FormControl) {
    this.usuario.ativo = true;
    this.usuarioService.atualizar(this.usuario).subscribe(usuarioAtualizado => {this.usuario = usuarioAtualizado});
  }
  
  novo(form: FormControl) {
    form.reset();
    setTimeout( function() {
      this.usuario = new Usuario();
    }.bind(this), 1);
    this.router.navigate(['/usuarios/new']);
  }

  get editando() {
    return Boolean(this.usuario.id);
  }

}
