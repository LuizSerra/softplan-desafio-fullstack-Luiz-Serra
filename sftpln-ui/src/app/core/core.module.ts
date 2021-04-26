import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

import { NavbarComponent } from './navbar/navbar.component';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent],
  imports: [
    CommonModule,

    ConfirmDialogModule,
    ToastModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent,
    ConfirmDialogModule,
    ToastModule,
    ],
  providers: [
    MessageService,
    ConfirmationService,
       { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
