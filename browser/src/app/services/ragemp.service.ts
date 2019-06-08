import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BrazucasEventos } from '../../../../packages/rpg/interfaces/brazucas-eventos';
import { Jogador } from '../../interfaces/jogador.interface';

declare let mp: any;

@Injectable({
  providedIn: 'root'
})
export class RagempService {
  public browserName$: BehaviorSubject<string> = new BehaviorSubject(null);
  public dadosJogador$: BehaviorSubject<Jogador> = new BehaviorSubject({
    nome: '',
    email: '',
    celular: '',
    senha: '',
    dinheiro: 0,
    creditos: 0,
    fome: 0,
    sono: 77,
    forcaFisica: 0,
    sede: 0,
  });
  public playerName$: BehaviorSubject<string> = new BehaviorSubject(null);
  public jogadorLocal$: BehaviorSubject<Jogador> = new BehaviorSubject(null);
  public serverEvent$: Subject<ServerEvent> = new Subject();
  public voiceChatListeners$: BehaviorSubject<Array<VoiceChatListener>> = new BehaviorSubject([]);
  public playerGuiMenuAtivo: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(public zone: NgZone) {
    if (!window) {
      (window as any) = {};
    }

    (window as any).my = window || {};
    (window as any).ragemp = (window as any).ragemp || {};
    (window as any).ragemp.setPlayerName = this.setPlayerName.bind(this);
    (window as any).ragemp.setBrowserName = this.setBrowserName.bind(this);
    (window as any).ragemp.setVoiceChatListeners = this.setVoiceChatListeners.bind(this);
    (window as any).ragemp.setPlayerData = this.setPlayerData.bind(this);
    (window as any).ragemp.togglePlayerGuiMenuAtivo = this.togglePlayerGuiMenuAtivo.bind(this);
    (window as any).ragemp[BrazucasEventos.DADOS_JOGADOR] = this[BrazucasEventos.DADOS_JOGADOR].bind(this);
    (window as any).ragemp.serverEvent = this.serverEvent.bind(this);
  }

  public callRagempEvent(event: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const eventId = Math.round(Math.random() * 10000000);

      mp.trigger(BrazucasEventos.BROWSER, eventId, event, JSON.stringify(data));

      const subscriber = this.serverEvent$.subscribe((serverEvent: ServerEvent) => {
        console.debug(`[EVENTO] (ID ${eventId}) ${JSON.stringify(serverEvent)}`);

        if (typeof this[serverEvent.event] === 'function') {
          this[serverEvent.event](serverEvent.data);
        }

        if (serverEvent.eventId === eventId) {
          clearTimeout(timeout);
          resolve(serverEvent.data);
          subscriber.unsubscribe();
        }
      });

      const timeout = setTimeout(() => {
        subscriber.unsubscribe();
        reject('timeout');
      }, 10000);
    });
  }

  public setPlayerName(playerName: string) {
    this.playerName$.next(playerName);
  }

  public setBrowserName(browserName: string) {
    this.browserName$.next(browserName);
  }

  public setVoiceChatListeners(listenersList: Array<VoiceChatListener>) {
    this.voiceChatListeners$.next(listenersList);
  }

  public setPlayerData(dadosJogadorStr: string) {
    const dadosJogador: Jogador = JSON.parse(dadosJogadorStr);

    console.log(`ATUALIZAR DADOS JOGADOR (${this.browserName$.value}) ${JSON.stringify(dadosJogador)}`);

    this.zone.run(() => {
      this.dadosJogador$.next(dadosJogador);
    });
  }

  public serverEvent(eventId: number, event: string, data: any) {
    console.log(`Evento recebido para o navegador ${this.browserName$.value}: ${event} ${JSON.stringify(data)}`);
    this.serverEvent$.next({
      event: event,
      data: data,
      eventId: eventId,
    });
  }

  public togglePlayerGuiMenuAtivo() {
    this.zone.run(() => {
      this.playerGuiMenuAtivo.next(!this.playerGuiMenuAtivo.value);

      if (this.playerGuiMenuAtivo) {
        mp.trigger('HabilitarCursor');
      } else {
        mp.trigger('DesabilitarCursor');
      }
    });
  }

  public closeBrowser() {
    mp.trigger('FecharBrowser', this.browserName$.value);
  }

  public [BrazucasEventos.DADOS_JOGADOR](jogador: string) {
    console.log(`[DADOS JOGADOR] ${JSON.stringify(jogador)}`);

    this.zone.run(() => {
      this.dadosJogador$.next(Object.assign(this.dadosJogador$.value, JSON.parse(jogador)));
    });
  }
}

export interface ServerEvent {
  eventId: number,
  event: string,
  data: any,
}

export interface VoiceChatListener {
  playerId: number,
  playerName: string,
}
