import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-processos-pesquisa',
  templateUrl: './processos-pesquisa.component.html',
  styleUrls: ['./processos-pesquisa.component.css']
})
export class ProcessosPesquisaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  processos = [
    {nome:'Processo de venda', descricao: "PROCESSO DE VENDA DE PRODUTOS"},
    {nome:'Processo de compra', descricao: "PROCESSO DE AQUISIÇÃO DE PRODUTOS"},
    {nome:'Processo de devolução', descricao: "PROCESSO DE DEVOLUÇÃO DE PRODUTOS"},
    {nome:'Processo de estorno', descricao: "PROCESSO DE ESTORNO DE VALORES  "}   
]

}
