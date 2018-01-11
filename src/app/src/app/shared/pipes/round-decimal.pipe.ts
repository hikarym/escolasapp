import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundDecimal'
})
export class RoundDecimalPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
