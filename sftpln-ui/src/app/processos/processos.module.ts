import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessosCadastroComponent } from './processos-cadastro/processos-cadastro.component';
import { FormsModule } from '@angular/forms';
import { ProcessosPesquisaComponent } from './processos-pesquisa/processos-pesquisa.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProcessosPesquisaComponent,
    ProcessosCadastroComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    
    InputTextModule,
    ButtonModule,
    TableModule,
    BrowserAnimationsModule,
    TooltipModule,
    DropdownModule,
    PasswordModule,
    PickListModule,
    InputTextareaModule
  ],
  exports: [
    ProcessosPesquisaComponent,
    ProcessosCadastroComponent
  ]
})
export class ProcessosModule { }
