import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-battery-percentage',
  templateUrl: './battery-percentage.component.html',
  styleUrls: ['./battery-percentage.component.scss'],
  inputs: ['value', 'currentColor']
})
export class BatteryPercentageComponent implements OnInit {
  value: number = 50;
  constructor() { }

  ngOnInit(): void {

  }

}
