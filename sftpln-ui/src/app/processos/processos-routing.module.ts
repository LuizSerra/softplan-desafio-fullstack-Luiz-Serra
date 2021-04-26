import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessosPesquisaComponent } from './processos-pesquisa/processos-pesquisa.component';
import { ProcessosCadastroComponent } from './processos-cadastro/processos-cadastro.component';


const routes: Routes = [
    {path: 'processos', component: ProcessosPesquisaComponent},
    {path: 'processos/new', component: ProcessosCadastroComponent},
    {path: 'processos/:id', component: ProcessosCadastroComponent},
  ]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class ProcessosRoutingModule { }