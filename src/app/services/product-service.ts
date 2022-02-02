import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Product} from '../product-list/product';
import {Observable} from 'rxjs';
import {ProductRequest} from '../product-list/product-request';
import {environment} from '../../environments/environment';

@Injectable()
export class ProductService {

  PRODUCT_URL = environment.API_URL + '/products/';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.PRODUCT_URL);
  }

  get(title: string): Observable<Product> {
    return this.http
      .get<Product>(this.PRODUCT_URL + title);
  }

  add(productRequest: ProductRequest): Observable<Product> {
    return this.http
      .post<Product>(this.PRODUCT_URL, productRequest);
  }

  addComent(userId: string, title: string, text: string): Observable<Product> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('title', title)
      .set('text', text);
    return this.http.post<Product>(this.PRODUCT_URL + 'comment', params);
  }


}
