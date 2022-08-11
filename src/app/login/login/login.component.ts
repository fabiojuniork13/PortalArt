import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { Login } from 'src/app/shared/models/login.model';
import { User } from 'src/app/shared/models/user.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin!: NgForm;

  login: Login = new Login();
  loading: boolean = false;
  message!: string;

  constructor(private loginService: LoginService, 
              private router: Router,
              private route: ActivatedRoute,
              private idleService: BnNgIdleService) {
    if(this.loginService.usuarioLogado) {
      this.router.navigate(['/portal']);
    }
  }

  ngOnInit(): void {
    this.idleService.stopTimer();
    this.route.queryParams
              .subscribe(params => {
                this.message = params['error'];
              });
  }

  logar(): void {
    this.loading = true;
    if(this.formLogin.form.valid) {
      this.loginService.login(this.login).subscribe((usu) => {
        if(usu != null) {
          this.loginService.usuarioLogado = usu;
          this.loading = false;
          this.router.navigate(['/portal']);
        }
        else {
          this.loading = false;
          this.message = "Usuário/Senha inválidos.";
        }
      });
    }
    this.loading = false;
  }

  // login(): void {
  //   if(this.formLogin.form.valid) {
  //     let login = this.loginService.doLogin(this.user.nickname, this.user.password);
  //     if(login === 200) {
  //       this.router.navigate( ['/portal'] )
  //     }
  //   }
  // }

  
}

