import { LiveAnnouncer } from '@angular/cdk/a11y';
import { KeyValuePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface GroupBy {
   groupedBy: string;
   isGroupBy: boolean;
}

@Component({
   selector: 'app-mat-table-group',
   templateUrl: './mat-table-group.component.html',
   styleUrls: ['./mat-table-group.component.scss']
})
export class MatTableGroupComponent implements OnInit, OnChanges {
   columns: any = [];
   displayedColumns: any = [];
   matchStrings = /ID|id|Fecha|fecha_baja_imss|fecha_baja_laboral|fecha_ingreso|fecha_nacimiento|fecha_salida|Comprobante|comprobante|constancia|credencial|curp2|rfc2|email2|visita|codigo|DATAORDER|PERIODO_ANIO|califa|estatus|observaciones|optativa|PROMEDIO/
   @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
   @ViewChild(MatSort) sort: MatSort = {} as MatSort;
   @Input() dataToDisplay: any = [{}];
   @Input() group: any = '';
   dataSource: any = [];
   datos: any = [];
   datosGroup: any = [];
   arrayChange: any = [];

   constructor(
      private _liveAnnouncer: LiveAnnouncer,
      private keyvalue: KeyValuePipe,
   ) { }

   ngOnInit(): void {
   }

   ngOnChanges(changes: SimpleChanges) {
      if (!changes['dataToDisplay']?.firstChange && changes['dataToDisplay']?.currentValue != null) {
         this.datos = changes['dataToDisplay']?.currentValue != false ? changes['dataToDisplay']?.currentValue : changes['dataToDisplay']?.previousValue;
         this.groupData(this.datos);

         this.columns = [];
         this.dataSource = new MatTableDataSource(this.datos);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
         this.keyvalue.transform(this.datos[this.datos.length - 1])?.forEach((element: any, index: any) => {
            this.columns?.push({
               columnDef: element?.key,
               header: element?.key.replace(/_/g, " "),
               cell: (el: any) => `${el[element?.key]}`
            });
         });
         this.displayedColumns = this.columns?.map((c: any) => c?.columnDef)
      }
   }

   applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement)?.value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource?.paginator) {
         this.dataSource?.paginator.firstPage();
      }
   }

   announceSortChange({ sortState }: { sortState: Sort; }) {
      if (sortState?.direction) {
         this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
         this._liveAnnouncer.announce('Sorting cleared');
      }
   }
   isGroup(index: any, item: any): boolean {
      return item.isGroupBy;
   }
   groupData(data: any) {
      this.arrayChange.unshift(0)
      try {
         for (let i = 0; i < data.length; i++) {
            if (data[i][this.group] != data[i + 1][this.group])
            this.arrayChange.push(i + 1)
         }
      } catch (error) { }

      this.arrayChange = this.arrayChange.filter((element: any, index: any) => {
         return this.arrayChange.indexOf(element) === index;
     });
           
      try {
         this.arrayChange.forEach((ee: any, ii: any) => {
            data.splice((ii + ee), 0, { groupedBy: data[ii + ee][this.group], isGroupBy: true })
         });
      } catch (error) { }
      return data;
   }

}
