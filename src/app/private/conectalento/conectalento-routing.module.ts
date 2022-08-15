import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConectalentoComponent } from './conectalento.component';

const routes: Routes = [
  {
    path:'', component: ConectalentoComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConectalentoRoutingModule { }
