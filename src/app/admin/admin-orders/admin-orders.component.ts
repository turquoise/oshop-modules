import { Component, OnInit } from '@angular/core';
import { OrderService } from './../../order.service';
import { Order } from './../../models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders$;

  constructor(private orderService: OrderService ) {
    this.orders$ = orderService.getOrders();
  }

  ngOnInit() {
  }

}
