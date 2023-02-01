import { Component, DoCheck, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SearchSelectComponent } from 'src/app/components/search-select/search-select.component';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { OutputService } from 'src/app/services/output.service';
import { ProviderService } from 'src/app/services/provider/provider.service';

export const status = {
   'ACTIVO': 'bg-gradient-lime',
   'BAJA': 'bg-gradient-red',
   'BAJA POR FALTA DE PAGO': 'bg-gradient-orange',
   'EGRESADO =)': 'bg-gradient-celestial',
   'TITULADO': 'bg-gradient-teal',
   'BAJA TEMPORAL': 'bg-gradient-yellow',
   'EGRESADO SIN TERMINAR': 'bg-gradient-purplelake'
}

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => SearchSelectComponent),
   multi: true
};

@Component({
   selector: 'app-egresados-detail',
   templateUrl: './egresados-detail.component.html',
   styleUrls: ['./egresados-detail.component.scss']
})
export class EgresadosDetailComponent implements OnInit, DoCheck {
   _id: any;
   _paid: any;
   alumno: any;
   data: any;
   profileImg: boolean = false;
   formulario!: FormGroup;
   sel: any = [];
   grup: any = [];
   checkbox: any = ['kardex', 'certificado', 'titulacion', 'foto2', 'documento_acta_nacimiento', 'documento_certificado', 'documento_curp']
   statusColor: any;

   constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private output: OutputService,
      private provider: ProviderService,
      private formBuilder: FormBuilder,
      private ls: LocalStoreService
   ) {
      router.events.subscribe((val) => {
         if (val instanceof NavigationEnd) {
            this._id = this.activatedRoute.snapshot.paramMap.get('id');
            this.getData();
         }
      });
   }

   ngOnInit(): void {
   }

   ngDoCheck(){
      document.querySelector('[vertical] .border-r-3')?.classList.remove("border-r-3","[border-image:linear-gradient(0deg,#6C2BD9,#E74694)1]");
      document.querySelector('[vertical] .mat-tab-label-active')?.classList.add("border-r-3","[border-image:linear-gradient(0deg,#6C2BD9,#E74694)1]");
   }

   getData(){
      this.output.ready.next(false)
      this.buildForm();
      this.provider.BD_ActionPost('egresados', 'detail', {id: this._id}).subscribe(
      (data: any) => {
         this.data = data;
         this._paid = data['DETAIL'].PROGRAMA_ACADEMICO_ID;
         this.alumno = data['DETAIL'];
         this.patchForm(data['DETAIL']);

         this.provider.BD_ActionPost('egresados', 'listas', {}).subscribe(
            (listas: any) => {
               this.statusColor = status[this.data['DETAIL']['ESTADO_ALUMNO'] as keyof typeof status]
               this.sel = this.grup = listas;
               this.ls.update('bc', [
                  {
                     item: 'Egresados',
                     link: '/m/egresados'
                  },
                  {
                     item: this.alumno.rfc,
                     link: null
                  },
                  {
                     item: null,
                     link: null
                  },
                  {
                     item: null,
                     link: null
                  }
               ])
               this.output.ready.next(true)
            })
      })
   }

   cambiarContrasenaDialog() {

   }

   update() {

   }

   buildForm() {
      this.formulario = this.formBuilder.group({
          id: [''],
          apellido_materno: [''],
          apellido_paterno: ['', Validators.required],
          beca: ['', Validators.required],
          celular: [''],
          codigo_postal: [''],
          direccion: [''],
          email: [''],
          fecha_nacimiento: [''],
          foto: [''],
          indicaciones_medicas: [''],
          inscripcion: ['', Validators.required],
          nombre: ['', Validators.required],
          rfc: ['', Validators.required],
          tbl_estado_alumno_id: ['', Validators.required],
          tbl_estado_id: [''],
          tbl_generacion_id: ['', Validators.required],
          tbl_municipio_id: [''],
          tbl_pais_id: [''],
          tbl_programa_academico_id: ['', Validators.required],
          tbl_sangre_id: [''],
          tbl_sexo_id: [''],
          documento_acta_nacimiento: [''],
          documento_certificado: [''],
          documento_curp: [''],
          telefono: [''],
          certificado: [''],
          empresa: [''],
          salario: [''],
          puesto: [''],
          foto2: [''],
          facebook: [''],
          linkedin: [''],
          correo_personal: [''],
          tbl_modalidad_titulacion_id: [''],
          kardex: [''],
          titulacion: ['']
      });
   }

   patchForm(data: any){
      this.checkbox.forEach((element: any) => {
         data[element] = data[element] == 1 ? true : false
     });
      Object.keys(this.formulario.controls).forEach(element => {
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
