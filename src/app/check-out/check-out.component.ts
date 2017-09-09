import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping = {};
  cart: ShoppingCart;
  user;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService ) { }

  async ngOnInit() {
    // I need a shopping cart and not an observable.
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe( cart => this.cart = cart);
    this.authService.user$.subscribe( user => this.user = user);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  placeOrder() {
    //console.log(this.shipping);
    let order = {
      userId: this.user.uid,
      userEmail: this.user.email,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map( i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    };
    this.orderService.storeOrder(order);
  }

}
