import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-waiter',
   templateUrl: './waiter.component.html',
   styleUrls: ['./waiter.component.scss']
})
export class WaiterComponent implements OnInit {
   aspectArray: any = [];

   constructor() { }

   ngOnInit(): void {
      this.randomInteger(1, 4);
   }

   randomInteger(min: any, max: any) {
      for(let i = 0; i < 32; i++){
         this.aspectArray.push('aspect-[' + (Math.floor(Math.random() * (max - min + 1)) + min) + '/' + (Math.floor(Math.random() * (max - min + 1)) + min) + ']')
      }
   }

}
