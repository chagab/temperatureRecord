import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar/calendar';
import { TemperatureComponent } from './temperature/temperature';
@NgModule({
	declarations: [
		CalendarComponent,
    	TemperatureComponent
    ],
	imports: [],
	exports: [
		CalendarComponent,
    	TemperatureComponent
    ]
})
export class ComponentsModule {}
