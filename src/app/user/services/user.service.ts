import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  listUsers() {
    return [
      new User(1, "fabio.santos", "123"),
      new User(2, "Bruna", "52"),
      new User(3, "Guilherme", "33"),
      new User(4, "Juan", "88")
    ];
  }

}
