import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit {

  @Input() usuario: User = new User();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  

}
