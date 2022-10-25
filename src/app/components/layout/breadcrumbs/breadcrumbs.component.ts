import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { menu } from 'src/app/private/menu';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { OutputService } from 'src/app/services/output.service';
import { RoutePartsService } from 'src/app/services/route-parts.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  @Input() breadcrumb!: string;

  /* routeParts: any[];
  routerEventSub: Subscription; */
  sideMenu = menu;
  objeto: any = '';
  modulo: any = '';
  // public isEnabled: boolean = true;
  constructor(
    public router: Router,
    private routePartsService: RoutePartsService,
    private activatedRoute: ActivatedRoute,
    private local: LocalStoreService,
    private output: OutputService
    ) {
      router.events.subscribe((event: any) => {
         if (event instanceof NavigationEnd) {       
            this.modulo = this.findInMenu('link', '/m/' + this.router.url.split('/')[2]);
            this.output.detailObject.subscribe((data: any) => { this.objeto = data })
            this.output.modulo.subscribe((data: any) => { this.modulo = data })
         }
      })


    /* this.routeParts = this.routePartsService.generateRouteParts(this.activatedRoute.snapshot);
    // console.log("Snaaapppp");
    // console.log(this.activatedRoute.snapshot);
    // console.log("Finn     Snaaapppp");
    this.routerEventSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((routeChange) => {
        this.routeParts = this.routePartsService.generateRouteParts(this.activatedRoute.snapshot);
        // console.log(this.activatedRoute.snapshot);
        // generate url from parts
        this.routeParts.reverse().map((item, i) => {
          item.breadcrumb = this.parseText(item);
          item.urlSegments.forEach((urlSegment:any, j:number) => {
            if (j === 0) {
              return (item.url = `${urlSegment.path}`);
            }
            item.url += `/${urlSegment.path}`;
            return (item.url );
          });
          if (i === 0) {
            return item;
          }
          // prepend previous part to current part
          item.url = `${this.routeParts[i - 1].url}/${item.url}`;
          return item;
        });
      });
      this.dataData = this.output.dataData.subscribe($event => {

      }) */
  }

  ngOnInit() {}
  ngOnDestroy() {
    /* if (this.routerEventSub) {
      this.routerEventSub.unsubscribe();
    } */

  }

  /* parseText(part:any) {
    if (!part.breadcrumb) {
      return '';
    }
    part.breadcrumb = part.breadcrumb.replace(/{{([^{}]*)}}/g, (a:any, b:any) => {
      const r = part.params[b];
      return typeof r === 'string' ? r : a;
    });
    return part.breadcrumb;
  }

  applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataData.filter = filterValue.trim().toLowerCase();
   console.log(this.dataData);

 } */
   
   findInMenu(propiedad: any, valor: any){
      let turnBack = {}
      this.sideMenu.forEach(element => {
         element.menu.filter((el: any, index: any) =>{
            if(el[propiedad] === valor)
            turnBack = el;
         })
      });
      return turnBack
   }
}
