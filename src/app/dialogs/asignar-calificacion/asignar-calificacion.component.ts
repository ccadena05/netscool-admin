import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
   selector: 'app-asignar-calificacion',
   templateUrl: './asignar-calificacion.component.html',
   styleUrls: ['./asignar-calificacion.component.scss']
})
export class AsignarCalificacionComponent implements OnInit {
   materia: any;
   formulario: FormGroup;
   formularioParc: FormGroup;
   items: any[] = [
      { id: 1, name: 'AC' },
      { id: 2, name: 'NC' },
    ];

   constructor(
      @Inject(MAT_DIALOG_DATA) data: any,
      private fb: FormBuilder
   ) {
      this.materia = data;
      this.formulario = this.fb.group({
         calificacion: ['', [Validators.required, Validators.pattern(/^[0-9]*(\.[0-9]{0,2})?$/), Validators.max(10)]],
         observaciones: ['', [Validators.required, Validators.minLength(1)]],
         estatus: ['']
      });

      if(this.materia.optativa == 1)
         this.formulario.get('estatus')?.setValidators(Validators.required);

      this.formularioParc = this.fb.group({
         calificacion: ['', [Validators.required, Validators.pattern(/^[0-9]*(\.[0-9]{0,2})?$/), Validators.max(10)]],
         observaciones: ['', [Validators.required, Validators.minLength(1)]],
      });
   }

   ngOnInit(): void {

   }

}
