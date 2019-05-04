import { Injectable } from '@angular/core';
import { AutenticacaoResultado, DadosLogin } from '../../interfaces/login.interface';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs/internal/types';

declare let mp: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginObserver: Observer<AutenticacaoResultado>;

  constructor() {
    if (!window) {
      (window as any) = {};
    }

    (window as any).my = window || {};
    (window as any).login = (window as any).ragemp || {};
    (window as any).login.autenticacaoResultado = this.autenticacaoResultado.bind(this);
  }

  public login(dados: DadosLogin): Observable<AutenticacaoResultado> {
    return new Observable((observer) => {
      this.loginObserver = observer;

      if (typeof mp !== 'undefined') {
        mp.trigger('AutenticarJogador', dados);
      } else {
        observer.next({
          autenticado: true,
        });
        observer.complete();
      }
    });
  }

  public autenticacaoResultado(autenticado: boolean, credenciaisInvalidas: boolean) {
    if (autenticado) {
      this.loginObserver.next({autenticado: autenticado});
      this.loginObserver.complete();
    } else {
      this.loginObserver.error({autenticado: false, credenciaisInvalidas: credenciaisInvalidas});
    }
  }
}
