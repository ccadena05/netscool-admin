import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lowerDash'
})
export class LowerDashPipe implements PipeTransform {

  transform(value: string): string {
   var str = value.replace(/\s+/g, '-');
   str = str.normalize("NFD");
   str = str.replace(/\p{Diacritic}/gu, "");
   str = str.toLowerCase();
   return str
  }

}
