import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { menu } from "src/app/private/menu";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay, filter } from 'rxjs/operators';

@Component({
   selector: 'app-sidebar',
   templateUrl: './sidebar.component.html',
   styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

   sideMenu = menu;

   /* @Output() location = new EventEmitter<string>(); */

   constructor(
      private observer: BreakpointObserver,
      private router: Router,) { }

   ngOnInit(): void {

   }

   /* sendBreadcrumbs(label: any){
      this.location.emit(label);
   } */

}
