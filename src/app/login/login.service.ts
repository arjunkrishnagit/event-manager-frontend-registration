import { Injectable } from '@angular/core';
import { map, Observable, pipe, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { login_url } from 'src/_api_list';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public httpClient: HttpClient) { }

  setLocalSessionData(data){
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("userType", data.user_type);
    localStorage.setItem("event", data.event);
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("event");
  }

  handleError = (error: any) => {
    let errorMessage = 'error';
    if (error.error) {
      errorMessage = error.error.error;
    } else {
      errorMessage = 'Error';
    }
    if (error.status == '401') {
      // this.logout();
      // this.route.navigate(['/login']);
    }
    return throwError(() => {
      return errorMessage;
    });
  }

  loginAction(login_data): Observable<any> {
    let data =  this.httpClient.post<any>(login_url, login_data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(catchError(this.handleError));
    return data;
  }
}
