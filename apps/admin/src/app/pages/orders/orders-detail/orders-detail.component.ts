import { Component, OnInit } from '@angular/core';
import { OrdersService,Order,ORDER_STATUS } from '@bluebits/orders';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {
order: Order;
orderStatuses = [];
selectedStatus:any;
  constructor(  
    private ordersService:OrdersService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
    private router:Router,
    private location: Location,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

private _mapOrderStatus() {
  this.orderStatuses = Object.keys(ORDER_STATUS).map(key =>{
return {
  id:key,
  name: ORDER_STATUS[key].label
}
  });

}

private _getOrder() {
  this.route.params.subscribe(params=>{
    if(params.id){
      this.ordersService.getOrder(params.id).subscribe(order=>{
        this.order = order;
        this.selectedStatus = order.status;
      })
    }
  })
 
}

onStatusChange(event){
  this.ordersService.updateOrder({status:event.value},this.order.id).subscribe(
   ()=> {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Order is updated!`
    });
  },  () => {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Order is not updated!'
    });
  })
}




}
