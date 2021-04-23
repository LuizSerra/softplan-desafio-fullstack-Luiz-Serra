import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

import { NavbarComponent } from './navbar/navbar.component';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,

    ConfirmDialogModule,
    ToastModule
  ],
  exports: [
    NavbarComponent,
    ConfirmDialogModule,
    ToastModule],
  providers: [
    MessageService,
    ConfirmationService,
       { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
