import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OutputService } from 'src/app/services/output.service';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
   selector: 'app-egresados-detail',
   templateUrl: './egresados-detail.component.html',
   styleUrls: ['./egresados-detail.component.scss']
})
export class EgresadosDetailComponent implements OnInit, DoCheck, OnDestroy {
   _id: any;
   _paid: any;
   alumno: any;
   data: any;
   profileImg: boolean = false;
   formulario!: FormGroup;
   sel: any = [];
   grup: any = [];


   constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private output: OutputService,
      private provider: ProviderService,
      private formBuilder: FormBuilder,

   ) {
      router.events.subscribe((val) => {
         if (val instanceof NavigationEnd) {
            this._id = this.activatedRoute.snapshot.paramMap.get('id');
            this.getAll();
         }
      });
   }

   ngOnInit(): void {
   }

   ngDoCheck(){
      document.querySelector('[vertical] .border-r-3')?.classList.remove("border-r-3","[border-image:linear-gradient(0deg,#6C2BD9,#E74694)1]");
      document.querySelector('[vertical] .mat-tab-label-active')?.classList.add("border-r-3","[border-image:linear-gradient(0deg,#6C2BD9,#E74694)1]");
   }

   ngOnDestroy(): void {

   }

   getAll() {
      this.getData();
      this.buildForm();
   }

   getData(){
      this.provider.BD_ActionPost('egresados', 'alumnosDetail', {id: this._id}).subscribe(
      (data: any) => {
         this.output.ready.next(false)
         console.log(data);
         this.data = data;
         this._paid = data['DETAIL'].PROGRAMA_ACADEMICO_ID;
         this.alumno = data['DETAIL'];
         this.output.detail.next(this.alumno.rfc);
         this.output.masterSection.next('Egresados');
         data['DETAIL'].kardex = data['DETAIL'].kardex == 1 ? true : false;
         data['DETAIL'].certificado = data['DETAIL'].certificado == 1 ? true : false;
         data['DETAIL'].titulacion = data['DETAIL'].titulacion == 1 ? true : false;
         data['DETAIL'].foto2 = data['DETAIL'].foto2 == 1 ? true : false;
         data['DETAIL'].documento_acta_nacimiento = data['DETAIL'].documento_acta_nacimiento == 1 ? true : false;
         data['DETAIL'].documento_certificado = data['DETAIL'].documento_certificado == 1 ? true : false;
         data['DETAIL'].documento_curp = data['DETAIL'].documento_curp == 1 ? true : false;
         this.patchForm(data['DETAIL']);

         this.output.ready.next(true)
         this.provider.BD_ActionPost('egresados', 'getListas', {}).subscribe(
            (data: any) => {
               console.log(data);

               this.sel = this.grup = data;
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
