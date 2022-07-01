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
import {ReactiveFormsModule} from '@angular/forms';
import {GetFakeTemperatureService} from './services/get-fake-temperature.service';
import {MatSelectModule} from '@angular/material/select';



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
    ReactiveFormsModule,
    MatSelectModule,
  ],
  providers: [
    GetTemperatureService,
    GetFakeTemperatureService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
