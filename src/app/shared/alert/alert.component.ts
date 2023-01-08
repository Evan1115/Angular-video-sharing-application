import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Input() color = 'blue';

  constructor() {}

  ngOnInit(): void {}

  get bgColor() { //getter function that allows to create logic before create as property
    return `bg-${this.color}-400`;
  }
}
