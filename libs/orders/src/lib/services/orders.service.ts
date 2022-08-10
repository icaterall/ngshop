import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Order } from '../models/order';
import { map } from 'rxjs/operators';
import { OrderItem } from '../models/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiURLOrders = environment.apiUrl + 'orders';
  apiURLProducts = environment.apiUrl + 'products';
  constructor(
    private http: HttpClient

    ) {
    }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiURLOrders);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
  }

  updateOrder(orderStatus: {status:string},orderId:string): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStatus);
  }


  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`);
  }

  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLOrders}/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLOrders}/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }

  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURLProducts}/${productId}`);
  }


  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiURLOrders, order);
  }


  cacheOrderData(order:Order){
    localStorage.setItem('orderData',JSON.stringify(order));
  }

  getCachedOrderData():Order{
    return JSON.parse(localStorage.getItem('orderData'));
  }

  removeCachedOrderData(){
   localStorage.removeItem('orderData');
  }

}
