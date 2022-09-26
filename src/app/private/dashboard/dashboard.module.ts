import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';

export function highchartsModules() {
   // apply Highcharts Modules to this array
   return [stock, more];
}

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    MaterialModule,
    DashboardRoutingModule,
    ChartModule,
  ],
  providers: [
   { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
  ]
})
export class DashboardModule { }
