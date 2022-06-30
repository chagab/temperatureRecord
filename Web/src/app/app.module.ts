import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar';
import { TemperatureComponent } from './temperature/temperature.component';
import {GetTemperatureService} from './services/get-temperature.service';



@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    TemperatureComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    GetTemperatureService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
