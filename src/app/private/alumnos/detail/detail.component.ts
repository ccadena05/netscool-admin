import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  _id: number;
  taskForm: FormGroup;
  constructor(
    private provider: ProviderService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) { 
    
    this._id=0;
    this.route.params.subscribe(params => {
      this._id = params['id'];
    });
    this.taskForm = new FormGroup({
      codigo: new FormControl(''),
      nombre: new FormControl('', [Validators.required]),
      tbl_parciales_task_tipo: new FormControl('', [Validators.required]),
      fecha_publicacion: new FormControl('', [Validators.required]),
    });

  }

  ngOnInit(): void {
  }

  cargaInicial() {
    this.provider
    .BD_ActionPostHeder('clases', 'getTask', { id: this._id })
    .subscribe({
      next: (data: any) => {
        this.taskForm.get('codigo')!.setValue(data['codigo']);
        this.taskForm.get('nombre')!.setValue(data['nombre']);
        this.taskForm.get('tbl_parciales_task_tipo')!.setValue(data['tbl_parciales_task_tipo']);
        this.taskForm.get('fecha_publicacion')!.setValue(data['fecha_publicacion']);
      },
      error: (err) => {
        this._snackBar.open('Error', '', {
          duration: 5000,
        });
      },
    });

   
  }
}
