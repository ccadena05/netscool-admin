import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FechasInscripcionDetailComponent } from './fechas-inscripcion-detail.component';

const routes: Routes = [
   {
      path: '',
      component: FechasInscripcionDetailComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FechasInscripcionDetailRoutingModule { }
