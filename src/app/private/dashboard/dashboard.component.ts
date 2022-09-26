
import * as  Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';
import funnel from 'highcharts/modules/funnel';

import { Component, OnInit } from '@angular/core';
import { JwtAuthService } from 'src/app/services/auth/jwt-auth.service';
import jwt_decode from 'jwt-decode';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

funnel(Highcharts);

@Component({
   selector: 'app-dashboard',
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {
   displayName: string;
   dataCharts: any;
   mes = new Date().getMonth();
   mesN = '';
   meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
   ready: boolean = false;

   seriesOptions: any;
   forecast: Chart = new Chart ({});

   columns = [
      { columnDef: 'position', header: 'No.',    cell: (element: any) => `${element.position}` },
      { columnDef: 'name',     header: 'Name',   cell: (element: any) => `${element.name}`     },
      { columnDef: 'weight',   header: 'Weight', cell: (element: any) => `${element.weight}`   },
      { columnDef: 'symbol',   header: 'Symbol', cell: (element: any) => `${element.symbol}`   },
    ];
    displayedColumns = this.columns.map(c => c.columnDef);
  dataSource: any = [
   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
 ];
   constructor(
      private jwtAuth: JwtAuthService,
      private provider: ProviderService
   ) {
      console.log(this.dataSource);

      this.ready = false;
      this.meses.forEach((mes: any, indice: number) => {
         this.mes == indice ? this.mesN = mes : '';
      });

      this.displayName = this.jwtAuth.getUser().displayName;
      this.provider.BD_ActionPost('highcharts', 'getDataCharts', { file: 'becas' }).subscribe({
         next: (data: any) => {
            console.log(data);
            this.dataCharts = data['data'];
            this.ready = true;

         }, error: (error: any) => {
            console.log(JSON.stringify(error));
         }
      });
      this.generarChart();
   }

   ngOnInit(): void {
      console.log(this.getDecodedAccessToken().data.role)
   }

   getDecodedAccessToken(): any {
      return jwt_decode(this.jwtAuth.getJwtToken());
   }

   generarChart(){
      this.provider.BD_ActionPost('highcharts', 'getDataCharts', { file: 'forecast' }).subscribe({
         next: (data: any) => {
         this.seriesOptions = data;
         this.forecast = new Chart({
             chart: {
                 height: 350,
                 type: 'funnel',
                 backgroundColor: 'rgba(0,0,0,0)',
                 style: {
                     color: '#FFF'
                 }
             },
             title: {
                 text: 'Forecast',
                 style: {
                     color: '#FFF'
                 }
             },
             plotOptions: {
                 funnel: {
                     dataLabels: {
                         enabled: true,
                         format: '{point.name} ({point.y})',
                         softConnector: true,
                         style: {
                             // fontFamily: 'monospace',
                             color: '#FFF'
                         }
                     },
                     center: ['40%', '50%'],
                     neckWidth: '30%',
                     neckHeight: '25%',
                     width: '80%'
                 }
             },
             legend: {
                 enabled: false
             },
             credits: {
                 enabled: false
             },
             series: this.seriesOptions
         })
     }, error: (error: any) => {
         console.log(JSON.stringify(error));
     }})
   }

}

