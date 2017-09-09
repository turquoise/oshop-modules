import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  categories$;
  product = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService ) {
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).take(1)
        .subscribe( p => this.product = p);
    }
  }

  save(product) {
    //console.log('product ', product);
    if (this.id) {
      this.productService.update(this.id, product);
      this.router.navigate(['/admin/products']);
    } else {
      this.productService.create(product);
      this.router.navigate(['/admin/products']);
    }
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);  
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

}
