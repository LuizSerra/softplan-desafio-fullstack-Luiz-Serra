import { ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ProcessoService } from '../processo.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-processos-pesquisa',
  templateUrl: './processos-pesquisa.component.html',
  styleUrls: ['./processos-pesquisa.component.css']
})
export class ProcessosPesquisaComponent implements OnInit {

  constructor(
    private processoService: ProcessoService,
    private confirmationService: ConfirmationService,
    private messageService:MessageService
    ) { }

  ngOnInit(): void {
    this.pesquisar();
  }
  processos = []

  pesquisar() {
    this.processoService.pesquisar().subscribe(resp => this.processos = resp);
  }

  filtrar(filtro: String) {
    if(filtro && filtro != "") {
      this.processos = this.processos.filter(resp => resp.nome.toUpperCase().includes(filtro.toUpperCase()));
    }
    else{
      this.pesquisar();
    }
  }

  confirmarExclusao(processo: any) {
    this.confirmationService.confirm({
      message: '<h4>Tem certeza de que deseja excluir este processo?</h4>',
      accept: () => {
          this.excluir(processo);
      }
  });
  }

  excluir(processo: any) {
    this.processoService.excluir(processo.id).subscribe(() => {
      this.messageService.add({severity:'success', summary:'Excluído com Sucesso!', detail:`o processo ${processo.nome} foi excluído com sucesso!`});
      this.pesquisar()
    });
  }

}
