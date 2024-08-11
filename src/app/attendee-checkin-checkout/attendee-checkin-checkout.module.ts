import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendeeCheckinCheckoutComponent } from './attendee-checkin-checkout/attendee-checkin-checkout.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { AttendeeCheckinCheckoutRoutingModule } from './attendee-checkin-checkout-routing.module';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { SafePipe } from './safe.pipe';
@NgModule({
  declarations: [
    AttendeeCheckinCheckoutComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AttendeeCheckinCheckoutRoutingModule,
    NgxScannerQrcodeModule
  ]
})

export class AttendeeCheckinCheckoutModule { }

