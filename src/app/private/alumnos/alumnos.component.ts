import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from "ngx-spinner";
import { ProviderService } from 'src/app/services/provider/provider.service';
import { CreateComponent } from './create/create.component';
export interface UserData {
   foto: string;
   id: string;
   name: string;
   progress: string;
   fruit: string;
   actions: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
   'blueberry',
   'lychee',
   'kiwi',
   'mango',
   'peach',
   'lime',
   'pomegranate',
   'pineapple',
];
const NAMES: string[] = [
   'Maia',
   'Asher',
   'Olivia',
   'Atticus',
   'Amelia',
   'Jack',
   'Charlotte',
   'Theodore',
   'Isla',
   'Oliver',
   'Isabella',
   'Jasper',
   'Cora',
   'Levi',
   'Violet',
   'Arthur',
   'Mia',
   'Thomas',
   'Elizabeth',
];

@Component({
   selector: 'app-alumnos',
   templateUrl: './alumnos.component.html',
   styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit, AfterViewInit {
   title: string;
   displayedColumns: string[] = ['name', 'progress', 'fruit', 'actions'];
   dataSource: MatTableDataSource<UserData>;
   alumnos: any;
   ready: boolean = false;

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;

   constructor(
      private provider: ProviderService,
      private spinner: NgxSpinnerService,
      public dialog: MatDialog,) {
         this.loadData();
      // Create 100 users
      const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
      this.title = "Alumnos";
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(users);
   }

   ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }
   loadData() {
      this.provider.BD_ActionPost('alumnos', 'index', '').subscribe({
         next: (data: any) => {
            console.log(data);
            this.alumnos = data.data;
            this.ready = true;
         },
         error: (error: any) => {
            console.log(error);
         }
      });
   }

   applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }

   ngOnInit(): void {
   }

   openDialog(): void {
      const dialogRef = this.dialog.open(CreateComponent, {
         maxWidth: '100vw',
         maxHeight: '100vh',
         height: '100%',
         width: '100%',
         panelClass: 'full-screen-modal',
         data: {},
      });
      dialogRef.afterClosed().subscribe(result => {
         this.spinner.show();
         this.spinner.hide();

      });
   }

}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
   const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';

   return {
      foto: '',
      id: id.toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
      actions: ''
   };
}
