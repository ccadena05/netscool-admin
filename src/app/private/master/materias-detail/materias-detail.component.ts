import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JwtAuthService } from 'src/app/services/auth/jwt-auth.service';
import { FormService } from 'src/app/services/form.service';
import { OutputService } from 'src/app/services/output.service';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
   selector: 'app-materias-detail',
   templateUrl: './materias-detail.component.html',
   styleUrls: ['./materias-detail.component.scss']
})
export class MateriasDetailComponent implements OnInit, OnDestroy {
   _id: any;
   formulario!: FormGroup;
   data: any = [];
   sel: any = [];
   grup: any = [];
   checkbox = ['optativa']


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
         id: ['', Validators.required],
         codigo: ['', Validators.required],
         nombre: ['', Validators.required],
         bloque: ['', Validators.required],
         horas_teoricas: ['', Validators.required],
         horas_practicas: ['', Validators.required],
         creditos: ['', Validators.required],
         tbl_materias_id: [''],
         tbl_programa_academico_id: ['', Validators.required],
         tbl_departamento_id: [[]],
         optativa: [false, Validators.required],
       });
   }

      ngOnInit(): void {
      }

      ngOnDestroy(): void {
          this.output.detail.unsubscribe()
      }

      getAll() {
         this.provider.BD_ActionPost('materias', 'getDetail', {id: this._id}).subscribe(
            data => {
               this.data = data
               this.provider.BD_ActionPost('materias', 'getListas', {id: this.data['tbl_programa_academico_id']}).subscribe(
                  data => {
                     console.log(data);

                     this.sel = this.grup = data;
                     // this.patchForm(this.data);
                  this._form.patchForm(this.data, this.formulario, this.checkbox)
                     this.output.masterSection.next('Materias');
                     this.output.detail.next(this.data['nombre']);
                  }
               )
               console.log(data);

            }
         )
         this.output.ready.next(true)
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
