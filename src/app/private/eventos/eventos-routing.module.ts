import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { EventosComponent } from './eventos.component';

const routes: Routes = [
  {
    path:'', component: EventosComponent
  },
  {
    path: 'detail/:id', component: DetailComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
