import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ObservableService } from 'src/app/services/observable.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  productList: ProductModel[] = [];
  mouseIndex = -1;
  pageIndex = 0;
  pageSize = 12;
  obss: Subscription;
  searchKey = '';
  filterBrand = -1;
  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private obs: ObservableService
  ) {}

  ngOnInit(): void {
    this.obss = this.obs.searchProduct.subscribe((s) => {
      this.searchKey = s;
      this.loadProduct();
    });

    this.obss.add(
      this.obs.filterBrand.subscribe((b) => {
        this.filterBrand = b;
        this.loadProduct();
      })
    );
    this.loadProduct();
  }

  ngOnDestroy() {
    this.obss.unsubscribe();
  }

  loadProduct() {
    this.productService
      .getProductsPaging(
        this.pageIndex,
        this.pageSize,
        this.searchKey,
        this.filterBrand
      )
      .subscribe((res) => {
        if(!res || !res.data || res.data.length === 0) {
          this.pageIndex--;
          return;
        };
        this.productList = res.data;
      });
  }

  viewProduct(id) {
    this.router.navigate([`view/${id}`]);
  }

  buyNow(p) {
    this.cartService.addProduct(p, 1);
    this.router.navigate(['cart']);
  }

  addToCart(p) {
    this.cartService.addProduct(p, 1);
  }

  prev(){
    if(this.pageIndex === 0){
      return;
    }
    this.pageIndex--;
    this.loadProduct();
  }

  next(){
    this.pageIndex++;
    this.loadProduct();
  }
}
