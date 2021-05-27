import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerRoutingModule } from './container-routing.module';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MainHeaderComponent } from '../main-header/main-header.component';
import { MenuTopComponent } from '../menu-top/menu-top.component';
import { ContainerComponent } from './container.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    MainHeaderComponent,
    MenuTopComponent,
    FooterComponent,
    ContainerComponent
  ],
  imports: [
    CommonModule,
    ContainerRoutingModule,
    FormsModule
  ]
})
export class ContainerModule { }
