import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {TooltipModule} from 'primeng/tooltip';
import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProcessosPesquisaComponent } from './processos-pesquisa/processos-pesquisa.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuariosPesquisaComponent,
    NavbarComponent,
    ProcessosPesquisaComponent
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    BrowserAnimationsModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
