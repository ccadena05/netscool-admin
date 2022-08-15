import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  
  displayedColumns2: string[] | undefined;
  columnsSchema: any;
  dataSource2: any;

  constructor() { }

  ngOnInit(): void {
  }

}
