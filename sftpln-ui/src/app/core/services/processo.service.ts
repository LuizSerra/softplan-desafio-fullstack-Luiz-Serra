
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler.service';
import { Processo } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  constructor(
    private http: HttpClient,
    private handleError: ErrorHandlerService
  ) { }

  url = "http://localhost:8080/processos"

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
    return this.http.get<any>(this.url, this.httpOptions)
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

  salvar(processo: Processo): Observable<Processo> {
    this.httpOptions.headers = this.httpOptions.headers.append('Content-Type', 'application/json');

    return this.http.post<Processo>(`${this.url}`, processo, this.httpOptions).pipe(
      catchError(this.handleError.handleError));;
  }

  atualizar(processo: Processo): Observable<Processo> {
    this.httpOptions.headers = this.httpOptions.headers.append('Content-Type', 'application/json');

    return this.http.put<Processo>(`${this.url}/${processo.id}`, processo, this.httpOptions).pipe(
      catchError(this.handleError.handleError));;
  }

  excluir(id: number): Observable<void> {
    this.httpOptions.headers = this.httpOptions.headers.append('Content-Type', 'application/json');
    return this.http.delete<void>(`${this.url}/${id}`, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError.handleError));;
  }

}

