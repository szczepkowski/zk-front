import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderResponse} from './order-response.model';
import {Account} from '../account/account';

@Injectable()
export class AccountService {
  ACCOUNT_URL = environment.API_URL + '/account';

  constructor(private http: HttpClient) {
  }

  getAuth() {
    const  username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
      }),
    };
  }

  getAccount(userId: string): Observable<Account> {
    return this.http.get<Account>(`${this.ACCOUNT_URL}?userId=${userId}`, this.getAuth());
  }

}
