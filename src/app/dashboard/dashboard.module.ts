import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighchartsChartModule } from 'highcharts-angular';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { DashboardComponent } from './dashboard/dashboard.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from "@angular/forms";
@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PerfectScrollbarModule,
    HighchartsChartModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
  ]
})
export class DashboardModule { }
