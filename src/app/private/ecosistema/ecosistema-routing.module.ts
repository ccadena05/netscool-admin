import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcosistemaComponent } from './ecosistema.component';

const routes: Routes = [
  {
    path:'', component: EcosistemaComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcosistemaRoutingModule { }
