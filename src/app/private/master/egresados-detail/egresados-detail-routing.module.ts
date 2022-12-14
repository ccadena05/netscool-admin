import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EgresadosDetailComponent } from './egresados-detail.component';

const routes: Routes = [
  {
     path: '',
     component: EgresadosDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EgresadosDetailRoutingModule { }
