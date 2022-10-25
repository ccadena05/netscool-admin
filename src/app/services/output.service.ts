import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutputService {
   dataData = new Subject<any>();
   detailObject = new Subject<any>();
   modulo = new Subject<any>();

  constructor() { }
}
