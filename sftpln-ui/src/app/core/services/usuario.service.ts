import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler.service';
import { Usuario } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private handleError: ErrorHandlerService
  ) { }

  url = "http://localhost:8080/usuarios"

  //Usado na autenticação básica
  // httpOptions = {
  //   headers: new HttpHeaders({ 'Authorization': 'Basic YW5ndWxhcjo0TkdVMTRS' , 'Content-Type':'application/x-www-form-urlencoded' }),
  //   withCredentials: true
  // }

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}`}),
    withCredentials: true
  }


  pesquisar(): Observable<any> {
    this.httpOptions.headers.append('Content-Type' ,'application/x-www-form-urlencoded');
    return this.http.get<any>(`${this.url}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError.handleError));
  }

  pesquisarAtivos(): Observable<any> {
    this.httpOptions.headers.append('Content-Type' ,'application/x-www-form-urlencoded');
    return this.http.get<any>(`${this.url}/ativos`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError.handleError));
  }

  buscarPorId(id:Number): Observable<any> {
    this.httpOptions.headers.append('Content-Type' ,'application/x-www-form-urlencoded');
    return this.http.get<any>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError.handleError));
  }  

  salvar(usuario: Usuario): Observable<Usuario> {
    this.httpOptions.headers = this.httpOptions.headers.append('Content-Type', 'application/json');
    return this.http.post<Usuario>(`${this.url}`, usuario, this.httpOptions).pipe(
      catchError(this.handleError.handleError));;
  }

  atualizar(usuario: Usuario): Observable<Usuario> {
    this.httpOptions.headers = this.httpOptions.headers.append('Content-Type', 'application/json');
    return this.http.put<Usuario>(`${this.url}/${usuario.id}`, usuario, this.httpOptions).pipe(
      catchError(this.handleError.handleError));;
  }

  excluir(id: number): Observable<void> {
    this.httpOptions.headers = this.httpOptions.headers.append('Content-Type', 'application/json');
    return this.http.delete<void>(`${this.url}/${id}`, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError.handleError));;
  }


}
