import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'margincolor'
})
export class MarginColorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // TODO mudar a cor conforme regra da margem mínima
    return value;
  }

}
