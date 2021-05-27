import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container.component';

const routes: Routes = [
  {
    path:'',
    component: ContainerComponent,
    children:[
      {
        path: '',
        loadChildren: () => import('../../component/main-content/main-content.module').then(m => m.MainContentModule)
      },
      {
        path: 'cart',
        loadChildren: ()=>import('../../component/cart/cart.module').then(m=>m.CartModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
