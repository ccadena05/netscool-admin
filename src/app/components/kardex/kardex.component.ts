import { OnChanges, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
   selector: 'app-kardex',
   templateUrl: './kardex.component.html',
   styleUrls: ['./kardex.component.scss']
})
export class KardexComponent implements OnInit, OnChanges {
   dataToDisplay: any = []
   group = 'PERIODO_ANIO';
   @Input() alumnoId: any;
   @Input() PROGRAMA_ACADEMICO_ID: any;
   constructor(
      private provider: ProviderService
   ) { }

   ngOnInit(): void {
   }
   ngOnChanges(changes: SimpleChanges) {
      this.getData();
   }

   getData() {
          this.provider.BD_ActionPost('alumnos', 'kardexCursadas', { id: this.alumnoId, ida: this.PROGRAMA_ACADEMICO_ID }).subscribe({
             next: (data: any) => {
                  console.log(data);
                this.dataToDisplay = data.data;
             }, error: (error: any) => {
                console.log(error);
             }
          })
   }

}
