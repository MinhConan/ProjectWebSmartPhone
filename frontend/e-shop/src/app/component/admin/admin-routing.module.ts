import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { EditComponent } from './edit/edit.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'view',
    component: ViewComponent,
    children:[
      {
        path: 'product',
        component: ViewComponent
      },
      {
        path: 'order',
        component: ViewOrderComponent
      }
    ]
  },
  {
    path: 'list',
    component: ListComponent,
    children:[
      {
        path: 'product',
        component: ListComponent
      },
      {
        path: 'order',
        component: ListOrderComponent
      }
    ]
  },
  {
    path: 'add',
    component: EditComponent,
    children:[
      {
        path: 'product',
        component: EditComponent
      },
      {
        path: 'order',
        component: EditOrderComponent
      }
    ]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    children:[
      {
        path: 'product',
        component: EditComponent
      },
      {
        path: 'order',
        component: EditOrderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
