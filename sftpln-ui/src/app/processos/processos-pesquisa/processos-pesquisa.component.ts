import { ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProcessoService } from 'src/app/core/services/processo.service';
import { Processo } from 'src/app/core/model';

@Component({
  selector: 'app-processos-pesquisa',
  templateUrl: './processos-pesquisa.component.html',
  styleUrls: ['./processos-pesquisa.component.css']
})
export class ProcessosPesquisaComponent implements OnInit {

  constructor(
    private processoService: ProcessoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.pesquisar();
  }
  processos = []

  pesquisar() {
    this.processoService.pesquisar().subscribe(resp => this.processos = resp);
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

}
