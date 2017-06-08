import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-send-sheet',
  templateUrl: './send-sheet.component.html',
  styleUrls: ['./send-sheet.component.css']
})
export class SendSheetComponent implements OnInit {


  title = 'app works!';

  a: Date;
  model: NgbDateStruct;
  public isCollapsed = false;
  currentRate = 6;

  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;

  constructor() {
   }

  ngOnInit() {
     setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.debounceTime(5000).subscribe(() => this.successMessage = null);
  }

public changeSuccessMessage() {
    this._success.next(`${new Date()} - Message successfully changed.`);
  }

  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: {month: number}) {
    return date.month !== current.month;
  }
}
