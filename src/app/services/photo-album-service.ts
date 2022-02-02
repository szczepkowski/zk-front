import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {PhotoAlbumModel} from './photo-album-model';

@Injectable()
export class PhotoAlbumService {

  PHOTO_URL = environment.API_URL + '/photos';

  constructor(private http: HttpClient) {
  }

  getOptions() {

    const  username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
      }),
    };
  }


  addPhoto(name: string, photos: Blob[]): Observable<PhotoAlbumModel[]> {
    return this.http.post<PhotoAlbumModel[]>(this.PHOTO_URL + '/add', {name, photos}, this.getOptions());
  }

  getPhotosByUser(): Observable<PhotoAlbumModel[]> {
    return this.http.get<PhotoAlbumModel[]>(`${this.PHOTO_URL}`, this.getOptions());
  }


}
