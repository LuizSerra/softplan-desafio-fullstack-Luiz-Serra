import { Component, OnInit } from '@angular/core';
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
    ) { this.carregarToken()}

  ngOnInit(): void {
  }

  jwtPayload: any;

  login( usuario: string, senha: string) {
    this.auth.login(usuario, senha).subscribe(resp => { 
      this.armazenarToken(resp.access_token);
      this.router.navigate(['/processos']); 
    }
    )
}

armazenarToken(token: string) {
  console.log(` aaaa ${JSON.stringify(this.jwtPayload)}`)
  localStorage.setItem('token', token);
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

}
