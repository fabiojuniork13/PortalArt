import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { InserirEditarUsuarioComponent } from './inserir-editar-usuario/inserir-editar-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import { RouterModule } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    InserirEditarUsuarioComponent,
    ListarUsuarioComponent,
    ModalUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatProgressBarModule
  ],
  providers: [
    UserModule,
    UserService
  ]
})
export class UserModule { }
