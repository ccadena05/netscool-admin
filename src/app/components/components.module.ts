import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layout/footer/footer.component';
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';


let components = [
   FooterComponent,
   BreadcrumbsComponent
  
]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[components]
})
export class ComponentsModule { }
