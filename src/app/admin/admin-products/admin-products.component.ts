import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../shared/models/product';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;

  items;
  itemCount;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(products => this.filteredProducts = this.products = products);

    // this.subscription = this.productService.getAll()
    //   .subscribe(products => {
    //     this.filteredProducts = this.products = products;
    //     this.initializeTable(products);
    //
    //     });



  }



  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    console.log('query ', query);
    this.filteredProducts = (query) ?
      this.products.filter( p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }



}
