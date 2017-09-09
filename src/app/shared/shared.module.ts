import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

import { ShoppingCartService } from './services/shopping-cart.service';
import { OrderService } from './services/order.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  providers: [
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
