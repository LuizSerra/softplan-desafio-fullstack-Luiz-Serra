import { UsuariosCadastroComponent } from './usuarios-cadastro/usuarios-cadastro.component';
import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';
import { ProcessosCadastroComponent } from './processos/processos-cadastro/processos-cadastro.component';
import { ProcessosPesquisaComponent } from './processos/processos-pesquisa/processos-pesquisa.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { UsuariosModule } from './usuarios/usuarios.module';
import { ProcessosModule } from './processos/processos.module';
import { CoreModule } from './core/core.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'processos', component: ProcessosPesquisaComponent},
  {path: 'processos/new', component: ProcessosCadastroComponent},
  {path: 'processos/:id', component: ProcessosCadastroComponent},
  {path: 'usuarios', component: UsuariosPesquisaComponent},
  {path: 'usuarios/new', component: UsuariosCadastroComponent},
  {path: 'usuarios/:id', component: UsuariosCadastroComponent},
]

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

    RouterModule.forRoot(routes)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
