import { Chart } from 'angular-highcharts';

import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { OutputService } from 'src/app/services/output.service';
import { KeyValuePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { menu } from '../menu';

@Component({
   selector: 'app-egresados',
   templateUrl: './egresados.component.html',
   styleUrls: ['./egresados.component.scss']
})
export class EgresadosComponent implements OnInit {
   modulo: any;
   data: any;
   ready: boolean = false;
   columns: any = [];
   dataSource: any;
   displayedColumns: any;
   seccion: any;
   @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
   @ViewChild(MatSort) sort: MatSort = {} as MatSort;

   constructor(
      private provider: ProviderService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private output: OutputService,
      private keyvalue: KeyValuePipe,
      private _liveAnnouncer: LiveAnnouncer
   ) {
      router.events.subscribe((event: any) => {
         if (event instanceof NavigationEnd) {
            this.modulo = this.activatedRoute.snapshot.paramMap.get('modulo');
            menu.forEach(element => {
               element.menu.forEach(el => {
                  if('/m/' + this.modulo == el.link) {
                     this.seccion = el.item;
                  }
               });
            });
            this.columns = [];
            this.getData();
         }
      })
   }

   ngOnInit(): void {
   }

   getData() {
      this.ready = false;
      this.provider.BD_ActionPost(this.modulo, 'index').subscribe({
         next: (data: any) => {
            this.data = data.data;
            this.sendData(data);
            this.dataSource = new MatTableDataSource(data.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            this.keyvalue.transform(this.data[0]).forEach((element: any, index: any) => {
               this.columns.push({
                  columnDef: element.key,
                  header: element.key,
                  cell: (el: any) => `${el[element.key]}`
               });
            });
            this.displayedColumns = this.columns.map((c: any) => c.columnDef)

            /*
            console.log(this.columns);
            console.log(this.displayedColumns);
            console.log(this.dataSource);
            */
            this.ready = true;
         }, error: (error: any) => {
            console.log(error);
         }
      })
   }
   sendData(data: any) {
      this.output.dataData.next(data);
   }

   applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }

   announceSortChange(sortState: Sort) {
      // This example uses English messages. If your application supports
      // multiple language, you would internationalize these strings.
      // Furthermore, you can customize the message to add additional
      // details about the values being sorted.
      if (sortState.direction) {
         this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
         this._liveAnnouncer.announce('Sorting cleared');
      }
   }

}
