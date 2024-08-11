import { Injectable } from '@angular/core';
import { map, Observable, pipe, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import {upload_profile_photo, create_attendee} from 'src/_api_list';
import { LoginService } from '../login/login.service';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

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

  uploadProfilePhoto(uploadFile: File): Observable<any>{
    let formParams = new FormData();
    formParams.append('image', uploadFile)
    let data =  this.httpClient.post<any>(upload_profile_photo, formParams, { headers: new HttpHeaders() },).pipe(catchError(this.handleError));
    return data;
  }


  createAttendee(user_data): Observable<any>{
    let data =  this.httpClient.post<any>(create_attendee, user_data,{ headers: new  HttpHeaders({ 'Content-Type': 'application/json' }) },).pipe(catchError(this.handleError));
    return data;
  }

  public getstatedistrictJSON(): Observable<any> {
    return this.httpClient.get("./assets/statedistrict.json");
  }

}
