import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/order.model';
import { ProductModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  listProduct: {
    product: ProductModel,
    quantity: number
  }[] = [];

  totalPrice;
  buySuccess = false;

  order: OrderModel = new OrderModel();

  constructor(public cartService: CartService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.listProduct = this.cartService.listProduct;
  }

  deleteCart(){
    this.cartService.deleteAll();
    this.listProduct = this.cartService.listProduct;
  }

  addProduct(p){
    this.cartService.addProduct(p, 1);
  }

  minusProduct(p){
    this.cartService.removeProduct(p, 1);
  }

  buy(){
    this.order.Amount = this.cartService.totalPrice;
    this.order.Status = "Đã đặt hàng"
    this.orderService.saveOrder(this.order).subscribe(res=>{
      console.log(res);
    })
    this.cartService.deleteAll();
    this.listProduct = this.cartService.listProduct;
    this.buySuccess = true;
  }
}
