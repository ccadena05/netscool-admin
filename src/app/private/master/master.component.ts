import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, Event, NavigationStart } from '@angular/router';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { OutputService } from 'src/app/services/output.service';
import { menu } from 'src/app/private/menu';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { filter } from 'rxjs';

@Component({
   selector: 'app-master',
   templateUrl: './master.component.html',
   styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
   modulo: any;
   dataToDisplay: any;
   masterSection: any;
   r1 = Math.floor(Math.random() * (12 - 4) + 4)
   r2 = Math.floor(Math.random() * (8 - 2) + 2)
   sideMenu = menu;
   // r3= 'w-[' + Math.floor(Math.random() * (16 - 4) + 4).toString() + 'px]'

   constructor(
      private provider: ProviderService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private output: OutputService,
      private ls: LocalStoreService
   ) {
      router.events.pipe(
         filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
      ).subscribe((e: RouterEvent) => {
         if (e instanceof NavigationEnd) {
            this.modulo = this.activatedRoute.snapshot.paramMap.get('modulo');
            this.masterSection = this.findInMenu('link', '/m/' + this.modulo)
            this.getData();
         }

      });
    }

   ngOnInit(): void {
      
   }

   getData() {
      this.output.ready.next(false);
      this.dataToDisplay = []
      this.provider.BD_ActionPost(this.modulo, 'index').subscribe(
          (data: any) => {
            data.forEach((el: any) => {
               el.link_id = this.modulo;
            });
            this.dataToDisplay = data;
            // console.log(data);
            this.breadcrumbs()
            this.output.ready.next(true);
         }
      )
   }

   findInMenu(propiedad: any, valor: any) {
      let turnBack = {}
      this.sideMenu.forEach(element => {
         element.menu.filter((el: any, index: any) => {
            if (el[propiedad] === valor)
               turnBack = el.item;
         })
      });
      return turnBack
   }

   breadcrumbs() {
      this.ls.update('bc', [
         {
            item: this.masterSection,
            link: null/* '/m/' + this.modulo */
         }
      ])
   }

}
