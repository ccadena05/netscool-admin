import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirmamentoComponent } from './firmamento.component';

const routes: Routes = [
  {
    path:'', component: FirmamentoComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirmamentoRoutingModule { }
