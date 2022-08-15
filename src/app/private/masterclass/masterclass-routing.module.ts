import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterclassComponent } from './masterclass.component';

const routes: Routes = [
  {
    path:'', component: MasterclassComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterclassRoutingModule { }
