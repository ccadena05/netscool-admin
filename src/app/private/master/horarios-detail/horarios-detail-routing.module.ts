import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorariosDetailComponent } from './horarios-detail.component';
import { PeriodoComponent } from './periodo/periodo.component';

const routes: Routes = [
   {
      path: '',
      component: HorariosDetailComponent
   },
   {
      path: 'periodo/:id2',
      component: PeriodoComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorariosDetailRoutingModule { }
