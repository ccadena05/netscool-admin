import { OnChanges, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsignarCalificacionComponent } from 'src/app/dialogs/asignar-calificacion/asignar-calificacion.component';
import { AsignarExtraComponent } from 'src/app/dialogs/asignar-extra/asignar-extra.component';
import { AsignarHorarioComponent } from 'src/app/dialogs/asignar-horario/asignar-horario.component';
import { AsignarMateriaComponent } from 'src/app/dialogs/asignar-materia/asignar-materia.component';
import { JwtAuthService } from 'src/app/services/auth/jwt-auth.service';
import { ProviderService } from 'src/app/services/provider/provider.service';

export const status = {
   'morado': 'bg-purple-100',
   'verde': 'bg-green-100',
   'amarillo': 'bg-yellow-100',
   'naranja': 'bg-orange-100',
   'rosado': 'bg-rose-100',
   'rojo': 'bg-red-100',
   'rosa': 'bg-pink-100',
   'gris': 'bg-gray-100',
   'blanco': 'bg-white'
}
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
   @Input() id: any;
   mod: any;
   alumn: any;
   paid: any;
   _id: any;
   bg: any;
   constructor(
      private provider: ProviderService,
      private jwtAuth: JwtAuthService,
      private dialog: MatDialog
   ) { }

   ngOnInit(): void {

   }

   ngOnChanges(changes: SimpleChanges) {
      if(changes['modulo']?.currentValue)
         this.modulo = changes['modulo']?.currentValue;

      if(changes['PROGRAMA_ACADEMICO_ID']?.currentValue)
         this.paid = changes['PROGRAMA_ACADEMICO_ID']?.currentValue;

      if(changes['alumno']?.currentValue)
         this.alumn = changes['alumno']?.currentValue;

      if(changes['id']?.currentValue)
         this._id = changes['id']?.currentValue;

      this.getBloquesAlumno(this.paid, this.modulo, this._id);
   }

   getBloquesAlumno(paid: any, modulo: any, id?: any) {
      if (id != null || paid != null && modulo) {
         this.provider.BD_ActionPost(modulo, 'bloques', { id: id, paid: paid,}).subscribe(
            (bloques: any) => {
               this.arrayBloques = bloques;
               this.provider.BD_ActionPost(modulo, 'reticula', { id: id, paid: paid }).subscribe(
                  (reticula: any) => {
                     this.arrayBloquesMaterias = reticula;
                  }
               );
            }
         );
      }
   }

   getBg(color: any){
      return status[color as keyof typeof status]
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
