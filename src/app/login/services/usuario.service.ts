import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from 'src/app/shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  BASE_URL = "http://localhost:8080/login/";
  FIND_URL = "http://localhost:8080/find/";
  INSERT_URL = "http://localhost:8080/insert/";
  REMOVE_URL = "http://localhost:8080/remove/";
  ALTER_URL = "http://localhost:8080/alter/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.BASE_URL, this.httpOptions);
  }

  buscarPorId(id: number): Observable<User> {
    return this.httpClient.get<User>(this.FIND_URL + id, this.httpOptions);
  }

  // inserir(usuario: User): Observable<User> {
  //   return this.httpClient.post<User>(this.BASE_URL,
  //                                     JSON.stringify(usuario),
  //                                     this.httpOptions);
  // }

  inserir(usuario: User): Observable<User> {
    return this.httpClient.post<User>(this.INSERT_URL,
                                      usuario,
                                      this.httpOptions);
  }
  
  remover(id: number): Observable<User> {
    return this.httpClient.delete<User>(this.REMOVE_URL + id, this.httpOptions);
  }

  alterar(usuario: User): Observable<User> {
    return this.httpClient.put<User>(this.ALTER_URL,
                                      usuario,
                                      this.httpOptions);
  }
}
