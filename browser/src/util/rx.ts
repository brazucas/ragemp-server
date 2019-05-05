import {multicast, refCount} from 'rxjs/operators';
import {Observable, ReplaySubject} from 'rxjs';

/**
 * Compartilha um observable como `share()`, mas repetindo seu último valor
 * caso o observable já esteja assinado.
 *
 * Caso todas as assinaturas sejam canceladas, o observable também deixa de ser
 * assinado, e o valor em cache é descartado.
 */
export function shareLast<T>() {
  // Solução baseada nas observações de:
  // https://github.com/ReactiveX/rxjs/issues/3336#issuecomment-391026380
  return (observable: Observable<T>) => observable.pipe(
    multicast(() => new ReplaySubject<T>(1)),
    refCount(),
  );
}
