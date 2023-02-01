import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SearchSelectComponent } from 'src/app/components/search-select/search-select.component';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { OutputService } from 'src/app/services/output.service';
import { ProviderService } from 'src/app/services/provider/provider.service';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => SearchSelectComponent),
   multi: true
};

@Component({
   selector: 'app-programa-academico-detail',
   templateUrl: './programa-academico-detail.component.html',
   styleUrls: ['./programa-academico-detail.component.scss']
})

export class ProgramaAcademicoDetailComponent implements OnInit {
   formulario!: FormGroup;
   _id: any;
   data: any = [];
   sel: any = [];
   grup: any = [];

   constructor(
      private output: OutputService,
      private formBuilder: FormBuilder,
      private provider: ProviderService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private ls: LocalStoreService
   ) {
      router.events.subscribe((val) => {
         if (val instanceof NavigationEnd) {
            this._id = this.activatedRoute.snapshot.paramMap.get('id');
            this.getAll();
         }
      });
      this.formulario = this.formBuilder.group({
         id: [''],
         descripcion: ['', Validators.required],
         especialidad: [''],
         tbl_carrera_id: ['', Validators.required],
         oficio: ['', Validators.required],
         secretaria_academica: ['', Validators.required],
         servicio_social: ['', Validators.required],
         coordinador: ['', Validators.required],
         fecha: ['', Validators.required],
         tbl_tipo_periodo_id: ['', Validators.required],
         estatus: [''],
      })
   }

   ngOnInit(): void {
   }

   getAll() {
      this.output.ready.next(false)
      this.provider.BD_ActionPost('programa_academico', 'getDetail', { id: this._id }).subscribe(
         data => {
            this.data = data
            console.log(data)

            this.provider.BD_ActionPost('programa_academico', 'getListas').subscribe(
               data => {
                  this.sel = this.grup = data;
                  this.patchForm(this.data);
                  this.ls.update('bc', [
                     {
                        item: 'Programa académico',
                        link: '/m/programa_academico'
                     },
                     {
                        item: this.data['carrera_descripcion'],
                        link: null
                     }
                  ])
                  this.output.ready.next(true)
               }

            )
         }
      )
   }

   update() {

   }

   patchForm(data: any) {
      Object.keys(this.formulario?.controls).forEach(element => {
         this.formulario.patchValue({
            [element]: data[element]
         })
      });
   }

   recibiRespuesta(respuesta: any, control: any, filter?: any) {
      let filtered = []

      this.formulario.controls[control].setValue(respuesta)

      if (!filter)
         filtered[filter] = this.sel[filter]
      else
         filtered[filter] = this.sel[filter]?.filter((option: any) => option['padre_id'] === respuesta.toString())
      this.grup = filtered;
   }

}
