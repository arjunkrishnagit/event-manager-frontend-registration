import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { LogInComponent } from './login/login.component';
const routes: Routes = [
  {
    path: '',
    component: LogInComponent,
    data: {
      title: 'Login'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
  constructor(private router: Router){
    if (localStorage.getItem("token") && localStorage.getItem("userType") && (this.router.url === '/login' || this.router.url === '/')){
      this.router.navigate(['/dashboard']);
    }
  }
 }
