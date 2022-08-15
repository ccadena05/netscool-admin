import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from '../demo/detail/detail.component';
import { AlumnosComponent } from './alumnos.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path:'', component: AlumnosComponent
  },
  {
    path:'create', component: CreateComponent
  },  {
    path:'detail/:id', component: DetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
