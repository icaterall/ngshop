import { Component, OnInit,OnDestroy } from '@angular/core';
import { ProductsService,Product } from '@bluebits/products';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit,OnDestroy {
products : Product[] =[];
endsubs$: Subject<any> = new Subject();
  constructor(
    private productsService:ProductsService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
    private router:Router
  ){}

  ngOnInit(): void {
this._getProducts();
  }

  ngOnDestroy() {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }
  deleteProduct(productId:string){

    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(
          () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted!'
            });
          }
        );   
     
     
        },
      reject: () => {}
    });  
  }
  

//Update Product function
updateProduct(productId:string){
  this.router.navigateByUrl(`products/form/${productId}`);
  }
  

private _getProducts(){
  this.productsService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe(products =>{
    this.products = products;
  })
}
}
