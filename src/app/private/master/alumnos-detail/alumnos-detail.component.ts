import { Component, DoCheck, forwardRef, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, map, startWith, Subscription } from 'rxjs';
import { DialogoConfirmacionComponent } from 'src/app/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { SearchSelectComponent } from 'src/app/components/search-select/search-select.component';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { CambiarContrasenaComponent } from 'src/app/dialogs/cambiar-contrasena/cambiar-contrasena.component';
import { FormService } from 'src/app/services/form.service';
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

export const status = {
   'ACTIVO': 'bg-gradient-lime',
   'BAJA': 'bg-gradient-red',
   'BAJA POR FALTA DE PAGO': 'bg-gradient-orange',
   'EGRESADO =)': 'bg-gradient-celestial',
   'TITULADO': 'bg-gradient-teal',
   'BAJA TEMPORAL': 'bg-gradient-yellow',
   'EGRESADO SIN TERMINAR': 'bg-gradient-purplelake'
}

@Component({
   selector: 'app-alumnos-detail',
   templateUrl: './alumnos-detail.component.html',
   styleUrls: ['./alumnos-detail.component.scss']
})
export class AlumnosDetailComponent implements OnInit, DoCheck, OnDestroy {
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
   contactos: any = [];
   tabActive: ElementRef = {} as ElementRef;
   statusColor: any = '';
   checkbox = ['documento_acta_nacimiento', 'documento_certificado', 'documento_curp']

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
      router.events.subscribe((val) => {
         if(val instanceof NavigationEnd){
            this._id = this.activatedRoute.snapshot.paramMap.get('id');
         }
     });
   }

   ngOnInit(): void {
      this.getData();
   }

   ngDoCheck(){
      document.querySelector('[vertical] .border-r-3')?.classList.remove("border-r-3","[border-image:linear-gradient(0deg,#6C2BD9,#E74694)1]");
      document.querySelector('[vertical] .mat-tab-label-active')?.classList.add("border-r-3","[border-image:linear-gradient(0deg,#6C2BD9,#E74694)1]");
   }
   ngOnDestroy(): void {
       this.ls.remove('bc')
       this.ls.setItem('bc', null)
   }

   getData() {
      this.provider.BD_ActionPost('alumnos', 'alumnosDetail', { id: this._id }).subscribe(/*{
         next: */ (data: any) => {
             console.log(data);
            this.output.ready.next(false);
            this.buildForm();
            this._paid = data['DETAIL'].PROGRAMA_ACADEMICO_ID;
            this.data = data;
            this.alumno = data['DETAIL'];
            this.patchForm(data['DETAIL']);
            this.provider.BD_ActionPost('alumnos', 'indexC', { id: this._id }).subscribe(
               (data: any) => {
                  this.contactos = data;
                  this.provider.BD_ActionPost('alumnos', 'getListas', {}).subscribe(
                     (data: any) => {
                        // console.log(data);
                        if (data['Mensaje'] === '1') {
                           // this.periodoSelect = [];
                        } else {
                           this.sel = this.grup = data;

                           this.statusColor = status[this.data['DETAIL']['ESTADO_ALUMNO'] as keyof typeof status]
                           this.ls.update('bc', {
                              m1: {
                                 item: 'Alumnos',
                                 link: '/m/alumnos'
                              },
                              d1: {
                                 item: this.alumno.rfc,
                                 link: null
                              },
                              m2: {
                                 item: null,
                                 link: null
                              },
                              d2: {
                                 item: null,
                                 link: null
                           }})
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
      this.checkbox.forEach(element => {
         data[element] = data[element] == 1 ? true : false
     });
     Object.keys(this.formulario?.controls).forEach(element => {
        this.formulario.patchValue({
           [element]: data[element]
        })
     });
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
                        this.getData();
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
