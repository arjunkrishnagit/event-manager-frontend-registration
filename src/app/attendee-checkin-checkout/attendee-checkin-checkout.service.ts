import { Injectable } from '@angular/core';
import { map, Observable, pipe, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { get_attendee_details, attendee_check_action } from 'src/_api_list';
import { LoginService } from '../login/login.service';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Injectable({
  providedIn: 'root'
})
export class AttendeeCheckinCheckoutService {

  constructor(public httpClient: HttpClient, private login: LoginService, private router: Router, private toastr: ToastrService, private ngxUiLoaderService: NgxUiLoaderService) { }

  handleError = (error: any) => {
    let errorMessage = 'error';
    if (error.error) {
      errorMessage = error.error.error;
    } else {
      errorMessage = 'Error';
    }
    if (error.status == '401') {
      this.login.logout();
      this.router.navigate(['/login']);
    }
    return throwError(() => {
      return errorMessage;
    });
  }



  getAttendeeDetails(user_data): Observable<any>{
    var token = localStorage.getItem('token');
    let data =  this.httpClient.post<any>(get_attendee_details, user_data, { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` }) },).pipe(catchError(this.handleError));
    return data;
  }

  attendeeCheckAction(check_data): Observable<any>{
    var token = localStorage.getItem('token');
    let data =  this.httpClient.post<any>(attendee_check_action, check_data, { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` }) },).pipe(catchError(this.handleError));
    return data;
  }


}
