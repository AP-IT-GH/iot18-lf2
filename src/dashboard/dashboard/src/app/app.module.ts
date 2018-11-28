import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ApiService } from './services/api.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationComponent } from './notification/notification.component';
import { SettingsComponent } from './settings/settings.component';
import { ImageryComponent } from './imagery/imagery.component';
import { ClarifaiService } from './clarifai_service/clarifai.service';

import { UiSwitchModule } from 'ngx-toggle-switch';
import { HumidityComponent } from './humidity/humidity.component';
import { PhValueComponent } from './ph-value/ph-value.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { LightComponent } from './light/light.component';
import { TestComponent } from './test/test.component';
<<<<<<< HEAD
=======

import { ClarifaiService } from './clarifai_service/clarifai.service';
>>>>>>> Dashboard_Clarifai

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    NotificationComponent,
    SettingsComponent,
    ImageryComponent,
    HumidityComponent,
    PhValueComponent,
    TemperatureComponent,
    LightComponent,
    TestComponent
  ],
  imports: [
    HttpModule,
    BrowserModule, UiSwitchModule,
    RouterModule.forRoot([
<<<<<<< HEAD
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'imagery', component: ImageryComponent },
      { path: 'humidity', component: HumidityComponent },
      { path: 'ph-value', component: PhValueComponent },
      { path: 'temperature', component: TemperatureComponent },
      { path: 'light', component: LightComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ], { useHash: true }),
  ],
  providers: [ApiService],
=======
      { path: 'home', component: HomeComponent},
      { path: 'login', component: LoginComponent},
      { path: 'settings', component: SettingsComponent},
      { path: 'imagery', component: ImageryComponent},
      { path: 'humidity', component: HumidityComponent},
      { path: 'ph-value', component: PhValueComponent},
      { path: 'temperature', component: TemperatureComponent},
      { path: 'light', component: LightComponent},
      { path: 'test', component: TestComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full'},
    ], { useHash: true }),
  ],
  providers: [
    ClarifaiService
  ],
>>>>>>> Dashboard_Clarifai
  bootstrap: [AppComponent]
})
export class AppModule { }
