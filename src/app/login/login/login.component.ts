import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private login: LoginService, private httpClient: HttpClient,private toastr: ToastrService, private ngxUiLoaderService: NgxUiLoaderService) {
   }

  hide = true;
  loginForm: FormGroup | any;
  username: string | any;
  password: string | any;
  isLoading=false;
  loginValidation = false;

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: [, [Validators.required,Validators.email]],
      password: [, Validators.required]
    });
  }
  toggleVisibility(): void {
    this.hide = !this.hide;
  }
  async logIn(){
    this.isLoading = true;
    this.loginValidation = true;
    if (this.loginForm.invalid) {
      this.isLoading = false;
      return;
    }
    const login_data = {
      "email": this.username,
      "password": this.password
    }
    this.ngxUiLoaderService.start();
    this.login.loginAction(login_data).subscribe(data => {
      if(data?.access_token){
        this.login.setLocalSessionData(data);
        this.ngxUiLoaderService.stop();
        this.isLoading = false;
        console.log('okay')
        this.router.navigate(['/dashboard']);
      }
      else{
        this.ngxUiLoaderService.stop();
        this.toastr.error('Something went wrong!', 'Error')
        this.isLoading = false;
      }
    },
    error=>{
      console.log(error);
      this.ngxUiLoaderService.stop();
      this.toastr.error(error, 'Error')
      this.isLoading = false;
    }
    );
  }

}
