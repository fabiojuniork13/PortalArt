import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user/services/user.service';
import { LoginService } from './services/login.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatProgressBarModule
  ],
  providers: [
    UserService,
    LoginService
  ]
})
export class LoginModule { }
