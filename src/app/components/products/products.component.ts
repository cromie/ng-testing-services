import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllSimple().subscribe((products) => {
      console.log('products', products);
      this.products = products;
    });
  }
}
