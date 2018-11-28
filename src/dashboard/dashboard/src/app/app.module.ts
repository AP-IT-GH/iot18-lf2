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
import { MqttService } from './services/mqtt.service';
import { MqttComponent } from './mqtt/mqtt.component';
import { MqttDashboardComponent } from './mqtt-dashboard/mqtt-dashboard.component';
import { FormsModule } from '@angular/forms';

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
    MqttComponent,
    MqttDashboardComponent
  ],
  imports: [
    HttpModule, FormsModule,
    BrowserModule, UiSwitchModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'imagery', component: ImageryComponent },
      { path: 'humidity', component: HumidityComponent },
      { path: 'ph-value', component: PhValueComponent },
      { path: 'temperature', component: TemperatureComponent },
      { path: 'light', component: LightComponent },
      { path: 'mqtt', component: MqttComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ], { useHash: true }),
  ],
  providers: [ApiService, MqttService],
  bootstrap: [AppComponent]
})
export class AppModule { }
