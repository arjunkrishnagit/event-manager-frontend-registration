import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendeeManagerRoutingModule } from './attendee-manager-routing.module';
import { AttendeeManagerComponent } from './attendee-manager/attendee-manager.component';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NgxImageCompressService} from 'ngx-image-compress';

@NgModule({
  declarations: [
    AttendeeManagerComponent
  ],
  imports: [
    CommonModule,
    AttendeeManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [NgxImageCompressService],
})
export class AttendeeManagerModule { }
