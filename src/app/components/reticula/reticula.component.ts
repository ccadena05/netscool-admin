import { OnChanges, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsignarCalificacionComponent } from 'src/app/dialogs/asignar-calificacion/asignar-calificacion.component';
import { AsignarExtraComponent } from 'src/app/dialogs/asignar-extra/asignar-extra.component';
import { AsignarHorarioComponent } from 'src/app/dialogs/asignar-horario/asignar-horario.component';
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
   @Input() modulo: any;
   mod: any;
   alumn: any;
   paid: any;
   constructor(
      private provider: ProviderService,
      private jwtAuth: JwtAuthService,
      private dialog: MatDialog
   ) { }

   ngOnInit(): void {

   }

   ngOnChanges(changes: SimpleChanges) {
      console.log(changes);
      if(changes['modulo']?.currentValue)
         this.modulo = changes['modulo']?.currentValue;

      if(changes['PROGRAMA_ACADEMICO_ID']?.currentValue)
         this.paid = changes['PROGRAMA_ACADEMICO_ID']?.currentValue;

      if(changes['alumno']?.currentValue)
         this.alumn = changes['alumno']?.currentValue;

      this.getBloquesAlumno(this.paid, this.modulo);
   }

   getReticulaAlumno(paid: any, modulo: any) {
      if (this.alumno?.id != null || paid != null) {
         this.provider
            .BD_ActionPost(modulo, 'getReticula', {
               id: this.alumno?.id,
               paid: paid,
               //token: this.currentUser.token,
            })
            .subscribe({
               next: (data: any) => {
                   console.log(data)
                  this.arrayBloquesMaterias = data;
               },
               error: (error: any) => {
                  console.log(error);
               }
            });
      }
   }

   getBloquesAlumno(paid: any, modulo: any) {
      if (this.alumno?.id != null || paid != null && modulo) {
         this.provider
            .BD_ActionPost(modulo, 'getBloques', {
               id: this.alumno?.id,
               paid: paid,
               //token: this.currentUser.token,
            })
            .subscribe({
               next: (data2: any) => {
                  this.arrayBloques = data2;
                   console.log(data2);
                  this.getReticulaAlumno(paid, modulo);
               },
               error: (error: any) => {
                  console.log(error);
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

   cargarHorario(materia: any) {
      this.dialog.open(AsignarHorarioComponent, {
         data: materia,
         autoFocus: false
      })
   }

}
