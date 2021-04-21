import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios-pesquisa',
  templateUrl: './usuarios-pesquisa.component.html',
  styleUrls: ['./usuarios-pesquisa.component.css']
})
export class UsuariosPesquisaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  usuarios = [
    {nome:'Peter Parker', email: "peter@shield.com"},
    {nome:'Nathasha Romanov', email: "nath@shield.com"},
    {nome:'Anthony Stark', email: "tony.stark@shield.com"},
    {nome:'Bruce Banner', email: "bruce@shield.com"},
    {nome:'Steve Rogers', email: "cap@shield.com"}          
]

}
