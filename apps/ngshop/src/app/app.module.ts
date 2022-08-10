import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {UiModule} from "@bluebits/ui";
import {AccordionModule} from 'primeng/accordion'; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@bluebits/products';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrdersModule } from '@bluebits/orders';
import { MessagesComponent } from './shared/messages/messages.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { JwtInterceptor, UsersModule } from '@bluebits/users';
import { NgxStripeModule } from "ngx-stripe";

const routes = [
  {
    path: '',
    component: HomePageComponent,
  },
 
];
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MessagesComponent
    
  ],
  imports: [BrowserModule, 
    RouterModule.forRoot(routes),
    HttpClientModule,
    ProductsModule,
    AccordionModule,
    BrowserAnimationsModule,
    UiModule,
    OrdersModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ToastModule,
    NgxStripeModule.forRoot('pk_test_S1eEGdRF5Itmnfwk9rNHFZnV00YlGgdUtt'),
    UsersModule // Include here to get the AuthGuard
   
  ],
    
  providers: [ 
    MessageService,
    ConfirmationService,
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
