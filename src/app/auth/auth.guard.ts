import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/services/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router 
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const usuarioLogado = this.loginService.usuarioLogado;
      let url = state.url;
      if(usuarioLogado) {
        if(route.data?.['role'] && route.data?.['role'].indexOf(usuarioLogado.perfil)===-1) {
          // se o perfil do usuario não está no perfil de rota
          // vai para a tela de login
          this.router.navigate(['/login'],
                          { queryParams: {error: "Proibido o acesso a " + url}});
          return false;
        } 
        // em qual quer outro caso, permite o acesso
        return true;
      }
      // se não está logado, vai para login
      this.router.navigate(['/login'],
                      { queryParams: {error: "Deve fazer o login antes de acessar " + url }});
      return false;
  }
  
}
