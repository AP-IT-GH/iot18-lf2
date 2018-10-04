import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationComponent } from './notification/notification.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    NotificationComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent},
      { path: 'login', component: LoginComponent},
      { path: 'settings', component: SettingsComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full'},
    ], { useHash: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
