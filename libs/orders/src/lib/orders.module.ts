import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { BadgeModule } from 'primeng/badge';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';

import { RouterModule, Routes } from '@angular/router';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuard } from '@bluebits/users';
const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'checkout',
    canActivate:[AuthGuard],
    component: CheckoutPageComponent
  },


  {
    path: 'success',
    component: ThankYouComponent
  },
];

@NgModule({
  imports: [CommonModule,
    BadgeModule, 
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  
  ],

  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent
  ],
  exports: [CartIconComponent, 
    CartPageComponent, 
    OrderSummaryComponent, 
    CheckoutPageComponent]

})
export class OrdersModule {
  constructor (cartService: CartService){
    //we start from here because this part is calling only one time in our app
    cartService.initCartLocalStorage();
  }
}
