import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordernarIngreso'
})
export class OrdernarIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[], ...args: IngresoEgreso[]) {
    return items.sort((a, b) => {
        if (a.tipo === 'I') {
          return -1;
        } else {
          return 1;
        }
    });
  }

}
