import { Component, OnInit, EventEmitter, Output } from '@angular/core';
//import { TemperatureComponent } from '../temperature/temperature.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.html',
  //styleUrls: ['./calendar.css']
})
export class CalendarComponent implements OnInit {

  // "_year" contains the current year (eg 2018)
  private _year: number;
  // "_month" contains contains the name of the current month (eg "April")
  private _month: string;
  // "_monthRank" contains the current month rank
  private _monthRank: number
  // "_monthLabel" contains all the name of the different months in a year
  private _monthLabel: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // "_day" contains the number of the current day (eg 25)
  private _day: number;
  // "_date" contains the date selected by the user. By default, it's the current date
  private _date: string;
  // "_activeDay" contains the day that is clicked on by the user
  private _activeDay: number;
  // "_daysLabel" contains abreviations for labeling the days
  private _daysLabel: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  // "_numberOfDays" contains the number of days in the current month
  private _numberOfDays: number;
  // "_days" contains a list of integer that contains the number of days
  private _days: number[];
  // trigger an event when the "_date" value is changed
  @Output() _dateChanged: EventEmitter<string> = new EventEmitter();

  public constructor() { }



  public ngOnInit(): void {
    // store the current date
    const date = new Date();
    // convert it to a string
    this._date = date.toISOString().slice(0, 10);
    // emit initialization event for the TemperatureComponent
    this._dateChanged.emit(this._date);
    // extract the current month rank and decrement it (because arry index starts at zero)
    // Note that the "+" operator convert a string to a number !
    this._monthRank = +this._date.slice(5, 7) - 1;
    // extract the current year
    this._year = +this._date.slice(0, 4);
    // extract the current day
    this._day = +this._date.slice(8, 10);
    // by default the active day is the current day
    this._activeDay = this._day;
    // extract the name of the current month
    this._month = this._monthLabel[this._monthRank];
    // compute the number of days in the current month
    this.updateDays();
  }

  public updateDays(): void {
    // if the monthRank is even
    if (this._monthRank % 2 === 0) {
      // TODO: I still have to take into account the leap year !
      if (this._monthRank === 2) {
        this._numberOfDays = 29
      } else {
        this._numberOfDays = 30;
      }
    }
    // if the month rank is odd
    if (this._monthRank % 2 === 1) {
      this._numberOfDays = 31;
    }
    // generate an array of number (that start at 1)for the current month !
    this._days = Array.from(Array(this._numberOfDays + 1).keys()).slice(1);
  }

  public onDayClick(dayNumber: number): void {
    // update the date !
    let newDayString: string = dayNumber.toString();
    // add a zero in front of the digit if it's smaller then 10
    if (dayNumber < 10) {
      newDayString = `0${dayNumber}`;
    }
    this._date = this._date.slice(0, 8) + newDayString;
    // change the active day on click
    this._activeDay = dayNumber;
    // trigger "_dateChanged" event
    this._dateChanged.emit(this._date);
  }

  public onNexMonth(): void {
    // increment the "_monthRank" to point on the next month
    this._monthRank++;
    // update the month then
    this.updateMonth();
  }

  public onPreviousMonth(): void {
    // decrement the "_monthRank" to point on the previous month
    this._monthRank--;
    // update the month then
    this.updateMonth();
  }

  public updateMonth(): void {
    // get the new month's name
    this._month = this._monthLabel[this._monthRank];
    // update the number of days
    this.updateDays();
    // the date has changed !
    this._dateChanged.emit(this._date);
  }

  /////////////
  // getters //
  /////////////

  public year(): number {
    return this._year;
  }

  public month(): string {
    return this._month;
  }

  public daysLabel(): string[] {
    return this._daysLabel;
  }
  public days(): number[] {
    return this._days;
  }

  public activeDay(): number {
    return this._activeDay;
  }

  public date(): string {
    return this._date;
  }

  /////////////
  // setters //
  /////////////

  public setYear(year: number): void {
    this._year = year;
  }

  public setMonth(month: string): void {
    this._month = month;
  }

  public setDaysLabel(daysLabel: string[]): void {
    this._daysLabel = daysLabel;
  }
  public setDays(days: number[]): void {
    this._days = days;
  }

  public setActiveDay(activeDay: number): void {
    this._activeDay = activeDay;
  }

  public setDate(date: string): void {
    this._date = date;
  }

}
