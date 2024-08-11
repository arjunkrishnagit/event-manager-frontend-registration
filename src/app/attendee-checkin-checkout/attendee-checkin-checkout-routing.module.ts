import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AttendeeCheckinCheckoutComponent } from './attendee-checkin-checkout/attendee-checkin-checkout.component'
const routes: Routes = [
  {
    path: '',
    component: AttendeeCheckinCheckoutComponent,
    data: {
      title: 'Checkin & Checkout'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendeeCheckinCheckoutRoutingModule { }
