import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetosComponent } from './retos.component';

const routes: Routes = [
  {
    path:'', component: RetosComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetosRoutingModule { }
