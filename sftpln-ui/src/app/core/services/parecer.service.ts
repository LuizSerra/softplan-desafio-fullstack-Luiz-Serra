import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler.service';
import { Parecer, Usuario } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ParecerService {

  constructor(
    private http: HttpClient,
    private handleError: ErrorHandlerService
  ) { }

  url = "http://localhost:8080/pareceres"

  //Usado na autenticação básica
  // httpOptions = {
  //   headers: new HttpHeaders({ 'Authorization': 'Basic YW5ndWxhcjo0TkdVMTRS' , 'Content-Type':'application/x-www-form-urlencoded' }),
  //   withCredentials: true
  // }

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` , 'Content-Type':'application/x-www-form-urlencoded' }),
    withCredentials: true
  }

  pesquisar(): Observable<any> {
    return this.http.get<any>(`${this.url}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError.handleError));
  }

  buscarPorIds(idUsuario:Number, idProcesso:Number): Observable<any> {
    return this.http.get<any>(`${this.url}/${idUsuario}/${idProcesso}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError.handleError));
  }  

  buscarPorIdProcesso(idProcesso:Number): Observable<any> {
    return this.http.get<any>(`${this.url}/processo/${idProcesso}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError.handleError));
  }  

  buscarPorIdUsuario(idUsuario:Number): Observable<any> {
    return this.http.get<any>(`${this.url}/usuario/${idUsuario}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError.handleError));
  }  

  salvar(parecer: Parecer): Observable<Parecer> {
    return this.http.post<Parecer>(`${this.url}`, parecer, this.httpOptions).pipe(
      catchError(this.handleError.handleError));;
  }

  atualizar(parecer: Parecer): Observable<Parecer> {
    return this.http.put<Parecer>(`${this.url}/${parecer.id.idUsuario}/${parecer.id.idProcesso}`, parecer, this.httpOptions).pipe(
      catchError(this.handleError.handleError));;
  }

}
