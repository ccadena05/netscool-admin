import { OnChanges, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
   selector: 'app-kardex',
   templateUrl: './kardex.component.html',
   styleUrls: ['./kardex.component.scss']
})
export class KardexComponent implements OnInit, OnChanges {
   dataToDisplay: any = []
   group = 'PERIODO_ANIO_ID';
   @Input() alumnoId: any;
   @Input() PROGRAMA_ACADEMICO_ID: any;
   @Input() id: any;
   _paid: any;
   _id: any;
   constructor(
      private provider: ProviderService
   ) { }

   ngOnInit(): void {
   }
   ngOnChanges(changes: SimpleChanges) {
      if (changes['id']?.currentValue)
         this._id = changes['id']?.currentValue;

      if (changes['PROGRAMA_ACADEMICO_ID']?.currentValue)
         this._paid = changes['PROGRAMA_ACADEMICO_ID']?.currentValue;

      this.getData(this._id, this._paid);
   }

   getData(id: any, paid: any) {
      if(id != undefined && paid != undefined){
         this.provider.BD_ActionPost('alumnos', 'kardexCursadas', { id: id, paid: paid }).subscribe(
            (data: any) => {
               console.log(data);
               this.dataToDisplay = data;
            }
         )
      }
   }

}
