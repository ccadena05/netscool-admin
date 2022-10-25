import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { OutputService } from 'src/app/services/output.service';
import { menu } from '../menu';
@Component({
   selector: 'app-egresados',
   templateUrl: './egresados.component.html',
   styleUrls: ['./egresados.component.scss']
})
export class EgresadosComponent implements OnInit {
   modulo: any;
   dataToDisplay: any;
   ready: boolean = false;
   seccion: any;

   constructor(
      private provider: ProviderService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private output: OutputService,
   ) {
      router.events.subscribe((event: any) => {
         if (event instanceof NavigationEnd) {

            this.modulo = this.activatedRoute.snapshot.paramMap.get('modulo');
            menu.forEach(element => {
               element.menu.forEach(el => {
                  if('/m/' + this.modulo == el.link) {
                     this.seccion = el.item;
                  }
               });
            });
            this.getData();
         }
      })
   }

   ngOnInit(): void {
   }

   getData() {
      this.ready = false;
      this.provider.BD_ActionPost(this.modulo, 'index').subscribe({
         next: (data: any) => {
            console.log(data);

            this.dataToDisplay = data.data;
            this.sendData(data);
            this.ready = true;
         }, error: (error: any) => {
            console.log(error);
         }
      })
   }
   sendData(data: any) {
      this.output.dataData.next(data);
   }

}
