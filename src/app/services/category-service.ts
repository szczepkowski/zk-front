import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from './category-model';

@Injectable()
export class CategoryService {

  CATEGORY_URL = environment.API_URL + '/category/';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.CATEGORY_URL);
  }

}

