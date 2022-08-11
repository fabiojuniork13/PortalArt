import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BnNgIdleService } from 'bn-ng-idle';
import { UsuarioService } from 'src/app/login/services/usuario.service';
import { User } from 'src/app/shared/models/user.model';
import { ModalUsuarioComponent } from '../modal-usuario/modal-usuario.component';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {

  usuarios: User[] = [];
  loading!: boolean;

  constructor(private usuarioService: UsuarioService,
              private modalService: NgbModal,
              private idleService: BnNgIdleService) { }

  ngOnInit(): void {
    this.loading = true;
    this.usuarios = [];
    this.listarTodos();
  }

  listarTodos(): User[] {
    this.loading = true;
    this.usuarioService.listarTodos().subscribe({
      next: (data: User[]) => {
        if(data == null) {
          this.usuarios = [];
        }
        else {
          this.usuarios = data;
        }
      }
    });
    this.loading = false;
    return this.usuarios;
  }

  remover($event: any, usuario: User): void {
    this.loading = true;
    $event.preventDefault();
    if(confirm('Deseja realmente remover o usuário ' + usuario.nome + '"?')) {
      this.usuarioService.remover(usuario.id!).subscribe({
        complete: () => {this.listarTodos();}
      });
    }
    this.loading = false;
  }

  abrirModal(usuario: User) {
    this.loading = true;
    const modalRef = this.modalService.open(ModalUsuarioComponent);
    modalRef.componentInstance.usuario = usuario;
    this.loading = false;
  }
}
