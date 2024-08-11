import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public productTypeArr: any = [
    { item_id: 35, item_text: 'Micro Loan' },
    { item_id: 45, item_text: 'Personal Loan' },
    { item_id: 15, item_text: 'Revolving Credit Line' },
    { item_id: 5, item_text: 'Secure Credit Card' },
    { item_id: 25, item_text: 'Vehicle Loan' }
  ];
  constructor() { }
  public dropdownSettingsproductType: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  isAdmin = (localStorage.getItem("userType")=='admin')?true:false;
  isVolunteers = (localStorage.getItem("userType")=='volunteers')?true:false;
  ngOnInit(): void {
    // $.getScript("./assets/js/e-commerce-dashboard.js");

  }

}
