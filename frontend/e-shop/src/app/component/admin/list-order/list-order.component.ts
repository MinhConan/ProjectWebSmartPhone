import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css'],
})
export class ListOrderComponent implements OnInit {
  listProduct = [];
  pageIndex = 0;
  pageSize = 10;

  columnConfig: {
    displayName: string;
    field: string;
  }[];

  layoutCode = 'order';
  searchKey = '';

  list = [];

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchKey = '';
    this.columnConfig = [
      {
        displayName: 'Tên khách hàng',
        field: 'Name',
      },
      {
        displayName: 'Địa chỉ',
        field: 'UserAddress',
      },
      {
        displayName: 'Số điện thoại',
        field: 'UserPhone',
      },
      {
        displayName: 'Thành tiền',
        field: 'Amount',
      },
      {
        displayName: 'Trạng thái',
        field: 'Status',
      },
      {
        displayName: 'Ngày đặt hàng',
        field: 'CreatedTime',
      },
    ];
    this.orderService.getOrdersPaging(0, 10).subscribe((res) => {
      this.list = res.data;
    });
  }

  search(a = '') {
    this.orderService
      .getOrdersPaging(this.pageIndex, this.pageSize, this.searchKey)
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
