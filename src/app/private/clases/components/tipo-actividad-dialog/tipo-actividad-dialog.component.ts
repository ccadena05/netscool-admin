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
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { DialogoConfirmacionComponent } from 'src/app/components/dialogo-confirmacion/dialogo-confirmacion.component';
export interface TaskType {
  name: string;
  value: number;

}
@Component({
  selector: 'app-tipo-actividad-dialog',
  templateUrl: './tipo-actividad-dialog.component.html',
  styleUrls: ['./tipo-actividad-dialog.component.scss']
})
export class TipoActividadDialogComponent implements OnInit {
 

  taskForm: FormGroup;

  constructor(
  
    private provider: ProviderService,
    public dialogRef: MatDialogRef<TipoActividadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
  ) {

    this.taskForm = new FormGroup({
      // email: new FormControl('', [Validators.required, Validators.email]),
      task: new FormControl('', [Validators.required]),
      porcentaje: new FormControl('', [Validators.required]),
      //password: new FormControl(true)
    });

    // console.log(this.data);

  }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  cerrarDialogo(): void {
    this.dialogRef.close({success:false});
  }

  confirmado(): void {
    //this.CreateEvento.value.user_id =
    this.taskForm.value.id_materia_maestro = this.data['id_materia_maestro'];
    this.taskForm.value.id_parciales_generales = this.data['data']['data']['id'];
    const formData = this.taskForm.value;
    // console.log(formData);
    this.provider
    .BD_ActionPostHeder('clases', 'createTipoActividad', formData)
    .subscribe({
      next: (data: any) => {
        // console.log(data);
        if (data['Mensaje'] === 1) {
         
          this._snackBar.open('Proceso ejecutado con exito', '', {
            duration: 5000,
          });
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


 

}

