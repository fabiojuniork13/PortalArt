import { Injectable } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { Login } from 'src/app/shared/models/login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const LS_CHAVE: string = "usuarioLogado";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  BASE_URL = "http://localhost:8080/login/";
  LOAD = "http://localhost:8080/load/";
  httpOptions = {
    headers : new HttpHeaders ({
        'Content-Type': 'application/json'
    })
  };
  
  constructor(private httpClient: HttpClient) {}

  public get usuarioLogado(): User {
    let usu = localStorage[LS_CHAVE];
    return (usu ? JSON.parse(localStorage[LS_CHAVE]) : null);
  }

  public set usuarioLogado(usuario: User) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }

  logout() {
    delete localStorage[LS_CHAVE];
  }

  // constructor(private userService: UserService) { }

  // doLogin( userLogin: string | undefined, passwordLogin: string | undefined): number | undefined {

  //   if(userLogin !== undefined && passwordLogin !== undefined) {
  //     const users = this.userService.listUsers();
  //     let userReceive = users.find(user => user.nickname === userLogin);
  
  //     if( userReceive?.password === passwordLogin) {
  //       return 200;
  //     }
  //   }
    
  //   return 0;
  // }

  // login(login: Login): Observable<User | null> {
  //   let usu = new User(1, "fabio.santos",
  //                       login.usuario, login.senha, "FUNC");
  //   if(login.usuario == login.senha) {
  //     if(login.usuario == "admin") {
  //       usu = new User(1, "fabio.santos",
  //                       login.usuario, login.senha, "ADMIN");
  //     }
  //     else if(login.usuario == "gerente") {
  //       usu = new User(1, "fabio.santos",
  //                       login.usuario, login.senha, "GERENTE");
  //       return of(usu);
  //     }
  //     else {
  //       return of(null);
  //     }
  //   }
  //   return of(usu);
  // }

  login(login: Login): Observable<User> {
    return this.httpClient.post<User>(this.BASE_URL,
                                      login,
                                      this.httpOptions);
  }

  time(): Observable<string> {
    return this.httpClient.get<string>(this.LOAD,
                                      this.httpOptions);
  }

}
