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

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Basic YWRtaW5Ac29mdHBsYW4uY29tOjEyMw==' })
  }

  pesquisar(): Observable<any> {
    return this.http.get<any>(`${this.url}/ativos`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError.handleError));
  }

  buscarPorId(id:Number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError.handleError));
  }  

  salvar(usuario: Usuario): Observable<Usuario> {
    //this.httpOptions.headers = this.httpOptions.headers.set('Content-Type', 'application/json');

    return this.http.post<Usuario>(`${this.url}`, usuario, this.httpOptions).pipe(
      catchError(this.handleError.handleError));;
  }

  atualizar(usuario: Usuario): Observable<Usuario> {
    //this.httpOptions.headers = this.httpOptions.headers.set('Content-Type', 'application/json');

    return this.http.post<Usuario>(`${this.url}/${usuario.id}`, usuario, this.httpOptions).pipe(
      catchError(this.handleError.handleError));;
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError.handleError));;
  }


}
