import {  Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { OutputService } from 'src/app/services/output.service';
import { menu } from 'src/app/private/menu';

@Component({
   selector: 'app-master',
   templateUrl: './master.component.html',
   styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit, OnDestroy {
   modulo: any;
   dataToDisplay: any;
   ready: boolean = false;
   readyT: boolean = false;
   masterSection: any;
   r1= Math.floor(Math.random() * (12 - 4) + 4)
   r2= Math.floor(Math.random() * (8 - 2) + 2)
     sideMenu = menu;
   // r3= 'w-[' + Math.floor(Math.random() * (16 - 4) + 4).toString() + 'px]'

   constructor(
      private provider: ProviderService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private output: OutputService,
   ) {
      router.events.subscribe((event: any) => {
         if (event instanceof NavigationEnd) {

            this.modulo = this.activatedRoute.snapshot.paramMap.get('modulo');
            
            this.output.masterSection.next(this.findInMenu('link', '/m/' + this.modulo))
            /* menu.forEach(element => {
               element.menu.forEach(el => {
                  if('/m/' + this.modulo == el.link) {
                     this.masterSection = el.item;
                     this.output.masterSection.next(this.masterSection);
                  }
               });
            }); */
            this.getData();
         }
      })
   }

   ngOnInit(): void {
      /* this.output.detail.next(null);
      menu.forEach(element => {
         element.menu.forEach(el => {
            if('/m/' + this.modulo == el.link) {
               this.masterSection = el.item;
               this.output.masterSection.next(this.masterSection);
            }
         });
      }); */
   }

   ngOnDestroy(): void {

   }

   getData() {
      this.ready = false;
      this.dataToDisplay = {}
      this.provider.BD_ActionPost(this.modulo, 'index').subscribe({
         next: (data: any) => {
            data.forEach((el: any) => {
               el.link_id = this.modulo;
            });
            this.dataToDisplay = data;
            console.log(data);
            this.output.dataData.next(data);
            this.ready = true;
            this.output.detail.next('')
            this.output.ready.next(true);
         }, error: (error: any) => {
            console.log(error);
         }
      })
   }

   findInMenu(propiedad: any, valor: any){
      let turnBack = {}
      this.sideMenu.forEach(element => {
         element.menu.filter((el: any, index: any) =>{
            console.log(el[propiedad]);
            
            if(el[propiedad] === valor)
            turnBack = el.item;
         })
      });
      return turnBack
   }

}
