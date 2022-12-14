import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
   selector: 'app-asignar-extra',
   templateUrl: './asignar-extra.component.html',
   styleUrls: ['./asignar-extra.component.scss']
})
export class AsignarExtraComponent implements OnInit {
   materia: any;
   formulario: FormGroup;
   sel: any = [];
   grup: any = [];
   items: any[] = [
      { id: 1, name: 'AC' },
      { id: 2, name: 'NC' },
   ];

   constructor(
      private fb: FormBuilder,
      private provider: ProviderService,
      @Inject(MAT_DIALOG_DATA) data: any,
   ) {
      this.materia = data;
      this.formulario = this.fb.group({
         calificacion: ['', [Validators.required, Validators.pattern(/^[0-9]*(\.[0-9]{0,2})?$/), Validators.max(10)]],
         fecha: ['', Validators.required],
         validada: [false, Validators.required],
         extra: [false, Validators.required],
         observaciones: ['', [Validators.required, Validators.minLength(1)]],
         tbl_maestro_id: ['', Validators.required],
         tbl_grupo_id: ['', Validators.required],
         estatus: ['']
      })
      console.log(this.formulario);

      if (this.materia.optativa == 1)
         this.formulario.get('estatus')?.setValidators(Validators.required);

         this.getData();
   }

   ngOnInit(): void {

   }

   getData(): void {
      this.provider.BD_ActionPost('alumnos', 'getListasAsignarExtra', { id: this.materia.id }).subscribe(
         data => this.sel = this.grup = data
      )
   }

   search(v: any, arreglo: any){
       let val = v.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
       return arreglo.filter((option: any) => option.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(val));
   }

   enviar(){
      console.log(this.formulario.value);

   }

   recibiRespuesta(respuesta: any, control: any) {
      console.log(respuesta);
      this.formulario.controls[control].setValue(respuesta)
     }

}
