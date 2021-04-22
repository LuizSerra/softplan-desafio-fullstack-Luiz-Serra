import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TooltipModule} from 'primeng/tooltip';
import {DropdownModule} from 'primeng/dropdown';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProcessosPesquisaComponent } from './processos-pesquisa/processos-pesquisa.component';
import { UsuariosCadastroComponent } from './usuarios-cadastro/usuarios-cadastro.component';
import { ProcessosCadastroComponent } from './processos-cadastro/processos-cadastro.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuariosPesquisaComponent,
    NavbarComponent,
    ProcessosPesquisaComponent,
    UsuariosCadastroComponent,
    ProcessosCadastroComponent
  ],
  imports: [
    BrowserModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
