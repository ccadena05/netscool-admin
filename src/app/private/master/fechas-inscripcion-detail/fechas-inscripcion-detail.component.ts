import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JwtAuthService } from 'src/app/services/auth/jwt-auth.service';
import { FormService } from 'src/app/services/form.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { OutputService } from 'src/app/services/output.service';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/es';
import { SearchSelectComponent } from 'src/app/components/search-select/search-select.component';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => SearchSelectComponent),
   multi: true
};

export const MY_FORMATS = {
   parse: {
     dateInput: 'LLL',
   },
   display: {
     dateInput: 'LLL',
     monthYearLabel: 'MMMM YYYY',
     dateA11yLabel: 'LLL',
     monthYearA11yLabel: 'MMM YYYY',
   },
 };

@Component({
   selector: 'app-fechas-inscripcion-detail',
   templateUrl: './fechas-inscripcion-detail.component.html',
   styleUrls: ['./fechas-inscripcion-detail.component.scss'],
   providers: [
      {
         provide: MAT_DATE_LOCALE, useValue: 'es-ES'
      },
      {
         provide: DateAdapter,
         useClass: MomentDateAdapter,
         deps: [ MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS ],
       },

       {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
   ]
})
export class FechasInscripcionDetailComponent implements OnInit {
   _id: any;
   formulario!: FormGroup;
   sel: any;
   grup: any;

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
      this.getData();
   }

   ngOnInit(): void {
   }

   getData() {
      this.output.ready.next(false)
      this.buildForm();
      this.provider.BD_ActionPost('fecha_inscripcion', 'detail', { id: this._id }).subscribe(
         (detail: any) => {
            console.log(detail)
            this._form.patchForm(detail, this.formulario)
            this.provider.BD_ActionPost('fecha_inscripcion', 'periodo', { id: detail['tbl_periodo_id'] }).subscribe(
               (periodo: any) => {
                  this.sel = this.grup = periodo
                  console.log(periodo);
                  this.ls.update('bc', [
                     {
                        item: 'Fechas de inscripciones',
                        link: '/m/fecha_inscripcion'
                     },
                     {
                        item: detail?.descripcion,
                        link: null
                     }
                  ])
                  this.output.ready.next(true)
               }
            )
         }
      )
   }

   buildForm() {
      this.formulario = this.formBuilder.group({
         id: [''],
         fecha_inicio: [''],
         fecha_final: [''],
         tbl_periodo_id: ['']
      })
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

   update(){

   }
}
