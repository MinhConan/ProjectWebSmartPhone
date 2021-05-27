import { Component, OnInit } from '@angular/core';
import { BrandModel } from 'src/app/models/brand.model';
import { BrandService } from 'src/app/services/brand.service';
import { ObservableService } from 'src/app/services/observable.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  listBrand: BrandModel[] = [];
  active = -1;
  constructor(private brandService: BrandService,
    private obs: ObservableService) { }

  ngOnInit(): void {
    this.brandService.getAllBrand().subscribe(rs=>{
      if(!rs.data) return;
      this.listBrand = rs.data;
    })
  }

  filterBrand(bid){
    if(this.active == bid){
      this.active = -1;
      this.obs.filterBrand.next(-1);
    }
    else {
      this.active = bid;
      this.obs.filterBrand.next(bid);
    } 
  }
}
