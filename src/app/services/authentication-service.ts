import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  AUTH_URL = environment.API_URL + '/auth';

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getAuthHeaders(username: string, password: string) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${username}:${password}`)
      })
    };
  }

  authenticate(username, password) {
    return this.http.get<any>(this.AUTH_URL, this.getAuthHeaders(username, password));
  }


  getUserLoggedIn() {
    return localStorage.getItem('username');
  }

  logOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
