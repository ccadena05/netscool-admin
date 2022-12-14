import { Component, DoCheck, forwardRef, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { DialogoConfirmacionComponent } from 'src/app/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { SearchSelectComponent } from 'src/app/components/search-select/search-select.component';
import { CambiarContrasenaComponent } from 'src/app/dialogs/cambiar-contrasena/cambiar-contrasena.component';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { OutputService } from 'src/app/services/output.service';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { JwtAuthService } from '../../../services/auth/jwt-auth.service';
import { menu } from '../../menu';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => SearchSelectComponent),
   multi: true
};

@Component({
   selector: 'app-alumnos-detail',
   templateUrl: './alumnos-detail.component.html',
   styleUrls: ['./alumnos-detail.component.scss']
})
export class AlumnosDetailComponent implements OnInit, OnDestroy, DoCheck {
   _id: any;
   _paid: any;
   profileImg: boolean = false;
   data: any;
   usuario_a = this.jwtAuth.getUser();
   alumno: any;
   detailObject: string = '';
   formulario!: FormGroup;
   sel: any = [];
   grup: any = [];
   selObs: Observable<string[]> = {} as Observable<string[]>;
   tbl_municipio_id: Observable<string[]> = {} as Observable<string[]>;
   /* tbl_estado_alumno_id: any = [];
   tbl_estado_id: any = [];
   tbl_generacion_id: any = [];
   tbl_municipio_id: any = [];
   tbl_pais_id: any = [];
   tbl_programa_academico_id: any = [];
   tbl_sangre_id: any = [];
   tbl_sexo_id: any = [];
   tbl_grupo_id: any = []; */
   contactos: any = [];
   tabActive: ElementRef = {} as ElementRef;

   constructor(
      private provider: ProviderService,
      private jwtAuth: JwtAuthService,
      private activatedRoute: ActivatedRoute,
      private formBuilder: FormBuilder,
      private router: Router,
      private dialog: MatDialog,
      private snackbar: MatSnackBar,
      private output: OutputService
   ) {
      router.events.subscribe((val) => {
         if(val instanceof NavigationEnd){
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

   ngOnDestroy(){

   }

   getAll(){
      this.getData();
      /* this.getContactos();
      this.getListas(); */
      this.buildForm();
   }

   getData() {
      this.provider.BD_ActionPost('alumnos', 'alumnosDetail', { id: this._id }).subscribe(/*{
         next: */ (data: any) => {
            // console.log(data);
            this.output.ready.next(false);
            this._paid = data['DETAIL'].PROGRAMA_ACADEMICO_ID;
            this.data = data;
            this.alumno = data['DETAIL'];
            this.output.detail.next(this.alumno.rfc);
            this.patchForm(data['DETAIL']);
            this.provider.BD_ActionPost('alumnos', 'indexC', { id: this._id }).subscribe(
               (data: any) => {
                  this.contactos = data.data;
                  this.provider.BD_ActionPost('alumnos', 'getListas', {}).subscribe(
                     (data: any) => {
                        // console.log(data);
                        if (data['Mensaje'] === '1') {
                           // this.periodoSelect = [];
                        } else {
                           this.sel = this.grup = data;
                           /* this.sel.tbl_estado_alumno_id = data['tbl_estado_alumno_id'];
                           this.sel.tbl_estado_id = data['tbl_estado_id'];
                           this.sel.tbl_generacion_id = data['tbl_generacion_id'];
                           this.sel.tbl_municipio_id = data['tbl_municipio_id'];
                           this.sel.tbl_pais_id = data['tbl_pais_id'];
                           this.sel.tbl_programa_academico_id = data['tbl_programa_academico_id'];
                           this.sel.tbl_sangre_id = data['tbl_sangre_id'];
                           this.sel.tbl_sexo_id = data['tbl_sexo_id'];
                           this.sel.tbl_grupo_id = data['tbl_grupo_id']; */
                           this.output.ready.next(true);

                        }
                     });
               })
         }
      )
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
         usuario_a: [this.usuario_a],
         tbl_grupo_id: ['']
      });
   }

   patchForm(data: any) {
      this.formulario.patchValue({
         nombre: data?.nombre,
         apellido_paterno: data?.apellido_paterno,
         apellido_materno: data?.apellido_materno,
         beca: data?.beca,
         inscripcion: data?.inscripcion,
         email: data?.email,
         rfc: data?.rfc,
         codigo_postal: data?.codigo_postal,
         direccion: data?.direccion,
         telefono: data?.telefono,
         celular: data?.celular,
         fecha_nacimiento: data?.fecha_nacimiento,
         indicaciones_medicas: data?.indicaciones_medicas,
         documento_acta_nacimiento: this.verifyCheck(data?.documento_acta_nacimiento),
         documento_certificado: this.verifyCheck(data?.documento_certificado),
         documento_curp: this.verifyCheck(data?.documento_curp),
         tbl_programa_academico_id:/*  { id: */ data?.tbl_programa_academico_id/* , name: data.PROGRAMA_ACADEMICO } */,
         // tbl_programa_academico_id: /* { id: data.tbl_programa_academico_id, name: */ data.tbl_programa_academico_id /* } */,
         tbl_grupo_id:/*  { id: */ data?.tbl_grupo_id/* , name: data.GRUPO } */,
         tbl_generacion_id:/*  { id: */ data?.tbl_generacion_id/* , name: data.GENERACION } */,
         tbl_estado_alumno_id:/*  { id: */ data?.tbl_estado_alumno_id/* , name: data.ESATDO_ALUMNO } */,
         tbl_pais_id:/*  { id: */ data?.tbl_pais_id/* , name: data.PAIS } */,
         tbl_estado_id:/*  { id: */ data?.tbl_estado_id/* , name: data.ESTADO } */,
         tbl_municipio_id:/*  { id: */ data?.tbl_municipio_id/* , name: data.MUNICIPIO } */,
         tbl_sexo_id:/*  { id: */ data?.tbl_sexo_id/* , name: data.SEXO } */,
         tbl_sangre_id:/*  { id: */ data?.tbl_sangre_id/* , name: data.SANGRE } */,
      });
   }

   verifyCheck($data: any) {
      if ($data === 0) {
         return false;
      } else {
         return true;
      }
   }

   update() {
      this.formulario.value.id = this._id;
      this.formulario.value.user_id = this.alumno.user_id;
      const Parametros = this.formulario.value;
      console.log(Parametros);
      let confirm = this.dialog.open(DialogoConfirmacionComponent)

      confirm.afterClosed().subscribe({
         next: (data: any) => {
            console.log(data);
            if(data === true){
               this.provider.BD_ActionPost('alumnos', 'update', Parametros).subscribe({
                  next: (data: any) => {
                     console.log(data);
                     if (data['Mensaje'] === 0) {
                        this.getAll();
                        this.snackbar.open('Tus cambios se han guardado exitosamente.', 'Cerrar', { duration: 3000 })
                     }
                  },
                  error: (error: any) => {
                     console.log(error);
                  }
               });
            }

         }

      })
      /*  */
   }

   cambiarContrasenaDialog(){
      let dialog = this.dialog.open(CambiarContrasenaComponent, {
         autoFocus: false,
         data: {
            id: this._id,
            nombre: this.data?.DETAIL?.NOMBRE_COMPLETO
         }
      })
   }

   recibiRespuesta(respuesta: any, control: any) {
      console.log(respuesta);
      this.formulario.controls[control].setValue(respuesta)
     }

}
