import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { OutputService } from 'src/app/services/output.service';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
   selector: 'app-contactos-detail',
   templateUrl: './contactos-detail.component.html',
   styleUrls: ['./contactos-detail.component.scss']
})
export class ContactosDetailComponent implements OnInit {
   formulario!: FormGroup;
   _id: any;
   data: any = [];
   sel: any = [];
   grup: any = [];
   dataToDisplay: any = [];

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
   }

   ngOnInit(): void {
   }

   update() {

   }

   getAll() {
      this.getData();
      this.buildForm();
   }

   getData() {
      this.output.ready.next(false);

      this.provider.BD_ActionPost('contactos', 'detail', { id: this._id }).subscribe(
         detail => {
            this.data = detail
            this.patchForm(detail);
            this.provider.BD_ActionPost('contactos', 'listas').subscribe(
               listas => {
                  this.sel = this.grup = listas;
                  this.provider.BD_ActionPost('contactos', 'alumnos', {id: this._id}).subscribe(
                     alumnos => {
                        this.dataToDisplay = alumnos;
                        console.log(alumnos);
                        
                        this.ls.update('bc', [
                           {
                              item: 'Contactos',
                              link: '/m/contactos'
                           },
                           {
                              item: this.data['nombre'].toLowerCase() + ' ' + this.data['apellido_paterno'].toLowerCase() + ' ' + this.data['apellido_materno'].toLowerCase(),
                              link: null
                           }
                        ])
                     }
                  )
               },
            )
            
            this.output.ready.next(true);

         }
      )
   }

   buildForm() {
      this.formulario = this.formBuilder.group({
         id: [''],
         nombre: ['', Validators.required],
         apellido_paterno: ['', Validators.required],
         apellido_materno: [''],
         telefono: ['', Validators.required],
         celular: ['', Validators.required],
         email: ['', [Validators.required, Validators.email]],
         ocupacion: ['', Validators.required],
         tbl_sexo_id: ['', Validators.required],
         user_id: [''],
      });

   }

   patchForm(data: any) {
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