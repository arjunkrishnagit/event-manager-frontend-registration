import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component'
const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
    data: {
      title: 'Registration'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {
  constructor(private router: Router){
    if (localStorage.getItem("token") && localStorage.getItem("userType") && (this.router.url === '/login' || this.router.url === '/')){
      this.router.navigate(['/dashboard']);
    }
  }
 }
