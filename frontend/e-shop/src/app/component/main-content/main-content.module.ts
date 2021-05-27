import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListProductComponent } from './list-product/list-product.component';
import { MainContentRoutingModule } from './main-content-router.module';
import { MainContentComponent } from './main-content.component';
import { ProductComponent } from './product/product.component';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { ViewProductComponent } from './view-product/view-product.component';


@NgModule({
  declarations: [
    SlideShowComponent,
    ProductComponent,
    MainContentComponent,
    ViewProductComponent,
    ListProductComponent
  ],
  imports: [
    CommonModule, 
    MainContentRoutingModule
  ]
})
export class MainContentModule { }
