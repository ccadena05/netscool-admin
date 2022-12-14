import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaestrosDetailComponent } from './maestros-detail.component';

const routes: Routes = [
   {
      path: '',
      component: MaestrosDetailComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaestrosDetailRoutingModule { }
