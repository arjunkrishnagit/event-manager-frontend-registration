import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendeeManagerComponent } from './attendee-manager/attendee-manager.component'
const routes: Routes = [
  {
    path: '',
    component: AttendeeManagerComponent,
    data: {
      title: 'Attendee manager'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendeeManagerRoutingModule { }
