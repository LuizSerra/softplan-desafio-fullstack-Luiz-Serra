import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProcessoService } from 'src/app/core/services/processo.service';
import { Parecer, Processo } from 'src/app/core/model';
import { ParecerService } from 'src/app/core/services/parecer.service';

@Component({
  selector: 'app-processos-pesquisa',
  templateUrl: './processos-pesquisa.component.html',
  styleUrls: ['./processos-pesquisa.component.css']
})
export class ProcessosPesquisaComponent implements OnInit {

  constructor(
    private processoService: ProcessoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private parecerService: ParecerService,
    private jwtHelper: JwtHelperService
  ) { }

  ngOnInit(): void {
    this.pesquisar();
  }
  processos = []
  jwtPayload: any;
  parecerPendencia: Parecer;

  pesquisar() {
    this.processoService.pesquisar().subscribe((resp: Processo[]) => {

      if (this.getRole() != 'FINALIZADOR') {
        this.processos = resp;
      } else {
        this.parecerService.buscarPorIdUsuario(this.jwtPayload.id).subscribe(
          (resp: Parecer[]) => {
            for (let index = 0; index < resp.length; index++) {
              const parecer = resp[index];
              if(parecer.descricao == null)
              this.processoService.buscarPorId(parecer.id.idProcesso).subscribe(proc => this.processos.push(proc))
            }//fim do for
          }
        )
      }//fim do else
     }
    )
  }



  filtrar(filtro: String) {

    if (filtro && filtro != "") {
      this.processos = this.processos.filter((resp: Processo) => {

        if (resp.nome) {
          return resp.nome.toUpperCase().includes(filtro.toUpperCase())
        }
      });
    }
    else {
      this.pesquisar();
    }
    console.log(this.processos[0])
  }

  confirmarExclusao(processo: Processo) {
    this.confirmationService.confirm({
      message: '<h4>Tem certeza de que deseja excluir este processo?</h4>',
      accept: () => {
        this.excluir(processo);
      }
    });
  }

  excluir(processo: Processo) {
    this.processoService.excluir(processo.id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Excluído com Sucesso!', detail: `o processo ${processo.nome} foi excluído com sucesso!` });
      this.pesquisar()
    });
  }

  getRole() {
    this.jwtPayload = this.jwtHelper.decodeToken(localStorage.getItem("token"));
    return this.jwtPayload.authorities[0];
  }

  isPendent(idProcesso:Number) {
    this.parecerService.buscarPorIds(this.jwtPayload.id, idProcesso).subscribe((resp: Parecer) => this.parecerPendencia = resp);
    return this.parecerPendencia.descricao === null;
  }

}
