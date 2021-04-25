import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Processo, Usuario } from 'src/app/core/model';
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
    private usuarioService:UsuarioService
  ) {}

  ngOnInit(): void {
    const usuarioId = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Processo');
    if (usuarioId) {
      this.carregarProcesso(usuarioId);
    }
  }
  
  usuario = new Usuario();

  permissaoSelecionada = "";

  permissoes = [
    {id: 1, descricao:"ADM"},
    {id: 2, descricao:"TRIADOR"},
    {id: 3, descricao:"FINALIZADOR"}
  ];

  carregarProcesso(usuarioId: number) {
    this.usuarioService.buscarPorId(usuarioId).subscribe((resp:Usuario) => this.usuario = resp)
  }
 
  salvar(form: FormControl) {
    console.log(this.usuario)
    this.usuarioService.salvar(this.usuario).subscribe(resp => console.log(resp));
  }
  
  novo(form: FormControl) {
    form.reset();
    setTimeout( function() {
      this.processo = new Processo();
    }.bind(this), 1);
    this.router.navigate(['/processos/new']);
  }


  get editando() {
    return Boolean(false);
  }

}
