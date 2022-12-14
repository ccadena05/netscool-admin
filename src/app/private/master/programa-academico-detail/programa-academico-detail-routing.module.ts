import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramaAcademicoDetailComponent } from './programa-academico-detail.component';

const routes: Routes = [
   {
      path: '',
      component: ProgramaAcademicoDetailComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramaAcademicoDetailRoutingModule { }
