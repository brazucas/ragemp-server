import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs/internal/types';
import { AutenticacaoResultado, DadosLogin, DadosRegistro, RegistroResultado } from '../../interfaces/login.interface';

declare let mp: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginObserver: Observer<AutenticacaoResultado>;
  public registroObserver: Observer<RegistroResultado>;

  constructor() {
    if (!window) {
      (window as any) = {};
    }

    (window as any).my = window || {};
    (window as any).login = (window as any).ragemp || {};
    (window as any).login.autenticacaoResultado = this.autenticacaoResultado.bind(this);
    (window as any).login.registroResultado = this.registroResultado.bind(this);
  }

  public login(dados: DadosLogin): Observable<AutenticacaoResultado> {
    return new Observable((observer) => {
      this.loginObserver = observer;

      if (typeof mp !== 'undefined') {
        mp.trigger('AutenticarJogador', JSON.stringify(dados));
      } else {
        observer.next({
          autenticado: true,
        });
        observer.complete();
      }
    });
  }

  public registrar(dados: DadosRegistro): Observable<RegistroResultado> {
    return new Observable((observer) => {
      this.registroObserver = observer;

      if (typeof mp !== 'undefined') {
        mp.trigger('RegistrarJogador', JSON.stringify(dados));
      } else {
        observer.next({
          erro: true,
          registrado: true,
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

  public registroResultado(resultadoStringify: string) {
    const resultado: RegistroResultado = JSON.parse(resultadoStringify);

    if (!resultado.erro) {
      this.registroObserver.next(resultado);
      this.registroObserver.complete();
    } else {
      this.registroObserver.error(resultado);
    }
  }
}
