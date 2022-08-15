import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface TaskType {
  name: string;
  value: number;

}
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { DialogoConfirmacionComponent } from 'src/app/components/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-task-dialog-detail',
  templateUrl: './task-dialog-detail.component.html',
  styleUrls: ['./task-dialog-detail.component.scss']
})
export class TaskDialogDetailComponent implements OnInit {
 
  options: TaskType[] = [{name: 'Examen',value:50}, {name: 'Tarea',value:35}, {name: 'Proyecto',value:15}];
  filteredOptions: Observable<TaskType[]>;
  taskForm: FormGroup;
  isDisable:boolean;
  lista:any;
  nombre:string;
  barButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Guardar',
    buttonColor: 'primary',
    barColor: 'primary',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false,
    fullWidth: false,
    // buttonIcon: {
    //    fontIcon: 'favorite'
    // }
  };

  constructor(
    public dialogo: MatDialog,
    private provider: ProviderService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TaskDialogDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    // console.log(data);
    this.isDisable = false;
    this.nombre = '';
    this.taskForm = new FormGroup({
      // email: new FormControl('', [Validators.required, Validators.email]),
      codigo: new FormControl(''),
      nombre: new FormControl('', [Validators.required]),
      tbl_parciales_task_tipo: new FormControl('', [Validators.required]),
      fecha_publicacion: new FormControl('', [Validators.required]),
      //password: new FormControl(true)
    });
    this.cargaInicial();

    this.filteredOptions = this.taskForm.valueChanges.pipe(
      startWith(''),
      map((value:any) => (typeof value === 'string' ? value : value.task)),
      map((name:any) => (name ? this._filter(name) : this.options.slice())),
    );

    this.provider
    .BD_ActionPostHeder('clases', 'getListaParcialtask', {tbl_parciales_generales_id:this.data['data']['data']['id'],tbl_materia_maestro_id:this.data['id_materia_maestro']})
    .subscribe({
      next: (data: any) => {
        // console.log(data);
        this.lista = data;
     
      },
      error: (err) => {
        this._snackBar.open('Error', '', {
          duration: 5000,
        });
      },
    });
  }

  ngOnInit(): void {
  }

  private _filter(filterBy: string): TaskType[] {
    if (filterBy) {
    filterBy = filterBy.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterBy) !== -1);
    }else{
      return this.options;
    }
  }

  displayFn(user: TaskType): string {
    return user && user.name ? user.name : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cerrarDialogo(): void {
    this.dialogRef.close({success:false});
  }

  cargaInicial() {
    this.provider
    .BD_ActionPostHeder('clases', 'getTask', { id: this.data['id'] })
    .subscribe({
      next: (data: any) => {
        // console.log(data);
        this.nombre = data['nombre'];
        this.taskForm.get('codigo')!.setValue(data['codigo']);
        this.taskForm.get('nombre')!.setValue(data['nombre']);
        this.taskForm.get('tbl_parciales_task_tipo')!.setValue(data['tbl_parciales_task_tipo']);
        this.taskForm.get('fecha_publicacion')!.setValue(data['fecha_publicacion']);
      },
      error: (err) => {
        this._snackBar.open('Error', '', {
          duration: 5000,
        });
      },
    });

   
  }

  confirmado(): void {
    this.barButtonOptions.active = true;
    this.barButtonOptions.text = 'Procesando...';
    // this.taskForm.value.tbl_materias_id = this.data['data']['tbl_materias_id'];
    // this.taskForm.value.fecha =  this.data['data']['fecha'];
    // this.taskForm.value.tbl_grupo_id =  this.data['data']['tbl_grupo_id'];
    // this.taskForm.value.tbl_periodo_id = this.data['data']['tbl_periodo_id'];
    const formData = this.taskForm.value;
    // console.log(formData);
    this.provider
    .BD_ActionPostHeder('clases', 'alumnosUpdateActividadParcial', formData)
    .subscribe({
      next: (data: any) => {
        // console.log(data);
        if (data['Mensaje'] === 1) {
         
          this._snackBar.open('Proceso ejecutado con exito', '', {
            duration: 5000,
          });
          console.log("Regresando respuesta");
          this.dialogRef.close();
          this.barButtonOptions.active = false;
          this.barButtonOptions.text = 'Guardar';
        } else {
          this._snackBar.open('Error', '', {
            duration: 5000,
          });
          this.barButtonOptions.active = false;
          this.barButtonOptions.text = 'Guardar';
        }
      },
      error: (err) => {
        this._snackBar.open('Error', '', {
          duration: 5000,
        });
        this.barButtonOptions.active = false;
        this.barButtonOptions.text = 'Guardar';
      },
    });
  }

  confirmado2(): void {
  
    const formData = this.taskForm.value;
    // console.log(formData);
    this.provider
    .BD_ActionPostHeder('clases', 'alumnosDeleteActividadParcial', formData)
    .subscribe({
      next: (data: any) => {
         console.log(data);
        if (data['Mensaje'] === 1) {
         
          this._snackBar.open('Proceso ejecutado con exito', '', {
            duration: 5000,
          });
          console.log("Regresando respuesta");
          this.dialogRef.close();
        
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
  }

  getDataPor(name:any,value:number){
    // console.log(name,value);
    this.isDisable=true;
    // this.taskForm.value.values = value;
    return this.taskForm.patchValue({
      porcentaje:value
    });
    // return this.taskForm.controls['values'].setValue(value);
    //this.taskForm.get('values').setValue(value);
  }

  mostrarDialogo(): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: '¿Seguro que deseas eliminar la actividad?'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.confirmado2();
        } else {
          //alert("Deberías probarlo, a mí me gusta :)");
        }
      });
  }

}

