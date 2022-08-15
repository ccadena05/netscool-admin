import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentoresComponent } from './mentores.component';

const routes: Routes = [
  {
    path:'', component: MentoresComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentoresRoutingModule { }
