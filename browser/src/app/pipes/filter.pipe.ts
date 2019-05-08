import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(lista: string[], pesquisa: string): any {
    return lista.filter((item) => (item.toLowerCase().indexOf((pesquisa ? pesquisa : '').toLowerCase())) !== -1);
  }

}
