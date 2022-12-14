import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
   selector: 'app-asignar-materia',
   templateUrl: './asignar-materia.component.html',
   styleUrls: ['./asignar-materia.component.scss']
})
export class AsignarMateriaComponent implements OnInit {
   materia: any;
   formulario: FormGroup;
   grupos: any = [];

   constructor(
      @Inject(MAT_DIALOG_DATA) data: any,
      private fb: FormBuilder,
      private provider: ProviderService
   ) {
      this.materia = data;
      console.log(data);

      this.formulario = this.fb.group({
         grupo: ['', Validators.required]
      })
   }

   ngOnInit(): void {
      this.getGrupo()
   }

   getGrupo() {
      this.provider.BD_ActionPost('grupo', 'getDetailParametros', { id: this.materia.id }).subscribe(
         data => this.grupos = data
      )
   }

   search(v: any, arreglo: any) {
      let val = v.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return arreglo.filter((option: any) => option.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(val));
   }

}
