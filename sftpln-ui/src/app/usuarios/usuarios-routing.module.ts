
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuariosCadastroComponent } from './usuarios-cadastro/usuarios-cadastro.component';
import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';


const routes: Routes = [
    { path: 'usuarios', component: UsuariosPesquisaComponent },
    { path: 'usuarios/new', component: UsuariosCadastroComponent },
    { path: 'usuarios/:id', component: UsuariosCadastroComponent },
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }
