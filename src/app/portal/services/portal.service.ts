import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Folder } from 'src/app/shared/models/folder.model';
import { Image } from 'src/app/shared/models/image.model';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  BASE_URL = "http://localhost:8080/archive/";
  PROPS = "http://localhost:8080/props/";
  SUB_URL = "http://localhost:8080/sub/";
  CONTR_URL = "http://localhost:8080/contract";
  httpOptions = {
    headers : new HttpHeaders ({
        'Content-Type': 'application/json'
    })
  };
  
  constructor(private httpClient: HttpClient) {}

  listarTodasAsPastas(): Observable<Folder[]> {
    return this.httpClient.get<Folder[]>(this.BASE_URL, this.httpOptions);
  }

  carregtarPropriedade(): Observable<string> {
    return this.httpClient.get<string>(this.PROPS, this.httpOptions);
  }

  listarPastas(): Observable<Folder[]> {
    return this.httpClient.get<Folder[]>(this.CONTR_URL, this.httpOptions);
  }

  abrir(dir: string): Observable<Folder[]> {
    return this.httpClient.post<Folder[]>(this.BASE_URL + "?dir=" + dir, this.httpOptions);
  }

  abrirImagem(dir: string): Observable<Image[]> {
    return this.httpClient.post<Image[]>(this.BASE_URL + "?dir=" + dir, this.httpOptions);
  }
}
