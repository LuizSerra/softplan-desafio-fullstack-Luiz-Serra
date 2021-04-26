import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProcessosModule } from './processos/processos.module';
import { CoreModule } from './core/core.module';
import { SegurancaModule } from './seguranca/seguranca.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    HttpClientModule,

    UsuariosModule,
    ProcessosModule,
    
    AppRoutingModule,
    SegurancaModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
