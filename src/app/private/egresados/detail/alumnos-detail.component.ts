import { Component, DoCheck, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DialogoConfirmacionComponent } from 'src/app/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { OutputService } from 'src/app/services/output.service';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { JwtAuthService } from '../../../services/auth/jwt-auth.service';
import { menu } from '../../menu';

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
   UpdateAlumno!: FormGroup;
   tbl_estado_alumno_id: any = [];
   tbl_estado_id: any = [];
   tbl_generacion_id: any = [];
   tbl_municipio_id: any = [];
   tbl_pais_id: any = [];
   tbl_programa_academico_id: any = [];
   tbl_sangre_id: any = [];
   tbl_sexo_id: any = [];
   tbl_grupo_id: any = [];
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
      // this.output.detailObject.next(null);
      // this.output.detailObject.unsubscribe()
   }

   getAll(){
      this.getData();
      this.getContactos();
      this.getListas();
      this.buildForm();
   }

   getData() {
      this.provider.BD_ActionPost('alumnos', 'alumnosDetail', { id: this._id }).subscribe({
         next: (data: any) => {
            //console.log(data);
            this._paid = data['DETAIL'].PROGRAMA_ACADEMICO_ID;
            this.data = data;
            this.alumno = data['DETAIL'];
            this.output.detailObject.next(this.alumno.rfc);
            this.patchForm(data['DETAIL']);
         }, error: (error: any) => {
            console.log(error);
         }
      })
   }
   getContactos() {
      this.provider.BD_ActionPost('alumnos', 'indexC&id=' + this._id, { id: this._id }).subscribe({
         next: (data: any) => {
            // console.log(data);
            this.contactos = data.data;
         }, error: (error: any) => {
            console.log(error);
         }
      })
   }
   getListas() {
      this.provider.BD_ActionPost('alumnos', 'getListas', {}).subscribe({
         next: (data: any) => {
            // console.log(data);
            if (data['Mensaje'] === '1') {
               // this.periodoSelect = [];
            } else {
               this.tbl_estado_alumno_id = data['tbl_estado_alumno_id'];
               this.tbl_estado_id = data['tbl_estado_id'];
               this.tbl_generacion_id = data['tbl_generacion_id'];
               this.tbl_municipio_id = data['tbl_municipio_id'];
               this.tbl_pais_id = data['tbl_pais_id'];
               this.tbl_programa_academico_id = data['tbl_programa_academico_id'];
               this.tbl_sangre_id = data['tbl_sangre_id'];
               this.tbl_sexo_id = data['tbl_sexo_id'];
               this.tbl_grupo_id = data['tbl_grupo_id'];
            }
         },
         error: (error: any) => {
            console.log(JSON.stringify(error));
         }
      });
   }
   buildForm() {
      this.UpdateAlumno = this.formBuilder.group({
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
      this.UpdateAlumno.patchValue({
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
      this.UpdateAlumno.value.id = this._id;
      this.UpdateAlumno.value.user_id = this.alumno.user_id;
      const Parametros = this.UpdateAlumno.value;
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

}
