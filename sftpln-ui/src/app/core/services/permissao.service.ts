import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {

  constructor(
    private http: HttpClient,
    private handleError: ErrorHandlerService
  ) { }

  url = "http://localhost:8080/permissoes"

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
    return this.http.get<any>(this.url, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError.handleError));
  }


}


