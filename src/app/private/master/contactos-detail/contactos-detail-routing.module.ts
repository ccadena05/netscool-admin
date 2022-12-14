import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactosDetailComponent } from './contactos-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ContactosDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactosDetailRoutingModule { }
