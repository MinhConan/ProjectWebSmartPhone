import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';
import { ListOrderComponent } from './list-order/list-order.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    ViewComponent,
    ListComponent,
    EditComponent,
    ListOrderComponent,
    ViewOrderComponent,
    EditOrderComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule],
})
export class AdminModule {}
