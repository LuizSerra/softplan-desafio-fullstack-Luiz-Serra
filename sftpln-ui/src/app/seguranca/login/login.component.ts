import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './../../auth.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private jwtHelper: JwtHelperService
    ) { this.carregarToken}

  ngOnInit(): void {
  }

  jwtPayload: any;

  login( usuario: string, senha: string) {
    this.auth.login(usuario, senha).subscribe(resp => { 
      this.armazenarToken(resp.access_token);
      this.router.navigate(['/processos']); 
    });
}

obterNovoAccessToken( usuario: string, senha: string) {
  this.auth.obterNovoAccessToken().subscribe(resp => { 
    this.armazenarToken(resp.access_token);
  });
}

armazenarToken(token: string) {
  this.jwtPayload = this.jwtHelper.decodeToken(token);
  localStorage.setItem('token', token);
  localStorage.setItem('role', this.jwtPayload.authorities[0]);
}

carregarToken() {
  const token = localStorage.getItem('token');
  if (token) {
    this.armazenarToken(token);
  }
}

limparAccessToken() {
  localStorage.removeItem('token');
  this.jwtPayload = null;
}

temPermissao(permissao: string) {
  return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
}

temQualquerPermissao(roles) {
for (const role of roles) {
  if (this.temPermissao(role)) {
    return true;
  }
}
return false;
}

}
