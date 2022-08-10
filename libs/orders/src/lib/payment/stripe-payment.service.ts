import { Injectable } from '@angular/core';
import { OrderItem } from '../models/order-item';
import { environment } from '@env/environment';
import { StripeService } from 'ngx-stripe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StripePaymentService {
  apiURLOrders = environment.apiUrl + 'orders';
  constructor( 
    private http: HttpClient,
    private stripeService:StripeService
    ) { }



  createCheckoutSession(orderItem:OrderItem[]){

    return this.http.post(`${this.apiURLOrders}/create-checkout-session`,orderItem).pipe(
      
      switchMap((session:{id:string})=>{

return this.stripeService.redirectToCheckout({sessionId:session.id});

      }));
  }

}
