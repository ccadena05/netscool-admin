import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutputService {
   dataData = new Subject<any>();
   
  constructor() { }
}
