import { Component, OnInit, Self } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { JwtAuthService } from 'src/app/services/auth/jwt-auth.service';
import { FormService } from 'src/app/services/form.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { OutputService } from 'src/app/services/output.service';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
   selector: 'app-periodo',
   templateUrl: './periodo.component.html',
   styleUrls: ['./periodo.component.scss']
})
export class PeriodoComponent implements OnInit {
   _id: any;
   _pid: any;

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
      private ls: LocalStoreService,
   ) {
      this._id = this.activatedRoute.snapshot.paramMap.get('id');
      this._pid = this.activatedRoute.snapshot.paramMap.get('id2');
      this.getData();
   }

   ngOnInit(): void {
   }

   getData() {
      this.provider.BD_ActionPost('horarios', 'carga_inicial', {id: this._id}).subscribe(
         (data: any) => {
            console.log(data);
            this.ls.update('bc', [
               {
                  item: 'Horarios',
                  link: '/m/horarios'
               },
               {
                  item: data['PROGRAMA_ACADEMICO'],
                  link: '/m/horarios/detail/' + this._id
               },
               {
                  item: data?.['PERIODO'],
                  link: null/* '/m/horarios/detail/' + this._id + '/periodo/' + this._pid */
            }])
            this.output.ready.next(true)
         }
      )
   }

}
