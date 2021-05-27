import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrdersPaging(pageIndex, pageSize, keySeach = '', status = '') {
    const url = environment.getOrderPaging + `?pageIndex=${pageIndex + 1}&pageSize=${pageSize}&name=${keySeach}&status=${status}`;
    return this.http.get<any>(url);
  }

  saveOrder(order: OrderModel) {
    const url = environment.addOrder;
    return this.http.post(url, order);
  }
}
