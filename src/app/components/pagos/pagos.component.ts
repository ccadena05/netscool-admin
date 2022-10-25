import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
   selector: 'app-pagos',
   templateUrl: './pagos.component.html',
   styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit, OnChanges {
   dataToDisplay: any = [];
   @Input() alumnoId: any;
   @Input() PROGRAMA_ACADEMICO_ID: any;
   constructor(
      private provider: ProviderService
   ) { }

   ngOnInit(): void {
   }
   ngOnChanges(changes: SimpleChanges) {
      this.getData(changes['alumnoId']?.currentValue);
   }

   getData(id: any) {
      this.provider.BD_ActionPost('alumnos', 'historialPagos', { id: id }).subscribe({
         next: (data: any) => {
            this.dataToDisplay = data.data;
         }, error: (error: any) => {
            console.log(error);
         }
      })
   }

}
