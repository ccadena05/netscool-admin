import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DemoComponent } from './demo.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path:'', component: DemoComponent,
    data: { title: 'Demo2', breadcrumb: 'DEMO"' },
  },
  {
    path: 'create', component: CreateComponent,
    data: { title: 'Create', breadcrumb: 'CREATE"' },
  },
  {
    path: 'detail/:id', component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
