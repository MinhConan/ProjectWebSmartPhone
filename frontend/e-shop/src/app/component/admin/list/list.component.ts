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

  layoutCode = 'product';
  searchKey = '';

  list = [];

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchKey = "";
    switch (this.layoutCode) {
      case 'product':
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
        break;

      case 'order':
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
        break;

      default:
        break;
    }
  }

  search(a='') {
    switch (this.layoutCode) {
      case 'product':
        this.productService
          .getProductsPaging(this.pageIndex, this.pageSize, this.searchKey)
          .subscribe((res) => {
            if(!res || !res.data || res.data.length === 0){
              if(a==='add') this.pageIndex--;
              return;
            } 
            this.list = res.data;
          });
        break;

      case 'sale-order':
        this.orderService.getOrdersPaging(this.pageIndex, this.pageSize, this.searchKey).subscribe((res) => {
          if(!res || !res.data || res.data.length === 0)
          {
            if(a==='add') this.pageIndex--;
            return;
          } 
          this.list = res.data;
        });
        break;

      default:
        break;
    }
  }

  changeLayout(value) {
    this.router.navigateByUrl('admin/list/' + value);
    this.ngOnInit();
  }
  
  prev(){
    if(this.pageIndex === 0){
      return;
    }
    this.pageIndex--;
    this.search();
  }

  next(){
    this.pageIndex++;
    this.search('add');
  }
}
