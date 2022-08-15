import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {


  taskForm: FormGroup;
  isDisable:boolean;
  lista:any;


  constructor(
    private provider: ProviderService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    // console.log(data);
    this.isDisable = false;
    this.taskForm = new FormGroup({
      // email: new FormControl('', [Validators.required, Validators.email]),
      nombre: new FormControl('', [Validators.required]),
      tbl_parciales_task_tipo: new FormControl('', [Validators.required]),
      fecha_publicacion: new FormControl('', [Validators.required]),
      //password: new FormControl(true)
    });
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close({success:false});
  }

  cerrarDialogo(): void {
    this.dialogRef.close({success:false});
  }

  confirmado(): void {
    
    //this.taskForm.value.tbl_materias_id = this.data['data']['tbl_materias_id'];
    const formData = this.taskForm.value;

    this.provider
    .BD_ActionPostHeder('clases', 'alumnosNuevaActividadParcial', formData)
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
            panelClass: ['warning']
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
