import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { UsuarioService } from 'src/app/login/services/usuario.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-inserir-editar-usuario',
  templateUrl: './inserir-editar-usuario.component.html',
  styleUrls: ['./inserir-editar-usuario.component.css']
})
export class InserirEditarUsuarioComponent implements OnInit {
  @ViewChild('formUsuario') formUsuario! : NgForm;
  novoUsuario: boolean = true;
  usuario: User = new User();
  id!: string;
  loading!: boolean;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private idleService: BnNgIdleService) { }

  ngOnInit(): void {
    this.usuario = new User();
    this.loading = true;

    this.id = this.route.snapshot.params['id'];
    this.novoUsuario = !this.id;

    if(!this.novoUsuario) {
      this.usuarioService.buscarPorId(+this.id).subscribe(
        usuario => {
          this.usuario = usuario;
          this.usuario.senha = "";
        }
      );
    }
    this.loading = false;
  }

  salvar(): void {
    this.loading = true;
    if(this.formUsuario.form.valid) {
      if(this.novoUsuario) {
        this.usuarioService.inserir(this.usuario).subscribe(
          usuario => {
            this.loading = false;
            this.router.navigate( ["/usuarios"] );
          }
        );
      }
      else {
        this.usuarioService.alterar(this.usuario).subscribe(
          usuario => {
            this.loading = false;
            this.router.navigate( ['/usuarios'] );
          }
        );
      }
    }
    this.loading = false;
  }
}
