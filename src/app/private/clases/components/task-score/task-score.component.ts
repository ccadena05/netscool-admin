import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
export interface TaskType {
  name: string;
  value: number;

}
@Component({
  selector: 'app-task-score',
  templateUrl: './task-score.component.html',
  styleUrls: ['./task-score.component.scss']
})
export class TaskScoreComponent implements OnInit {

 
  taskForm: FormGroup;

  constructor(
    private provider: ProviderService,
    public dialogRef: MatDialogRef<TaskScoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
  ) {

    this.taskForm = new FormGroup({
      // email: new FormControl('', [Validators.required, Validators.email]),
      id: new FormControl(''),
      calificacion: new FormControl('', [Validators.required]),
      observaciones: new FormControl(''),
      fecha_entrega: new FormControl('', [Validators.required]),
      //password: new FormControl(true)
    });

    this.cargaInicial();
  }

  ngOnInit(): void {
  }

  cargaInicial() {
    this.provider
    .BD_ActionPostHeder('clases', 'getTaskScore', { id: this.data['id'] })
    .subscribe({
      next: (data: any) => {
        // console.log(data);
        this.taskForm.get('id')!.setValue(data[0]['id']);
        this.taskForm.get('calificacion')!.setValue(data[0]['calificacion']);
        this.taskForm.get('fecha_entrega')!.setValue(data[0]['fecha_entrega']);
        this.taskForm.get('observaciones')!.setValue(data[0]['observaciones']);
      },
      error: (err) => {
        this._snackBar.open('Error', '', {
          duration: 5000,
        });
      },
    });

   
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  cerrarDialogo(): void {
    this.dialogRef.close({success:false});
  }

  confirmado(): void {

    const formData = this.taskForm.value;
    console.log(formData);
    this.provider
    .BD_ActionPostHeder('clases', 'updateTaskScore', formData)
    .subscribe({
      next: (data: any) => {
        console.log(data);
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
