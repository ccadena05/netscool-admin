import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
   selector: 'app-snackbar',
   templateUrl: './snackbar.component.html',
   styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
   snack: any;
   constructor(
      @Inject(MAT_SNACK_BAR_DATA) public data: any
   ) {
      this.snack = this.getInfo(data.key, data.msg);

   }

   ngOnInit(): void {
   }

   getInfo(data: any, msg?: any){
      let info = {
         0: {
            icon: 'error',
            color: 'text-red-400',
            text: 'Ha ocurrido un error.',
            class: 'error'
         },
         1: {
            icon: 'info',
            color: 'text-blue-400',
            text: msg,
            class: 'info'
         },
         2: {
            icon: 'done',
            color: 'text-green-400',
            text: 'Proceso ejecutado con éxito',
            class: 'done'
         }
      }
      return info[data as keyof typeof info];
   }

}
