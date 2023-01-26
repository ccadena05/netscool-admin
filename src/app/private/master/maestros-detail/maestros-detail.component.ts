import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JwtAuthService } from 'src/app/services/auth/jwt-auth.service';
import { FormService } from 'src/app/services/form.service';
import { OutputService } from 'src/app/services/output.service';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
   selector: 'app-maestros-detail',
   templateUrl: './maestros-detail.component.html',
   styleUrls: ['./maestros-detail.component.scss']
})
export class MaestrosDetailComponent implements OnInit {
   _id: any;
   data: any = [];
   dataContactos: any = [];
   dataActividades: any = [];
   dataVacaciones: any = [];
   sel: any = [];
   grup: any = [];
   formulario!: FormGroup;
   checkbox = ['credencial_elector', 'comprobante_domicilio', 'comprobante_estudios', 'acta_nacimiento', 'curriculum_vitae', 'constancia_cursos', 'rfc2', 'curp2', 'alta_nss']

   constructor(
      private provider: ProviderService,
      private jwtAuth: JwtAuthService,
      private activatedRoute: ActivatedRoute,
      private formBuilder: FormBuilder,
      private router: Router,
      private dialog: MatDialog,
      private snackbar: MatSnackBar,
      private output: OutputService,
      private _form: FormService
   ) {
      router.events.subscribe((val) => {
         if (val instanceof NavigationEnd) {
            this._id = this.activatedRoute.snapshot.paramMap.get('id');
            this.getAll();
         }
      });
      this.formulario = this.formBuilder.group({
         id: [''],
         rfc: [''],
         nombre: ['', Validators.required],
         apellido_paterno: ['', Validators.required],
         apellido_materno: [''],
         fecha_nacimiento: [''],
         telefono: [''],
         celular: ['', Validators.required],
         email: ['', [Validators.required, Validators.email]],
         direccion: [''],
         codigo_postal: [''],
         indicaciones_medicas: [''],
         tbl_sexo_id: [''],
         tbl_municipio_id: [''],
         tbl_estado_id: [''],
         tbl_pais_id: [''],
         tbl_sangre_id: [''],
         tbl_grado_id: [''],
         tbl_tipo_trabajador_id: [''],
         tbl_estado_maestro_id: [''],
         puesto: [''],
         entidad: [''],
         fecha_ingreso: [''],
         anios_antiguedad: [''],
         fecha_ingreso_imss: [''],
         numero_imss: [''],
         curp: [''],
         nacionalidad: [''],
         fecha_salida: [''],
         fecha_baja_imss: [''],
         fecha_baja_laboral: [''],
         motivo_salida: [''],
         tbl_estado_civil_id: [''],
         credencial_elector: [''],
         comprobante_domicilio: [''],
         acta_nacimiento: [''],
         comprobante_estudios: [''],
         curriculum_vitae: [''],
         constancia_cursos: [''],
         rfc2: [''],
         curp2: [''],
         alta_nss: [''],
         liga: [''],
         numero_empleado: [''],
         tbl_tipo_motivo_baja_id: [''],
         nomenclatura: [''],
         usuario_a: [''],
      });
   }


   ngOnInit(): void {
   }

   getAll() {
      this.output.ready.next(false);
      this.provider.BD_ActionPost('maestros', 'getDetail', {id: this._id}).subscribe(
         data => {
            console.log(data);

            this.data = data;
            this.provider.BD_ActionPost('maestros', 'getListas').subscribe(
               data => {
                  console.log(data);
                  this.sel = this.grup = data;
                  this.sel['nomenclatura'] = this.grup['nomenclatura'] = [
                     { id: 1, name: 'Lic.' },
                     { id: 2, name: 'Ing.' },
                     { id: 3, name: 'Dr.' },
                     { id: 4, name: 'C.P' },
                     { id: 5, name: 'Mtro.' },
                     { id: 6, name: 'Mtra.' },
                     { id: 7, name: 'M.A.' },
                     { id: 8, name: 'Arq.' }
                   ];
                  // this.patchForm(this.data);
                  this._form.patchForm(this.data, this.formulario, this.checkbox)
            this.provider.BD_ActionPost('maestros', 'indexC', { id: this._id }).subscribe(
               data=>{
                  console.log(data)
                  this.dataContactos = data
                  this.provider.BD_ActionPost('maestros', 'indexAC', { id: this._id }).subscribe(
                     data=>{
                        console.log(data)
                        this.dataActividades = data
                        this.provider.BD_ActionPost('maestros', 'indexVA', { id: this._id }).subscribe(
                           data=>{
                              console.log(data)
                              this.dataVacaciones = data;
                              this.output.masterSection.next('Maestros');
                              this.output.detail.next(this.data.rfc);
                              this.output.ready.next(true);
                           })
                     })


               })
               }
               )
         }

      )
   }

   update() {

   }

   patchForm(data: any) {
      this.checkbox.forEach(element => {
          data[element] = data[element] == 1 ? true : false
      });
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
