import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoConfirmacionComponent } from 'src/app/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
   selector: 'app-cambiar-contrasena',
   templateUrl: './cambiar-contrasena.component.html',
   styleUrls: ['./cambiar-contrasena.component.scss']
})
export class CambiarContrasenaComponent implements OnInit {
   UpdatePassword: FormGroup;
   subject: any

   constructor(
      @Inject(MAT_DIALOG_DATA) data: any,
      private formBuilder: FormBuilder,
      private dialog: MatDialog,
      private provider: ProviderService,
      private snackbar: MatSnackBar
   ) {
      this.subject = data;
      
      this.UpdatePassword = this.formBuilder.group({
         id: [data.id],
         password: ['', Validators.required]
      });
   }

   ngOnInit(): void {

   }
   
   confirm(){
      let confirm = this.dialog.open(DialogoConfirmacionComponent)

      confirm.afterClosed().subscribe({
         next: (data: any) => {
            console.log(data);
            if(data === true){
                this.provider.BD_ActionPost('alumnos', 'changePassword', this.UpdatePassword.value).subscribe({
                  next: (data: any) => {
                     console.log(data);
                     if (data['Mensaje'] === 0) {
                        this.snackbar.open('Tus cambios se han guardado exitosamente.', 'Cerrar', { duration: 3000 })
                        this.dialog.closeAll()
                     }
                  },
                  error: (error: any) => {
                     console.log(error);
                  }
               }); 
            }

         }

      })
   }

}
