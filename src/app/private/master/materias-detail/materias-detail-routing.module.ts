import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MateriasDetailComponent } from './materias-detail.component';

const routes: Routes = [
   {
      path: '',
      component: MateriasDetailComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MateriasDetailRoutingModule { }
