import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TemperatureComponent } from './temperature/temperature.component';
import {GetTemperatureService} from './services/get-temperature.service';
import {LineChartModule} from '@swimlane/ngx-charts';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    TemperatureComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LineChartModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
  ],
  providers: [
    GetTemperatureService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
