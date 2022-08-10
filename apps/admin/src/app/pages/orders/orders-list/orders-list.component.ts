import { Component, OnInit,OnDestroy } from '@angular/core';
import { OrdersService,Order,ORDER_STATUS} from '@bluebits/orders';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit,OnDestroy {
orders:Order[] = [];
orderStatus = ORDER_STATUS;
endsubs$: Subject<any> = new Subject();
  constructor(
    private ordersService:OrdersService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this._getOrders();
      }
      ngOnDestroy() {
        this.endsubs$.next(true);
        this.endsubs$.complete();
      }
    
      private _getOrders(){
        this.ordersService.getOrders().pipe(takeUntil(this.endsubs$)).subscribe((orders=>{
          this.orders = orders;
        }))
      }

showOrder(orderId){
  this.router.navigateByUrl(`orders/${orderId}`);
}


deleteOrder(orderId:string){

  this.confirmationService.confirm({
    message: 'Do you want to delete this order?',
    header: 'Delete Order',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.ordersService.deleteOrder(orderId).subscribe(
        () => {
          this._getOrders();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order is deleted!'
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Order is not deleted!'
          });
        }
      );   
   
   
      },
    reject: () => {}
  });  
}

    }