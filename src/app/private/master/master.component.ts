import {  AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { OutputService } from 'src/app/services/output.service';
import { menu } from 'src/app/private/menu';
import { LocalStoreService } from 'src/app/services/local-store.service';

@Component({
   selector: 'app-master',
   templateUrl: './master.component.html',
   styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit, OnDestroy, AfterContentInit {
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
      private ls: LocalStoreService
   ) {
      router.events.subscribe((event: any) => {
         if (event instanceof NavigationEnd) {
            this.modulo = this.activatedRoute.snapshot.paramMap.get('modulo');
            this.masterSection = this.findInMenu('link', '/m/' + this.modulo)
            // this.output.masterSection.next(this.masterSection)
            this.breadcrumbs()
            this.getData();


         }

         // this.ls.setItem('bc', {m1: this.masterSection, d1: null, m2: null, d2: null})

      })
   }

   ngOnInit(): void {

   }
   ngAfterContentInit(){
      this.breadcrumbs()
      if(this.ls.getItem('bc').d1.item != null) {
         let bc = this.ls.getItem('bc');
         bc.d1.item = null
         this.ls.setItem('bc', bc)
      }
   }

   ngOnDestroy(): void {

   }

   getData() {
      this.ready = false;
      this.dataToDisplay = []
      this.provider.BD_ActionPost(this.modulo, 'index').subscribe({
         next: (data: any) => {
            data.forEach((el: any) => {
               el.link_id = this.modulo;
            });
            this.dataToDisplay = data;
            // console.log(data);
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
            if(el[propiedad] === valor)
            turnBack = el.item;
         })
      });
      return turnBack
   }

   breadcrumbs(){
      this.ls.remove('bc')
      this.ls.update('bc', {
         m1: {
            item: this.masterSection,
            link: '/m/' + this.modulo
         },
         d1: {
            item: null,
            link: null
         }/* ,
         m2: {
            item: null,
            link: null
         },
         d2: {
            item: null,
            link: null
         } */
      })
   }

}
