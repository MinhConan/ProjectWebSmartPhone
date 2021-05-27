import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  product: ProductModel;
  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const routeSnapshot = this.activeRoute.snapshot;
    this.productService.getProductById(routeSnapshot.params["id"]).subscribe(p=>{
      this.product = p;
    });
  }

  buyNow(){
    this.cartService.addProduct(this.product, 1);
    this.router.navigate(["cart"])
  }

  addToCart(){
    this.cartService.addProduct(this.product, 1);
  }

  back(){
    this.router.navigate([""]);
  }
}
