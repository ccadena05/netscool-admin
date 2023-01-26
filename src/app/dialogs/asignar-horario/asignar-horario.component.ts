import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
   selector: 'app-asignar-horario',
   templateUrl: './asignar-horario.component.html',
   styleUrls: ['./asignar-horario.component.scss']
})
export class AsignarHorarioComponent implements OnInit {
   data: any;
   sel: any = [];
   grup: any = [];
   formulario: FormGroup;

   constructor(
      @Inject(MAT_DIALOG_DATA) public materia: any,
      private provider: ProviderService,
      private fb: FormBuilder
   ) {
      console.log(materia);
      this.formulario = this.fb.group({
         tbl_maestro_id: ['', Validators.required],
         tbl_grupo_id: ['', Validators.required]
      })
   }

   ngOnInit(): void {
      this.getData()
   }

   getData() {

      this.provider.BD_ActionPost('horarios', 'getDetailParametros', { id: this.materia.id }).subscribe(
         (data: any) => {
            console.log(data);
            this.data = data;
            this.provider.BD_ActionPost('horarios', 'getListasAsignarHorario', { id: this.materia.id }).subscribe(
               (data: any) => {
                  console.log(data);

                  this.sel = this.grup = data;
               }
            )
         }
      )
   }

   recibiRespuesta(respuesta: any, control: any) {
      console.log(respuesta);
      this.formulario.controls[control].setValue(respuesta)
     }

}
