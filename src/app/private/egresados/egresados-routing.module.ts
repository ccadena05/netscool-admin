import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EgresadosComponent } from './egresados.component';

const routes: Routes = [
   {
      path:'',
      component: EgresadosComponent
      /* loadChildren: () =>
         import('./egresados.module').then((m) => m.EgresadosModule) */
   },
   {
      path:'detail/:id',
      loadChildren: () =>
         import('./detail/alumnos-detail.module').then((m) => m.DetailModule)
   },
/*    {
      path: 'detail/:id',
      loadChildren: () =>
      import('./detail/')
   } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EgresadosRoutingModule { }
