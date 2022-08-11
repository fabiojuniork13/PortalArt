import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login/login.component';
import { PortalComponent } from './portal/portal/portal.component';
import { UsuarioRoutes } from './user/usuario-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: 'login/login'
  },
  {
    path: 'login/login',
    component: LoginComponent
  },
  {
    path: 'portal',
    redirectTo: 'portal/portal'
  },
  {
    path: 'portal/portal',
    component: PortalComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'LEIT, ADMIN'
    }
  },
    ...UsuarioRoutes
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
