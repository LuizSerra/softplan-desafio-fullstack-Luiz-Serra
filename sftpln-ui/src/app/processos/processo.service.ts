import { Processo } from './../core/model';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  constructor(
    private http: HttpClient,
    private handleError: ErrorHandlerService
    ) { }

  url = "http://localhost:8080/processos"

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Basic YWRtaW5Ac29mdHBsYW4uY29tOjEyMw==' })
  }

pesquisar():Observable<any> {
    return this.http.get<any>(this.url, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError.handleError));
  }

salvar(processo: Processo): Observable<Processo>  {
  //this.httpOptions.headers = this.httpOptions.headers.set('Content-Type', 'application/json');
  
  return this.http.post<Processo>(`${this.url}`, processo, this.httpOptions).pipe(
      catchError(this.handleError.handleError));;
  }

  atualizar(processo: Processo): Observable<Processo>  {
    //this.httpOptions.headers = this.httpOptions.headers.set('Content-Type', 'application/json');
    
    return this.http.post<Processo>(`${this.url}/${processo.id}`, processo, this.httpOptions).pipe(
        catchError(this.handleError.handleError));;
    }

excluir(id: number):Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError.handleError));;
  }

}

