import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.css']
})
export class AdminOrderDetailsComponent implements OnInit {

  constructor() { }

  // needs an orderId parameter
  // get the order from firebase and display it to the user.

  ngOnInit() {
  }

}
