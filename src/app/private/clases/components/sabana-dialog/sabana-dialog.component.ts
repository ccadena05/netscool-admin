import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskScoreComponent } from '../task-score/task-score.component';
import { TipoActividadDialogComponent } from '../tipo-actividad-dialog/tipo-actividad-dialog.component';
import { NgxSpinnerService } from "ngx-spinner";
import { TaskDialogDetailComponent } from '../task-dialog-detail/task-dialog-detail.component';

@Component({
  selector: 'app-sabana-dialog',
  templateUrl: './sabana-dialog.component.html',
  styleUrls: ['./sabana-dialog.component.scss'],
})
export class SabanaDialogComponent implements OnInit {
  displayedColumns2: string[] | undefined;
  dataSource2: any;
  columnsSchema: any;
  editable:any;
  message: string = 'Adjust window width to 400px to see the effect.';
  parcial: any;
  fecha_inicial: any;
  fecha_final: any;
  id_materia_maestro: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<SabanaDialogComponent>,
    public dialog: MatDialog,
    private provider: ProviderService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    //console.log(this.data['data']['id']);
    this.provider
      .BD_ActionPostHeder('clases', 'alumnosParcial', {
        id_materia_maestro: this.data['id_materia_maestro'],
        tbl_grupo_id: this.data['tbl_grupo_id'],
        tbl_materias_id: this.data['tbl_materias_id'],
        tbl_periodo_id: this.data['tbl_periodo_id'],
        fecha: this.data['fecha'],
        tbl_parciales_generales_id: this.data['data']['id'],
        // materia: this._tbl_materias_id,
        // fecha: this._fecha,
        // grupo: this._tbl_grupo_id,
        // periodo: this._tbl_periodo_id,
      })
      .subscribe({
        next: (data: any) => {
          // console.log(data);
          this.displayedColumns2 = data['columns'][0].map(
            (col: any) => col.key
          );
          this.dataSource2 = data['data'];
          this.editable = data['editable'];
          this.columnsSchema = data['columns'][0];
          // Parciales
          this.spinner.hide();
        },
        error: (err) => {
          //console.log(err.message);
          //this.jwtAuth.signout();
          this.spinner.hide();
        },
      });
  }

  ngOnInit(): void {
    this.parcial = this.data['data']['contador'];
    this.fecha_inicial = this.data['data']['fecha_inicial'];
    this.fecha_final = this.data['data']['fecha_final'];
    this.id_materia_maestro = this.data['id_materia_maestro'];
    // console.log(this.data);
  }

  onClose(): void {
    this.dialogRef.close(true);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '25%',
      data: { data: this.data, id_materia_maestro: this.id_materia_maestro },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.spinner.show();
      this.provider
      .BD_ActionPostHeder('clases', 'alumnosParcial', {
        id_materia_maestro: this.data['id_materia_maestro'],
        tbl_grupo_id: this.data['tbl_grupo_id'],
        tbl_materias_id: this.data['tbl_materias_id'],
        tbl_periodo_id: this.data['tbl_periodo_id'],
        fecha: this.data['fecha'],
        tbl_parciales_generales_id: this.data['data']['id'],
        // materia: this._tbl_materias_id,
        // fecha: this._fecha,
        // grupo: this._tbl_grupo_id,
        // periodo: this._tbl_periodo_id,
      })
      .subscribe({
        next: (data: any) => {
          // console.log(data);
          this.displayedColumns2 = data['columns'][0].map(
            (col: any) => col.key
          );
          this.dataSource2 = data['data'];
          this.columnsSchema = data['columns'][0];
          // Parciales
          this.spinner.hide();
        },
        error: (err) => {
          //console.log(err.message);
          //this.jwtAuth.signout();
          this.spinner.hide();
        },
      });
    
    });
  }

  openTaskDialogDetail(id:any): void {
    const dialogRef = this.dialog.open(TaskDialogDetailComponent, {
      width: '25%',
      data: { data: this.data, id:id, id_materia_maestro: this.id_materia_maestro },
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      this.refreshTable();
    
    });
  }

  openTipoTaskDialog(): void {
    const dialogRef = this.dialog.open(TipoActividadDialogComponent, {
      width: '25%',
      data: { data: this.data, id_materia_maestro: this.id_materia_maestro },
    });
  }

  openTaskScoreDialog(id: any): void {
    console.log(id);
    const dialogRef = this.dialog.open(TaskScoreComponent, {
      width: '25%',
      data: {
        data: this.data,
        id_materia_maestro: this.id_materia_maestro,
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
     this.refreshTable();
    
    });
  }

  asignarCalificacionTask(id: any) {
    alert(id);
  }

  validarNombre(valor: string) {
    if (valor) {
      if (valor.length > 5) {
        return true;
      } else {
        return false;
      }
    }else{
      return false;
    }
  }
  refreshTable(){
    this.spinner.show();
    return this.provider
    .BD_ActionPostHeder('clases', 'alumnosParcial', {
      id_materia_maestro: this.data['id_materia_maestro'],
      tbl_grupo_id: this.data['tbl_grupo_id'],
      tbl_materias_id: this.data['tbl_materias_id'],
      tbl_periodo_id: this.data['tbl_periodo_id'],
      fecha: this.data['fecha'],
      tbl_parciales_generales_id: this.data['data']['id'],
      // materia: this._tbl_materias_id,
      // fecha: this._fecha,
      // grupo: this._tbl_grupo_id,
      // periodo: this._tbl_periodo_id,
    })
    .subscribe({
      next: (data: any) => {
         console.log(data);
        this.displayedColumns2 = data['columns'][0].map(
          (col: any) => col.key
        );
        this.dataSource2 = data['data'];
        this.columnsSchema = data['columns'][0];
        // Parciales
        this.spinner.hide();
      },
      error: (err) => {
        //console.log(err.message);
        //this.jwtAuth.signout();
        this.spinner.hide();
      },
    });
  }
}
