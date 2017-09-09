import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  shipping = {};
  @Input('cart') cart: ShoppingCart;
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService ) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe( user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    //this.shoppingCartService.clearCart();
    this.router.navigate(['/order-success', result.key]);

    //console.log(this.shipping);
    // let order = {
    //   userId: this.user.uid,
    //   userEmail: this.user.email,
    //   datePlaced: new Date().getTime(),
    //   shipping: this.shipping,
    //   items: this.cart.items.map( i => {
    //     return {
    //       product: {
    //         title: i.title,
    //         imageUrl: i.imageUrl,
    //         price: i.price
    //       },
    //       quantity: i.quantity,
    //       totalPrice: i.totalPrice
    //     }
    //   })
    // };
    // this.orderService.storeOrder(order);

  }

}
