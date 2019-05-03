import { Injectable } from '@angular/core';
import { AutenticacaoResultado, DadosLogin } from '../../interfaces/login.interface';
import { Observable } from 'rxjs/internal/Observable';

declare let mp: Mp;
declare let browser: BrowserMp;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {
  }

  public login(dados: DadosLogin): Observable<AutenticacaoResultado> {
    return new Observable((observer) => {
      if (typeof mp !== 'undefined') {
        mp.events.add('AutenticacaoResultado', (data: AutenticacaoResultado) => {
          if (data.autenticado) {
            observer.next(data);
            observer.complete();
          } else {
            observer.error(data);
          }
        });

        mp.events.callRemote('AutenticarJogador', dados);
      } else {
        observer.next({
          autenticado: true,
        });
        observer.complete();
      }
    });
  }
}
