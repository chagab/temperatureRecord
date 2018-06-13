import { Component, OnInit, EventEmitter, Output } from '@angular/core';
//import { TemperatureComponent } from '../temperature/temperature.component';

//nettoyage de commentaires

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css']
})
export class CalendarComponent implements OnInit {

  // "_date" contains the date selected by the user. By default, it's the current date
  private _date: Date;
  // "_daysInThisMonth" contains the days number in a given month
  private _daysInThisMonth: number[];
  // "_daysInLastMonth" contains the days number to display for the previous month of a given month
  private _daysInLastMonth: number[];
  // "_daysInNextMonth" contains the days number to display for the next month of a given month
  private _daysInNextMonth: number[];
  // "_monthLabel" contains all the name of the different months in a year
  private _monthLabel: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // "_daysLabel" contains abreviations for labeling the days
  private _daysLabel: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  // "_currentDay" contains the number of the current day (eg 25)
  private _currentDay: number;
  // "_month" contains contains the name of the current month (eg "April")
  private _currentMonth: string;
  // "_year" contains the current year (eg 2018)
  private _currentYear: number;
  //
  private _currentDate: number;
  // "_activeDay" contains the day that is clicked on by the user
  private _activeDay: number;

  // trigger an event when the "_date" value is changed
  @Output() _dateChanged: EventEmitter<string> = new EventEmitter();

  public constructor() { }

  public ngOnInit(): void {
    // store the current date
    this._date = new Date();
    // build the days set for the current month
    this.getDaysOfMonth(this._date);
    // extract the current day
    this._currentDay = new Date().getDate();
    // by default the active day is the current day
    this._activeDay = this._currentDay;
    // emit initialization event for the TemperatureComponent
    this._dateChanged.emit(this._date.toISOString().slice(0, 10));
  }


  public getDaysOfMonth(date: Date): void {
    // function that, given a certain date, store the days to display in the "_daysIn...Month" array
    this._currentMonth = this._monthLabel[date.getMonth()];
    this._currentYear = date.getFullYear();

    this._daysInLastMonth = this.makeDaysOfPrevMonth(date);
    this._daysInThisMonth = this.makeDaysOfThisMonth(date);
    this._daysInNextMonth = this.makeDaysOfNextMonth(date);

    if (date.getMonth() === new Date().getMonth()) {
      this._currentDate = new Date().getDate();
    } else {
      this._currentDate = 999;
    }
  }

  public makeDaysOfPrevMonth(month: Date): number[] {
    // function that, given a certain date, return the list of days to display for the previous month
    let days: number[] = [];
    const prevNumOfDays: number = this.numOfDaysInPrevMonth(month);
    const firstDayThisMonth: number = this.firstDayOfThisMonth(month);
    for (let i: number = prevNumOfDays - (firstDayThisMonth - 2); i <= prevNumOfDays; i++) {
      days.push(i);
    }
    return days;
  }

  public makeDaysOfThisMonth(month: Date): number[] {
    // function that, given a certain date, return the list of days to display for the given month
    let days: number[] = [];
    const numOfDays = this.numOfDaysInThisMonth(month);
    for (let i: number = 0; i < numOfDays; i++) {
      days.push(i + 1);
    }
    return days;
  }

  public makeDaysOfNextMonth(month: Date): number[] {
    // function that, given a certain date, return the list of days to display for the next month
    let days: number[] = [];
    const lastDay: number = this.lastDayOfThisMonth(month);
    const totalDays: number = this.totalDays(month);

    for (let i: number = 0; i < (6 - lastDay); i++) {
      days.push(i + 1);
    }
    if (totalDays < 36) {
      for (let i: number = (7 - lastDay); i < ((7 - lastDay) + 7); i++) {
        days.push(i);
      }
    }
    return days;
  }

  public firstDayOfThisMonth(date: Date): number {
    // function that, given a certain date, return the index in the week of the first day of the given month
    // (eg if it is a Monday it will return "1")
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  public lastDayOfThisMonth(date: Date): number {
    // function that, given a certain date, return the index in the week of the last day of the given month
    // (eg if it is a Monday it will return "1")
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  }

  public numOfDaysInThisMonth(date: Date): number {
    // function that, given a certain date, return the number of days in the given month
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  public numOfDaysInPrevMonth(date: Date): number {
    // function that, given a certain date, return the number of days in the previous month
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  }

  public numOfDaysInNextMonth(date: Date): number {
    // function that, given a certain date, return the number of days in the next month
    return new Date(date.getFullYear(), date.getMonth() + 2, 0).getDate();
  }

  public totalDays(date: Date): number {
    // function that, given a certain date, return the number of days to display
    return this.numOfDaysInPrevMonth(date) + this.numOfDaysInThisMonth(date) + this.numOfDaysInNextMonth(date);
  }

  public goToLastMonth(): void {
    // function that update the calendar to display the previous month
    this._date = new Date(this._date.getFullYear(), this._date.getMonth(), 0);
    this.getDaysOfMonth(this._date);
  }

  public goToNextMonth(): void {
    // function that update the calendar to display the next month
    this._date = new Date(this._date.getFullYear(), this._date.getMonth() + 2, 0);
    this.getDaysOfMonth(this._date);
  }

  public onDayClick(dayNumber: number): void {
    // update the date !
    let newDayString: string = dayNumber.toString();
    // add a zero in front of the digit if it's smaller then 10
    if (dayNumber < 10) {
      newDayString = `0${dayNumber}`;
    }
    //this._date = this._date.slice(0, 8) + newDayString;
    // change the active day on click
    //this._activeDay = dayNumber;
    // trigger "_dateChanged" event
    this._dateChanged.emit(this._date.toISOString().slice(0, 10));
  }

  /////////////
  // getters //
  /////////////

  public year(): number {
    return this._currentYear;
  }

  public month(): string {
    return this._currentMonth;
  }

  public daysLabel(): string[] {
    return this._daysLabel;
  }
  public daysInThisMonth(): number[] {
    return this._daysInThisMonth;
  }

  public daysInLastMonth(): number[] {
    return this._daysInLastMonth;
  }

  public daysInNextMonth(): number[] {
    return this._daysInNextMonth;
  }

  public activeDay(): number {
    return this._activeDay;
  }

  public date(): string {
    return this._date.toISOString().slice(0, 10);
  }
}
