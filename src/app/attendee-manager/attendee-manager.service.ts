import { Injectable } from '@angular/core';
import { map, Observable, pipe, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { get_attendee_list, upload_profile_photo, create_attendee, get_attendee_checkin_details, update_profile_photo, edit_attendee } from 'src/_api_list';
import { LoginService } from '../login/login.service';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Injectable({
  providedIn: 'root'
})
export class AttendeeManagerService {

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

  getAttendeeList(index, limit, searchString): Observable<any>{
    var token = localStorage.getItem('token');
    var datapost = {
      "offset" : index,
      "limit" : limit,
      "searchString": searchString,
      "event" : localStorage.getItem('event')
    }
    let data =  this.httpClient.post<any>(get_attendee_list, datapost,{ headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` }) },).pipe(catchError(this.handleError));
    return data;
  }


  uploadProfilePhoto(uploadFile: File): Observable<any>{
    var token = localStorage.getItem('token');
    let formParams = new FormData();
    formParams.append('image', uploadFile)
    let data =  this.httpClient.post<any>(upload_profile_photo, formParams, { headers: new HttpHeaders({  "Authorization": `Bearer ${token}` }) },).pipe(catchError(this.handleError));
    return data;
  }


  createAttendee(user_data): Observable<any>{
    var token = localStorage.getItem('token');
    let data =  this.httpClient.post<any>(create_attendee, user_data,{ headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` }) },).pipe(catchError(this.handleError));
    return data;
  }

  getAttendeeCheckInDetails(id): Observable<any>{
    var token = localStorage.getItem('token');
    var datapost = {
      "id" : id
    }
    let data =  this.httpClient.post<any>(get_attendee_checkin_details, datapost,{ headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` }) },).pipe(catchError(this.handleError));
    return data;
  }

  updateProfilePhoto(uploadFile: File, user_data){
    var token = localStorage.getItem('token');
    let formParams = new FormData();
    formParams.append('image', uploadFile)
    formParams.append('user_id', user_data.id);
    let data =  this.httpClient.post<any>(update_profile_photo, formParams, { headers: new HttpHeaders({  "Authorization": `Bearer ${token}` }) },).pipe(catchError(this.handleError));
    return data;
  }

  editAttendee(user_data): Observable<any>{
    var token = localStorage.getItem('token');
    let data =  this.httpClient.post<any>(edit_attendee, user_data,{ headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` }) },).pipe(catchError(this.handleError));
    return data;
  }

  public getstatedistrictJSON(): Observable<any> {
    return this.httpClient.get("./assets/statedistrict.json");
  }
}
