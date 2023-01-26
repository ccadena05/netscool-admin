import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/components/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AsignarCalificacionComponent } from './asignar-calificacion/asignar-calificacion.component';
import { AsignarExtraComponent } from './asignar-extra/asignar-extra.component';
import { AsignarMateriaComponent } from './asignar-materia/asignar-materia.component';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';
import { ComponentsModule } from '../components/components.module';
import { AsignarHorarioComponent } from './asignar-horario/asignar-horario.component';
import { MatTableModule } from '../components/mat-table/mat-table.module';



@NgModule({
   declarations: [
      AsignarMateriaComponent,
      CambiarContrasenaComponent,
      AsignarExtraComponent,
      AsignarCalificacionComponent,
      AsignarHorarioComponent,
   ],
   imports: [
      CommonModule,
      MaterialModule,
      ReactiveFormsModule,
      FormsModule,
      RouterModule,
      ComponentsModule,
      MatTableModule
    ],
})
export class DialogsModule { }
