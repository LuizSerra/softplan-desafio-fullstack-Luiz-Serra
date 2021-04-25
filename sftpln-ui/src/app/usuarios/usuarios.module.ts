import { UsuariosPesquisaComponent } from '../usuarios-pesquisa/usuarios-pesquisa.component';
import { UsuariosCadastroComponent } from '../usuarios-cadastro/usuarios-cadastro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [
    UsuariosCadastroComponent,
    UsuariosPesquisaComponent
  ],
  imports: [
    CommonModule,
    
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    BrowserAnimationsModule,
    TooltipModule,
    DropdownModule,
    PasswordModule,
    InputTextareaModule,
  ],
  exports: [
    UsuariosCadastroComponent,
    UsuariosPesquisaComponent
  ]
})
export class UsuariosModule { }