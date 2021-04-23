import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { UsuariosModule } from './usuarios/usuarios.module';
import { ProcessosModule } from './processos/processos.module';
import { CoreModule } from './core/core.module';



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

  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
