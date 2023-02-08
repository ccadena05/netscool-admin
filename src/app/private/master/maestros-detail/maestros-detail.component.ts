import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JwtAuthService } from 'src/app/services/auth/jwt-auth.service';
import { FormService } from 'src/app/services/form.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
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
      private _form: FormService,
      private ls: LocalStoreService
   ) {
      this._id = this.activatedRoute.snapshot.paramMap.get('id');
      this.getAll();
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
      this.provider.BD_ActionPost('maestros', 'detail', {id: this._id}).subscribe(
         detail => {
            // console.log(detail);
            this.data = detail;
            this.provider.BD_ActionPost('maestros', 'listas').subscribe(
               listas => {
                  // console.log(listas);
                  this.sel = this.grup = listas;
                  this._form.patchForm(this.data, this.formulario, this.checkbox)
                  this.provider.BD_ActionPost('maestros', 'contactos', { id: this._id }).subscribe(
                     contactos => {
                        // console.log(contactos)
                        this.dataContactos = contactos
                        this.provider.BD_ActionPost('maestros', 'actividades', { id: this._id }).subscribe(
                           actividades => {
                              // console.log(actividades)
                              this.dataActividades = actividades
                              this.provider.BD_ActionPost('maestros', 'vacaciones', { id: this._id }).subscribe(
                                 vacaciones => {
                                    // console.log(vacaciones)
                                    this.dataVacaciones = vacaciones;
                                    this.ls.update('bc', [
                                       {
                                          item: 'Maestros',
                                          link: '/m/maestros'
                                       },
                                       {
                                          item: this.data['nombre'].toLowerCase() + ' ' + this.data['apellido_paterno'].toLowerCase() + ' ' + this.data['apellido_materno'].toLowerCase(),
                                          link: null,
                                       }
                                    ])
                                    this.output.ready.next(true);
                                 }
                              )
                           }
                        )
                     }
                  )
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
