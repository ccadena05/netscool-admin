import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alumnos } from 'src/app/models/alumnos.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { keys } from '@material-ui/core/styles/createBreakpoints';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../components/task-dialog/task-dialog.component';
import { SabanaDialogComponent } from '../components/sabana-dialog/sabana-dialog.component';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  displayedColumns: string[] = ['alumno','email', 'calificacion', 'observaciones'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  colorControl = new FormControl('primary');

 
  // AlumnosData:any=[];
  _tbl_grupo_id: number;
  _tbl_materias_id: number;
  _tbl_periodo_id: number;
  _id_materia_maestro: number;
  _fecha: string;
  editCalificacionForm: FormGroup;
  editObservacionForm: FormGroup;
  dataGeneral: any;
  parciales: any;
  enableEdit: boolean;
  materia:string;
  grupo:string;
  periodo:string;
  fecha:string;
  programa:number;
  id_materia_maestro:number;
  constructor(
    private fb: FormBuilder,
    private provider: ProviderService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router:Router,
  ) {
    this.enableEdit=true;
    this.editCalificacionForm = new FormGroup({
      calificacion: new FormControl('', Validators.required),
    });
    this.editObservacionForm = new FormGroup({
      observacion: new FormControl('', Validators.required),
    });
    this._tbl_grupo_id = 0;
    this._tbl_materias_id = 0;
    this._tbl_periodo_id = 0;
    this._id_materia_maestro = 0;
    this.id_materia_maestro = 0;
    this.programa = 0;
    this._fecha = '';
    this.materia='';
    this.grupo='';
    this.periodo='';
    this.fecha='';
    /** ID FORM URL **/
    this.route.params.subscribe((params) => {
      this._tbl_grupo_id = parseInt(atob(params['id_grupo']));
      this._tbl_materias_id = parseInt(atob(params['id_materia']));
      this._tbl_periodo_id = parseInt(atob(params['id_periodo']));
      this._id_materia_maestro = parseInt(atob(params['id_materia_maestro']));
      this._fecha = atob(params['fecha']);
    });
    this.provider
      .BD_ActionPostHeder('clases', 'clase', {
        materia: this._tbl_materias_id,
        fecha: this._fecha,
        grupo: this._tbl_grupo_id,
        periodo: this._tbl_periodo_id,
      })
      .subscribe({
        next: (data: any) => {
          // console.log(data);
          this.materia=data[0]['nombre'];
          this.grupo=data[0]['grupo'];
          this.periodo=data[0]['periodo'];
          this.fecha=data[0]['fecha'];
          this.programa=data[0]['id_programa_academico'];
          //this.id_materia_maestro = [0]['id_materia_maestro'];
          this.dataGeneral = data;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // Parciales
      this.provider
      .BD_ActionPostHeder('clases', 'claseParciales', {
        fecha: this._fecha,
        periodo: this._tbl_periodo_id,
        programa:  this.programa
      })
      .subscribe({
        next: (data: any) => {
        //  console.log(data);
          this.parciales = data;
        },
        error: (err) => {
          //console.log(err.message);
          //this.jwtAuth.signout();
        },
      });
        },
        error: (err) => {
          //console.log(err.message);
          //this.jwtAuth.signout();
        },
      });

  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // this.dataSource.paginator= this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyValidator(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    let partes = filterValue.split(".");
    // console.log(partes.length);
    if(parseFloat(partes[0])>10){
      (event.target as HTMLInputElement).value = '10';
      this.editCalificacionForm.value.calificacion = '10';
    }
    if(partes.length>=2){
      if(partes[1] && partes[1]!='5'){
        // console.log(partes[1]);
        let valorRedondeado= Math.round(parseFloat(filterValue)).toString();
        (event.target as HTMLInputElement).value = valorRedondeado;
        this.editCalificacionForm.value.calificacion = valorRedondeado;
      }
     
    }
    if(filterValue.includes('.')){
      //(event.target as HTMLInputElement).value = Math.round(parseFloat(filterValue)).toString();
    }
   

  }
  asignarCalificacion(id: any) {
    //const formData = this.editForm.value;
    this.editCalificacionForm.value.id = id;
    const Parametros = this.editCalificacionForm.value;
    this.provider
      .BD_ActionPostHeder('clases', 'asignarCalificacion', Parametros)
      .subscribe({
        next: (data: any) => {
          // console.log(data);
          if (data['Mensaje'] === 1) {
            // CODE
            let asignarCal = this.editCalificacionForm.value.calificacion;
            this.dataGeneral.map(function (dato: any) {
              if (dato.id_alumno_materia == id) {
                dato.calificacion = asignarCal;
              }

              return dato;
            });

            this.dataSource = new MatTableDataSource(this.dataGeneral);

            this.editCalificacionForm = new FormGroup({
              calificacion: new FormControl('', Validators.required),
            });
            // FIN CODE
            this._snackBar.open('Proceso ejecutado con exito', '', {
              duration: 5000,
            });
          } else {
            this._snackBar.open('Error', '', {
              duration: 5000,
            });
          }
        },
        error: (err) => {
          this._snackBar.open('Error', '', {
            duration: 5000,
          });
        },
      });
      this.enableEdit = !this.enableEdit;
  }

  asignarObservacion(id: any) {
    //const formData = this.editForm.value;
    this.editObservacionForm.value.id = id;
    const Parametros = this.editObservacionForm.value;
    this.provider
      .BD_ActionPostHeder('clases', 'asignarObservacion', Parametros)
      .subscribe({
        next: (data: any) => {
          // console.log(data);
          if (data['Mensaje'] === 1) {
            // CODE
            let asignarCal = this.editObservacionForm.value.observacion;
            this.dataGeneral.map(function (dato: any) {
              if (dato.id_alumno_materia == id) {
                dato.observaciones = asignarCal;
              }

              return dato;
            });

            this.dataSource = new MatTableDataSource(this.dataGeneral);

            this.editObservacionForm = new FormGroup({
              observacion: new FormControl('', Validators.required),
            });
            // FIN CODE
            this._snackBar.open('Proceso ejecutado con exito', '', {
              duration: 5000,
            });
          } else {
            this._snackBar.open('Error', '', {
              duration: 5000,
            });
          }
        },
        error: (err) => {
          this._snackBar.open('Error', '', {
            duration: 5000,
          });
        },
      });
      this.enableEdit = !this.enableEdit;
  }

  changeEditable(){
   // console.log("Hola Mundo");
   this.editCalificacionForm = new FormGroup({
    calificacion: new FormControl('', Validators.required),
  });
   this.editObservacionForm = new FormGroup({
    observacion: new FormControl('', Validators.required),
  });

    return this.enableEdit = !this.enableEdit;

  }

 

  // open(data:any){
  //   this.router.navigate(['/clases/detail-parciales',data.tbl_materias_id,data.tbl_grupo_id,data.tbl_periodo_id,data.fecha]);
  //   console.log(data);
  // }

  // openParcial(data:any){
  //   this.router.navigate(['/clases/detail-parciales',data.tbl_materias_id,data.tbl_grupo_id,data.tbl_periodo_id,data.fecha]);
  //   console.log(data);
  // }


  openParcial(data:any){
    this.router.navigate(['/clases/detail-parciales',btoa(data.id.toString()),btoa(this._id_materia_maestro.toString()),btoa(this._tbl_materias_id.toString()),btoa(this._tbl_grupo_id.toString()),btoa(this._tbl_periodo_id.toString()),btoa(this._fecha)]);
    // console.log(data);
  }

  openDialog(data:any) {
    // console.log(data);
    const dialogRef = this.dialog.open(SabanaDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
      data: {data:data, 
        id_materia_maestro:this._id_materia_maestro,
        tbl_grupo_id:this._tbl_grupo_id,
        tbl_materias_id:this._tbl_materias_id,
        tbl_periodo_id:this._tbl_periodo_id,
        fecha:this._fecha
      }
    });
  }

  
}
