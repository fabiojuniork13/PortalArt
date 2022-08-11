import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { Observable } from 'rxjs';
import { LoginService } from './login/services/login.service';
import { PortalComponent } from './portal/portal/portal.component';
import { PortalService } from './portal/services/portal.service';
import { Folder } from './shared/models/folder.model';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Portal';

  loading: boolean = false;

  _time!: any;
  
  constructor(
    private router: Router,
    private loginService: LoginService,
    private idleService: BnNgIdleService
  ) {}

  ngOnInit() {
    this.time();
    console.log('Expiring session in 3 seconds...')
    this.idleService.startWatching(this._time).subscribe((isUserInactive) => {
      if (isUserInactive) {
        console.log('Session expired...');
        this.logout();
        const currentRoute = this.router.url;
        if(currentRoute !== '/login') {
          console.log('Redirecting to login screen...')
          this.router.navigateByUrl('/login');
          this.idleService.resetTimer();
        }
      }
    });
  }

  user: User = new User();
  contracts: Folder[] = [];

  get usuarioLogado(): User | null {
    this.user = this.loginService.usuarioLogado;
    return this.loginService.usuarioLogado;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  time() {
    this.loginService.time().subscribe({
      next: (s: any) => {
        if(s != null) {
          this._time = s;
          console.log(this._time);
        }
      }
    })
  }
}