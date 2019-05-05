import { catchError, map } from 'rxjs/operators';
import {concat, defer, Observable, of} from 'rxjs';

export const ERRO_DESCONHECIDO = new Error('?');

export interface IncluindoStatus<T> {
  carregando: boolean;
  resultado?: T;
  erro?: any;
}

export function incluirStatus<T>(inicial?: T, absorverErros = true) {
  return (obs: Observable<T>): Observable<IncluindoStatus<T>> => {
    let ultimo: any = inicial;

    let incluindoStatus = concat<IncluindoStatus<T>>(
      of({carregando: true, resultado: inicial}),
      obs.pipe(
        map(resultado => {
          ultimo = resultado;
          return {carregando: true, resultado};
        }),
      ),
      defer(() => of({carregando: false, resultado: ultimo})),
    );

    if (!absorverErros) {
      return incluindoStatus;
    }

    return incluindoStatus.pipe(
      catchError(erro => of<IncluindoStatus<T>>({
        carregando: false,
        erro: erro === undefined ? ERRO_DESCONHECIDO : erro,
      })),
    );
  };
}
