import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './core/error-handler.service';
import { catchError, retry } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private handleError: ErrorHandlerService,
    private jwtHelper: JwtHelperService
    ) { }


  ouathTokenUrl = "http://localhost:8080/oauth/token";
  

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Basic YW5ndWxhcjo0TkdVMTRS' , 'Content-Type':'application/x-www-form-urlencoded' }),
    withCredentials: true
  }

  login(usuario: string, senha: string): Observable<any> {
    
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    console.log(this.httpOptions)
    return this.http.post<any>(this.ouathTokenUrl, body, this.httpOptions).pipe(
        retry(2),
        catchError(this.handleError.handleError));
    
    }

    obterNovoAccessToken(): Observable<any> {
      
      const body = `grant_type=refresh_token`;
  
      return this.http.post<any>(this.ouathTokenUrl, body,this.httpOptions).pipe(retry(2),
      catchError(this.handleError.handleError));
       
    }

    
}



