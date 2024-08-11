import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LogInComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
@NgModule({
  declarations: [
    LogInComponent,
    ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
