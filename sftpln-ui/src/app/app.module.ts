import { UsuariosModule } from './usuarios/usuarios.module';
import { ProcessosModule } from './processos/processos.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { NavbarComponent } from './core/navbar/navbar.component';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    UsuariosModule,
    ProcessosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
