import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { PortalComponent } from './portal/portal/portal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { PortalModule } from './portal/portal.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatTreeModule} from '@angular/material/tree';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { BnNgIdleModule } from 'bn-ng-idle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    PortalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    LoginModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatCardModule,
    MatTabsModule,
    PortalModule,
    HttpClientModule,
    NgbModule,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatTreeModule,
    MatProgressBarModule,
    MatButtonToggleModule
  ],
  providers: [BnNgIdleModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
