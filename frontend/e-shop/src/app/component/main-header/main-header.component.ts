import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ObservableService } from 'src/app/services/observable.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
})
export class MainHeaderComponent implements OnInit {
  searchKey;
  constructor(
    public cartService: CartService,
    public router: Router,
    private obs: ObservableService
  ) {}

  ngOnInit(): void {}

  search() {
    this.obs.searchProduct.next(this.searchKey);
  }
}
