import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToRomanSymbol'
})
export class NumberToRomanSymbolPipe implements PipeTransform {

transform(value: any): any {
if (isNaN(value)) {
return NaN;
}
let digits = String(+value).split(''),
key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
'', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
'', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
roman = '',
i = 3;
while (i--) {
roman = (key[+digits.pop()! + (i * 10)] || '') + roman;
}
return Array(+digits.join('') + 1).join('M') + roman;
}

}

