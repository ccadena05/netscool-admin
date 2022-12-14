import { OnChanges, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsignarCalificacionComponent } from 'src/app/dialogs/asignar-calificacion/asignar-calificacion.component';
import { AsignarExtraComponent } from 'src/app/dialogs/asignar-extra/asignar-extra.component';
import { AsignarMateriaComponent } from 'src/app/dialogs/asignar-materia/asignar-materia.component';
import { JwtAuthService } from 'src/app/services/auth/jwt-auth.service';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
   selector: 'app-reticula',
   templateUrl: './reticula.component.html',
   styleUrls: ['./reticula.component.scss']
})
export class ReticulaComponent implements OnInit, OnChanges {
   arrayBloques: any = [];
   arrayBloquesMaterias: any = [];
   @Input() alumno: any;
   @Input() PROGRAMA_ACADEMICO_ID: any;
   constructor(
      private provider: ProviderService,
      private jwtAuth: JwtAuthService,
      private dialog: MatDialog
   ) { }

   ngOnInit(): void {

   }

   ngOnChanges(changes: SimpleChanges) {
      this.getBloquesAlumno(changes['PROGRAMA_ACADEMICO_ID']?.currentValue);
   }

   getReticulaAlumno(paid: any) {
      if (this.alumno?.id != null && paid != null) {
         this.provider
            .BD_ActionPost('alumnos', 'getReticula', {
               id: this.alumno?.id,
               paid: paid,
               //token: this.currentUser.token,
            })
            .subscribe({
               next: (data: any) => {
                  // console.log(data)
                  this.arrayBloquesMaterias = data;
               },
               error: (error: any) => {
                  console.log(error);
               }
            });
      }
   }

   getBloquesAlumno(paid: any) {
      if (this.alumno?.id != null && paid != null) {
         this.provider
            .BD_ActionPost('alumnos', 'getBloques', {
               id: this.alumno?.id,
               paid: paid,
               //token: this.currentUser.token,
            })
            .subscribe({
               next: (data2: any) => {
                  this.arrayBloques = data2;
                  // console.log(data2);
                  this.getReticulaAlumno(paid);
               },
               error: (error: any) => {
                  //console.log(error);
               }
            });
      }
   }

   asignarMateria(materia: any){
      materia.nombreAlumno = this.alumno?.NOMBRE_COMPLETO
      materia.rfc = this.alumno?.rfc;
      this.dialog.open(AsignarMateriaComponent,{
         data: materia,
         autoFocus: false,
         /* height: '100%',
         width: '100%',
         maxHeight: '100vh',
         maxWidth: ' 100vw', */
      })
   }

   asignarExtra(materia: any){
      console.log(this.alumno);
      
      materia.nombreAlumno = this.alumno?.NOMBRE_COMPLETO
      materia.rfc = this.alumno?.rfc;
      this.dialog.open(AsignarExtraComponent,{
         data: materia,
         autoFocus: false,
         /* height: '100%',
         width: '100%',
         maxHeight: '100vh',
         maxWidth: ' 100vw', */
      })
   }

   asignarCalificacion(materia: any){
      materia.nombreAlumno = this.alumno?.NOMBRE_COMPLETO
      materia.rfc = this.alumno?.rfc;
      this.dialog.open(AsignarCalificacionComponent,{
         data: materia,
         autoFocus: false,
         /* height: '100%',
         width: '100%',
         maxHeight: '100vh',
         maxWidth: ' 100vw', */
      })
   }

}
