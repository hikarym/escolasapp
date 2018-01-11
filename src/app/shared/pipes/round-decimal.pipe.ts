import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundDecimal'
})
export class RoundDecimalPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // return Math.round(value * Math.pow(10, numberOfDigitsToRound)) / Math.pow(10, numberOfDigitsToRound);
    // return Math.round(value * Math.pow(10,6)) / Math.pow(10,6);
    return 1;
  }
}
