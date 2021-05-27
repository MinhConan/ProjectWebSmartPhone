import { Injectable } from "@angular/core";
import { ProductModel } from "../models/product.model";

@Injectable({
  providedIn:'root'
})
export class CartService{
  listProduct: {
    product: ProductModel,
    quantity: number
  } [] = [];

  get totalPrice(){
    return this.getTotalPrice();
  };

  get totalQuantity(){
    return this.getTotalQuantity();
  };

  constructor(){
    if(localStorage.getItem("cartData")){
      this.listProduct = JSON.parse(localStorage.getItem("cartData"));
    }
  }

  addProduct(product: ProductModel, addNumber){
    const i = this.listProduct.findIndex(p=>p.product.ID === product.ID);
    if(i<0){
      this.listProduct.push({
        product: product,
        quantity: addNumber
      })
    }
    else{
      this.listProduct[i].quantity += addNumber;
    }
    this.saveLocalStorage();
  }
  
  removeProduct(product: ProductModel, removeNumber){
    const i = this.listProduct.findIndex(p=>p.product.ID === product.ID);
    if(this.listProduct[i].quantity <= removeNumber){
      this.listProduct.splice(i, 1);
    }
    else{
      this.listProduct[i].quantity -= removeNumber;
    }
    this.saveLocalStorage();
  }

  getTotalPrice(){
    let total = 0;
    for (const p of this.listProduct) {
      total += p.product.Price * p.quantity;
    }
    return total;
  }

  getTotalQuantity(){
    let total = 0;
    for (const p of this.listProduct) {
      total += p.quantity;
    }
    return total;
  }

  saveLocalStorage(){
    localStorage.setItem("cartData", JSON.stringify(this.listProduct));
  }

  deleteAll(){
    this.listProduct = [];
    this.saveLocalStorage();
  }
}