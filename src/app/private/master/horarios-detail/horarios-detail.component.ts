import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JwtAuthService } from 'src/app/services/auth/jwt-auth.service';
import { FormService } from 'src/app/services/form.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { OutputService } from 'src/app/services/output.service';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
  selector: 'app-horarios-detail',
  templateUrl: './horarios-detail.component.html',
  styleUrls: ['./horarios-detail.component.scss']
})
export class HorariosDetailComponent implements OnInit {
   _id: any;
   data: any;

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
         this.getData();
      }
  });
  }

  ngOnInit(): void {
  }

  getData(){
     this.provider.BD_ActionPost('horarios', 'index_periodo', {id: this._id}).subscribe(
        (data: any) => {
            this.data = data;
            // console.log(data);

            this.data.forEach((element: any) => {
               element.link_id = 'horarios';
               element.id = this._id + '/periodo/' + element.id;
            });
            this.ls.update('bc', {
               m1: {
                  item: 'Horarios',
                  link: '/m/horarios'
               },
               d1: {
                  item: data[0]['01_PROGRAMA_ACADEMICO'],
                  link: '/m/horarios/detail/' + this._id
               },
               m2: {
                  item: 'Periodo',
                  link: '/m/horarios/detail/' + this._id
               },
               d2: null
            })
            this.output.ready.next(true)
        }
     )
  }

}
