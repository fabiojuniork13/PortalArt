import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListarUsuarioServiceService {

  BASE_URL = "http://localhost:3000/usuarios/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  constructor(httpClient: HttpClient) { }

  listarTodos() {
    
  }
}
