import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  data;
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router) { }

  ngOnInit(): void {
    const snapshot = this.route.snapshot;
    this.productService.getProductById(snapshot.params["id"]).subscribe(res=>{
      this.data = res;
    })
  }

}
