import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CartItem, CartService } from '@bluebits/orders';
@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit, OnDestroy  {
product:Product;
endSubs$: Subject<any> = new Subject();
quantity = 1;
  constructor(private prodServices:ProductsService,
    private route:ActivatedRoute,
    private cartService:CartService) { }
    ngOnDestroy(): void {
      this.endSubs$.next(true);
      this.endSubs$.complete();
    }
  


  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      if(params.productid){
        this._getProduct(params.productid)
      }
    })
  }
  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    };

    this.cartService.setCartItem(cartItem);
  }


  private _getProduct(id: string) {
    this.prodServices
      .getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProduct) => {
        this.product = resProduct;
      });
  }
}
