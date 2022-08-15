import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasesRoutingModule } from './clases-routing.module';
import { ClasesComponent } from './clases.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorCatchingInterceptor } from 'src/app/services/auth/error-interceptor.service';
import { DetailComponent } from './detail/detail.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { DetailParcialesComponent } from './detail-parciales/detail-parciales.component';
import { SabanaDialogComponent } from './components/sabana-dialog/sabana-dialog.component';
import { TipoActividadDialogComponent } from './components/tipo-actividad-dialog/tipo-actividad-dialog.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { TaskScoreComponent } from './components/task-score/task-score.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { TaskDialogDetailComponent } from './components/task-dialog-detail/task-dialog-detail.component';
import { DialogoConfirmacionComponent } from 'src/app/components/dialogo-confirmacion/dialogo-confirmacion.component';

@NgModule({
  declarations: [
    ClasesComponent,
    DetailComponent,
    TaskDialogComponent,
    DetailParcialesComponent,
    SabanaDialogComponent,
    TipoActividadDialogComponent,
    TaskScoreComponent,
    TaskDialogDetailComponent,
    DialogoConfirmacionComponent
  ],
  imports: [
    CommonModule,
    ClasesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableExporterModule,
    NgxSpinnerModule,
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorCatchingInterceptor,
        multi: true
    }
],
})
export class ClasesModule { }
