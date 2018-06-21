import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar';
import { TemperatureComponent } from './temperature/temperature';



@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    TemperatureComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
