import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxMqttClientModule } from '../../node_modules/ngx-mqtt-client'

import { ApiService } from './services/api.service';
import { AuthService } from './services/imgur.service';
import { ImgurService } from './services/imgur.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationComponent } from './notification/notification.component';
import { SettingsComponent } from './settings/settings.component';
import { ImageryComponent } from './imagery/imagery.component';

import { UiSwitchModule } from 'ngx-toggle-switch';
import { HumidityComponent } from './humidity/humidity.component';
import { PhValueComponent } from './ph-value/ph-value.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { LightComponent } from './light/light.component';
import { TestComponent } from './test/test.component';
import { MqttComponent } from './mqtt/mqtt.component';
import { FormsModule } from '@angular/forms';
import { IMqttMessage, MqttModule, IMqttServiceOptions } from '../../node_modules/ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'broker.mqttdashboard.com',
  port: 8000,
  path: '/mqtt'
};

import { ClarifaiService } from './clarifai_service/clarifai.service';

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
    TestComponent,
    MqttComponent
  ],
  imports: [
    HttpModule, HttpClientModule, FormsModule,
    BrowserModule, UiSwitchModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
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
    ], { useHash: true })
  ],
  providers: [
    ClarifaiService,
    ApiService,
    AuthService,
    ImgurService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
