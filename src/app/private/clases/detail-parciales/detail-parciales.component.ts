import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../components/task-dialog/task-dialog.component';
const USER_DATA = [
  {
    name: 'John Smith',
    occupation: 'Advisor',
    dateOfBirth: '1984-05-05',
    age: 36,
  },
  {
    name: 'Muhi Masri',
    occupation: 'Developer',
    dateOfBirth: '1992-02-02',
    age: 28,
  },
  { name: 'Peter Adams', occupation: 'HR', dateOfBirth: '2000-01-01', age: 20 },
  {
    name: 'Lora Bay',
    occupation: 'Marketing',
    dateOfBirth: '1977-03-03',
    age: 43,
  },
];

const COLUMNS_SCHEMA = [
  {
    key: 'name',
    type: 'text',
    label: 'Full Name',
  },
  {
    key: 'occupation',
    type: 'text',
    label: 'Occupation',
  },
  {
    key: 'dateOfBirth',
    type: 'date',
    label: 'Date of Birth',
  },
  {
    key: 'age',
    type: 'number',
    label: 'Age',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

@Component({
  selector: 'app-detail-parciales',
  templateUrl: './detail-parciales.component.html',
  styleUrls: ['./detail-parciales.component.scss']
})
export class DetailParcialesComponent implements OnInit {
  displayedColumns2: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource2 = USER_DATA;
  columnsSchema: any = COLUMNS_SCHEMA;
  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  addTask() {
 
    const genProp = Math.floor(Math.random() * (999 - 100 + 1) + 100).toString();
    //console.log(keyProRand)
    this.columnsSchema.push({ 
      key: genProp,
      type: 'text',
      label: 'Nueva Columna',});

      this.displayedColumns2.push(
        genProp,
      );
     
      this.dataSource2.forEach((item, index, array)=> {
        // newDataKey= Object.keys(key).push('cali':null)
        // console.log('DATA ITEM');
      //   console.log(item);
      //   console.log('DATA INDEX');
      // console.log(index);
      // console.log('DATA ARRAY');
      // console.log(array);
      // Object.assign(item, );
      // console.log('DATA NEW ITEM');
      // console.log(item);
     
      });

}

openDialog(): void {
const dialogRef = this.dialog.open(TaskDialogComponent, {
  width: '50%',
  // data: {name: this.name, animal: this.animal},
});

dialogRef.afterClosed().subscribe((result: any) => {
  if (result['success']) {
 
  }else {
   
  }
});
}
}
