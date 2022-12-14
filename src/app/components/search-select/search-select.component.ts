import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';


@Component({
   selector: 'search-select',
   templateUrl: './search-select.component.html',
   styleUrls: ['./search-select.component.scss'],
   viewProviders: [
      {
          provide: ControlContainer,
          useExisting: FormGroupDirective
      }
  ]
})
export class SearchSelectComponent implements OnInit, OnChanges, AfterViewInit {
   @Input() select: any;
   @Input() group: any;
   @Input() label: any;
   @Input() formCN: any;
   @Input() rq: any;
   @Output() response: EventEmitter<any> = new EventEmitter();
   _select: any;
   _group: any;
   _label: any;
   _formCN: any;
   _rq: any;
   selectedValue: any;
   constructor(
   ) {  }

   ngOnInit(): void {

   }
   ngOnChanges(changes: SimpleChanges) {
      // console.log(changes);
      this._select = changes['select']?.currentValue != undefined ? changes['select']?.currentValue : this._select;
      this._group = changes['group']?.currentValue != undefined ? changes['group']?.currentValue : this._group;
      this._label = changes['label']?.currentValue != undefined ? changes['label']?.currentValue : this._label;
      this._formCN = changes['formCN']?.currentValue != undefined ? changes['formCN']?.currentValue : this._formCN;
      this._rq = changes['rq']?.currentValue != undefined ? changes['rq']?.currentValue : this.rq;
      // console.log(this._select);
      // console.log(this._group);
      // console.log(this._label);

      // this.getBloquesAlumno(changes['PROGRAMA_ACADEMICO_ID']?.currentValue);
   }

   ngAfterViewInit(){

   }
   search(v: any, arreglo: any) {
      let val = v.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return arreglo.filter((option: any) => option.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(val));
   }

   selected(event: Event){
      this.response.emit(event);
   }

}
