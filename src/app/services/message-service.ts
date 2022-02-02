import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MessageModel} from './message-model';

@Injectable()
export class MessageService {

  MESSAGE_URL = environment.API_URL + '/message';

  constructor(private http: HttpClient) {
  }

  addMessage(message: MessageModel): Observable<boolean> {

    return this.http.post<boolean>(this.MESSAGE_URL , {...message} );
  }

  getByEmail(email: string): Observable<MessageModel> {
    return this.http.get<MessageModel>(`${this.MESSAGE_URL}/${email}`);
  }

}
