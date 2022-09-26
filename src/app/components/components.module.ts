import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layout/footer/footer.component';
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { WaiterComponent } from './waiter/waiter.component';
import { MaterialModule } from './material/material.module';
import { FunnelChartComponent } from './charts/funnel-chart/funnel-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { ColumnChartComponent } from './charts/column-chart/column-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { MatTableComponent } from './mat-table/mat-table.component';


let components = [
   FooterComponent,
   BreadcrumbsComponent,
   WaiterComponent
]

@NgModule({
  declarations: [components, FunnelChartComponent, BarChartComponent, ColumnChartComponent, PieChartComponent, LineChartComponent, MatTableComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports:[components]
})
export class ComponentsModule { }
