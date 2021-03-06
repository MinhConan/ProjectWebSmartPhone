import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  listProduct = [];
  pageIndex = 0;
  pageSize = 10;

  columnConfig: {
    displayName: string;
    field: string;
  }[];

  searchKey = '';

  list = [];

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchKey = '';
    this.columnConfig = [
      {
        displayName: 'Tên sản phẩm',
        field: 'Name',
      },
      {
        displayName: 'Đơn giá',
        field: 'Price',
      },
    ];
    this.productService
      .getProductsPaging(0, 10, this.searchKey)
      .subscribe((res) => {
        this.list = res.data;
      });
  }

  search(a = '') {
    this.productService
      .getProductsPaging(this.pageIndex, this.pageSize, this.searchKey)
      .subscribe((res) => {
        if (!res || !res.data || res.data.length === 0) {
          if (a === 'add') this.pageIndex--;
          return;
        }
        this.list = res.data;
      });
  }

  changeLayout(value) {
    this.router.navigateByUrl('admin/list/' + value);
  }

  prev() {
    if (this.pageIndex === 0) {
      return;
    }
    this.pageIndex--;
    this.search();
  }

  next() {
    this.pageIndex++;
    this.search('add');
  }
}
