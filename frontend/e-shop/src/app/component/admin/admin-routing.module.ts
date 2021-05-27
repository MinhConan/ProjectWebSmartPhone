import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
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
        component: ViewComponent
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
        component: ListComponent
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
        component: EditComponent
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
        component: EditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
