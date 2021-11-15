import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public apiEdenRed = environment.apiEdenRed;

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiEdenRed}Product`).pipe(
      map((resp: Product[]) => {
        resp.map((product: Product) => product.qty = 0);
        return resp;
      })
    );
  }
  public postPayment(payment: Payment): Observable<Payment[]> {
    return this.http.post<Payment[]>(`${this.apiEdenRed}Payment`, [payment]);    
  }
}
