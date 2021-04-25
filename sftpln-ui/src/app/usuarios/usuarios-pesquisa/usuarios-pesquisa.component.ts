
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Usuario } from 'src/app/core/model';
import { PermissaoService } from 'src/app/core/services/permissao.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-usuarios-pesquisa',
  templateUrl: './usuarios-pesquisa.component.html',
  styleUrls: ['./usuarios-pesquisa.component.css']
})
export class UsuariosPesquisaComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,
    private messageService:MessageService
    ) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  usuarios = [];

  pesquisar() {
    this.usuarioService.pesquisar().subscribe((resp: Usuario[]) => this.usuarios = resp);
  }

  filtrar(filtro: String) {

    if (filtro && filtro != "") {
      this.usuarios = this.usuarios.filter((resp: Usuario) => {

        if (resp.nome) {
         return resp.nome.toUpperCase().includes(filtro.toUpperCase()) || resp.email.toUpperCase().includes(filtro.toUpperCase())
        }
      });
    }
    else {
      this.pesquisar();
    }
  }

  confirmarExclusao(processo: any) {
    this.confirmationService.confirm({
      message: '<h4>Tem certeza de que deseja excluir este usuário?</h4>',
      accept: () => {
          this.excluir(processo);
      }
  });
  }

  excluir(usuario: Usuario) {
    this.usuarioService.excluir(usuario.id).subscribe(() => {
      this.messageService.add({severity:'success', summary:'Excluído com Sucesso!', detail:`o usuário ${usuario.nome} foi excluído com sucesso!`});
      this.pesquisar()
    });
  }
}
