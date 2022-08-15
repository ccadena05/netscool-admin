import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasesComponent } from './clases.component';
import { DetailParcialesComponent } from './detail-parciales/detail-parciales.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path:'', component: ClasesComponent
  },
  {
    path: 'detail/:id_materia_maestro/:id_materia/:id_grupo/:id_periodo/:fecha', component: DetailComponent
  },
  {
    path: 'detail-parciales/:id_parcial_general/:id_materia_maestro/:id_materia/:id_grupo/:id_periodo/:fecha', component: DetailParcialesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasesRoutingModule { }
